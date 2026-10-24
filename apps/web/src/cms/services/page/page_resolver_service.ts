import { inject } from '@adonisjs/core';
import { classifyVideoUrl, isAllowedIframeUrl } from '#cms/services/page/embed_policy';
import { FileRepository } from '#file/repositories/file_repository';
import { classifyFileType } from '#file/services/file_type';
import { ImageOptimizerService } from '#file/services/image_optimizer_service';
import type {
	Block,
	PageContent,
	BlockType,
	ImageProps,
	VideoProps,
	IframeProps,
	HeroProps,
	GalleryProps,
} from '#cms/types/page';
import type {
	ResolvedBlock,
	ResolvedPageContent,
	ResolvedImageProps,
	ResolvedVideoProps,
	ResolvedIframeProps,
	ResolvedHeroProps,
	ResolvedGalleryProps,
} from '#cms/types/page';
import type CmsFile from '#file/models/file';
import type { FileRef, ResolvedFile } from '#types/file';

@inject()
export class PageResolverService {
	constructor(
		protected fileRepository: FileRepository,
		protected imageOptimizerService: ImageOptimizerService,
	) {}

	/**
	 * Resolves all `FileRef` values in a `PageContent` tree into `ResolvedFile`
	 * objects, batching all file lookups into a single DB query.
	 *
	 * The original `content` is not mutated — a parallel `ResolvedPageContent`
	 * structure is returned. This keeps the stored JSON clean and the resolved
	 * representation strictly typed.
	 *
	 * @param content - The raw `PageContent` stored in `page_translations.content`
	 * @param locale - The current page locale, used to resolve named alt texts
	 * @returns A `ResolvedPageContent` safe to serialize into Inertia props
	 */
	async resolve(content: PageContent, locale: string): Promise<ResolvedPageContent> {
		const fileIds = this.collectFileIds(content.blocks);

		const fileMap = await this.loadFiles(fileIds);

		const blocks = await this.resolveBlocks(content.blocks, locale, fileMap);

		return { blocks };
	}

	// ─── Private ────────────────────────────────────────────────────────────────

	/**
	 * Recursively collects all unique file IDs referenced anywhere in the block tree.
	 * A single pass avoids N+1 queries when the page has many image blocks.
	 */
	private collectFileIds(blocks: Block[]): number[] {
		const ids = new Set<number>();

		const visit = (block: Block) => {
			if (block.type === 'image') {
				const props = block.props as ImageProps;
				if (props.file?.fileId) ids.add(props.file.fileId);
			}

			if (block.type === 'video') {
				const props = block.props as VideoProps;
				if (props.poster?.fileId) ids.add(props.poster.fileId);
			}

			if (block.type === 'hero') {
				const props = block.props as HeroProps;
				if (props.logo?.fileId) ids.add(props.logo.fileId);
				for (const ref of props.socials) {
					if (ref?.fileId) ids.add(ref.fileId);
				}
			}

			if (block.type === 'gallery') {
				const props = block.props as GalleryProps;
				for (const ref of props.images) {
					if (ref?.fileId) ids.add(ref.fileId);
				}
			}

			if (block.children?.length) {
				block.children.forEach(visit);
			}
		};

		blocks.forEach(visit);

		return Array.from(ids);
	}

	/**
	 * Loads all required files with their alts in a single query and builds
	 * an in-memory map keyed by file ID for O(1) lookup during resolution.
	 *
	 * @param ids - Array of file IDs to load
	 */
	private async loadFiles(ids: number[]): Promise<Map<number, CmsFile>> {
		if (ids.length === 0) return new Map();

		const { default: CmsFileModel } = await import('#file/models/file');

		const files = await CmsFileModel.query().whereIn('id', ids).preload('alts');

		return new Map(files.map((f) => [f.id, f]));
	}

	/**
	 * Recursively resolves a block array, replacing `FileRef` props with
	 * `ResolvedFile` objects using the pre-loaded file map.
	 */
	private async resolveBlocks(
		blocks: Block[],
		locale: string,
		fileMap: Map<number, CmsFile>,
	): Promise<ResolvedBlock[]> {
		const resolved: ResolvedBlock[] = [];

		for (const block of blocks) {
			const children = block.children?.length ? await this.resolveBlocks(block.children, locale, fileMap) : undefined;

			resolved.push({
				id: block.id,
				type: block.type,
				props: await this.resolveProps(block, locale, fileMap),
				...(children !== undefined && { children }),
			} as ResolvedBlock);
		}

		return resolved;
	}

	/**
	 * Resolves a single block's props. For blocks without `FileRef` fields the
	 * original props object is returned as-is (no copy needed — it's read-only).
	 */
	private async resolveProps(
		block: Block,
		locale: string,
		fileMap: Map<number, CmsFile>,
	): Promise<ResolvedBlock['props']> {
		switch (block.type as BlockType) {
			case 'image': {
				const props = block.props as ImageProps;
				return {
					...props,
					file: props.file ? await this.resolveFileRef(props.file, locale, fileMap) : null,
				} satisfies ResolvedImageProps;
			}

			case 'video': {
				const props = block.props as VideoProps;
				// Embed policy re-enforced at render time — the configured providers
				// may have changed since the content was saved.
				const source = props.url ? classifyVideoUrl(props.url) : null;
				return {
					...props,
					kind: source?.kind ?? null,
					provider: source?.kind === 'embed' ? source.provider : null,
					url: source ? props.url : null,
					embedUrl: source?.kind === 'embed' ? source.embedUrl : null,
					poster: props.poster ? await this.resolveFileRef(props.poster, locale, fileMap) : null,
				} satisfies ResolvedVideoProps;
			}

			case 'iframe': {
				const props = block.props as IframeProps;
				return {
					...props,
					// Allowlist re-enforced at render time (see embed_policy).
					url: props.url && isAllowedIframeUrl(props.url) ? props.url : null,
				} satisfies ResolvedIframeProps;
			}

			case 'hero': {
				const props = block.props as HeroProps;
				const logo = props.logo ? await this.resolveFileRef(props.logo, locale, fileMap) : null;
				const socials = (
					await Promise.all(props.socials.map((ref) => this.resolveFileRef(ref, locale, fileMap)))
				).filter((f): f is ResolvedFile => f !== null);
				return { ...props, logo, socials } satisfies ResolvedHeroProps;
			}

			case 'gallery': {
				const props = block.props as GalleryProps;
				const images = (await Promise.all(props.images.map((ref) => this.resolveFileRef(ref, locale, fileMap)))).filter(
					(f): f is ResolvedFile => f !== null,
				);
				return { ...props, images } satisfies ResolvedGalleryProps;
			}

			default:
				// section, grid, flex, title, paragraph, button, separator, icon,
				// form, field, htmltext, carousel, list, quote
				// none of these have FileRef fields or render-time policies — return
				// props unchanged
				return block.props as ResolvedBlock['props'];
		}
	}

	/**
	 * Converts a `FileRef` into a `ResolvedFile` using the pre-loaded file map.
	 * Returns `null` when the referenced file is not found (deleted or invalid ID).
	 *
	 * @param ref - The FileRef to resolve
	 * @param locale - Current locale for alt text resolution
	 * @param fileMap - Pre-loaded file map
	 */
	private async resolveFileRef(
		ref: FileRef,
		locale: string,
		fileMap: Map<number, CmsFile>,
	): Promise<ResolvedFile | null> {
		const file = fileMap.get(ref.fileId);

		if (!file) return null;

		const url = await file.url();
		const alt = file.resolveAlt(locale, ref.altKey ?? null, ref.altOverride);

		const optimized = await this.imageOptimizerService.optimize(file);

		return {
			id: file.id,
			url,
			filename: file.filename,
			mimeType: file.mimeType,
			extension: file.extension,
			size: file.size as number,
			type: classifyFileType(file.mimeType),
			alt,
			width: optimized.width,
			height: optimized.height,
			variants: optimized.variants,
		};
	}
}
