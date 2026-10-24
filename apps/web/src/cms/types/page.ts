import { type FontSize, type ParagraphSpacing, type ParagraphVariants } from '@foundry/design-system/tokens';
import type { FileRef, ResolvedFile } from '#types/file';

export type PageStatus = 'draft' | 'published' | 'archived';

export type BlockType =
	| 'section'
	| 'grid'
	| 'flex'
	| 'title'
	| 'paragraph'
	| 'button'
	| 'separator'
	| 'icon'
	| 'form'
	| 'field'
	| 'htmltext'
	| 'image'
	| 'video'
	| 'carousel'
	| 'list'
	| 'quote'
	| 'iframe'
	| 'hero'
	| 'gallery';

/**
 * Remote video providers supported by the `video` block embed pipeline.
 * The enabled subset is configured via `CMS_VIDEO_PROVIDERS` (see `config/cms.ts`).
 */
export type VideoProvider = 'youtube' | 'vimeo';

/**
 * Intrinsic aspect ratios shared by media blocks (`video`, `carousel`, `iframe`).
 * Rendered as stable ratio containers so embeds cause no layout shift (CLS).
 */
export type MediaAspect = '16:9' | '4:3' | '1:1';

/**
 * A responsive value that can vary per Tailwind breakpoint.
 * Only `default` is required — omitted breakpoints inherit the previous value.
 *
 * @example
 * { default: 1, md: 2, lg: 4 }
 */
export interface ResponsiveValue<T> {
	default: T;
	sm?: T;
	md?: T;
	lg?: T;
	xl?: T;
}

export interface SectionProps {
	background:
		| 'none'
		| 'canvas'
		| 'surface'
		| 'sunken'
		| 'primary-deep'
		| 'primary'
		| 'primary-soft'
		| 'primary-light'
		| 'secondary-deep'
		| 'secondary'
		| 'secondary-soft'
		| 'secondary-light'
		| 'tertiary-deep'
		| 'tertiary'
		| 'tertiary-soft'
		| 'tertiary-light'
		| 'transparent';
	paddingY: ResponsiveValue<'none' | 'sm' | 'md' | 'lg' | 'xl'>;
	paddingX: ResponsiveValue<'none' | 'sm' | 'md' | 'lg' | 'xl'>;
	className?: string;
	id?: string;
}

export interface GridProps {
	cols: ResponsiveValue<1 | 2 | 3 | 4 | 6>;
	gap: ResponsiveValue<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>;
	alignItems?: 'start' | 'center' | 'end' | 'stretch';
	className?: string;
}

export interface FlexProps {
	as?: 'div' | 'article';
	background:
		| 'none'
		| 'canvas'
		| 'surface'
		| 'sunken'
		| 'primary-deep'
		| 'primary'
		| 'primary-soft'
		| 'primary-light'
		| 'secondary-deep'
		| 'secondary'
		| 'secondary-soft'
		| 'secondary-light'
		| 'tertiary-deep'
		| 'tertiary'
		| 'tertiary-soft'
		| 'tertiary-light'
		| 'transparent';
	direction: ResponsiveValue<'row' | 'col' | 'row-reverse' | 'col-reverse'>;
	gap: ResponsiveValue<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;
	align: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
	justify: 'start' | 'center' | 'end' | 'between' | 'around';
	wrap?: boolean;
	className?: string;
}

export interface TitleProps {
	text: string;
	level: 1 | 2 | 3 | 4;
	color:
		| 'default'
		| 'ink-inverted'
		| 'primary-deep'
		| 'primary'
		| 'primary-soft'
		| 'primary-light'
		| 'secondary-deep'
		| 'secondary'
		| 'secondary-soft'
		| 'secondary-light'
		| 'tertiary-deep'
		| 'tertiary'
		| 'tertiary-soft'
		| 'tertiary-light';
	highlightColor:
		| 'default'
		| 'primary-deep'
		| 'primary'
		| 'primary-soft'
		| 'primary-light'
		| 'secondary-deep'
		| 'secondary'
		| 'secondary-soft'
		| 'secondary-light'
		| 'tertiary-deep'
		| 'tertiary'
		| 'tertiary-soft'
		| 'tertiary-light';
}

export interface ParagraphProps {
	text: string;
	fs: FontSize;
	variant: ParagraphVariants;
	spacing: ParagraphSpacing;
	className?: string;
}

export interface SeparatorProps {
	spacing: 'none' | 'sm' | 'md' | 'lg' | 'xl';
	color:
		| 'none'
		| 'canvas'
		| 'surface'
		| 'sunken'
		| 'primary-deep'
		| 'primary'
		| 'primary-soft'
		| 'primary-light'
		| 'secondary-deep'
		| 'secondary'
		| 'secondary-soft'
		| 'secondary-light'
		| 'tertiary-deep'
		| 'tertiary'
		| 'tertiary-soft'
		| 'tertiary-light'
		| 'transparent';
	className?: string;
}

export interface IconProps {
	name?: string;
	color:
		| 'default'
		| 'ink-inverted'
		| 'primary-deep'
		| 'primary'
		| 'primary-soft'
		| 'primary-light'
		| 'secondary-deep'
		| 'secondary'
		| 'secondary-soft'
		| 'secondary-light'
		| 'tertiary-deep'
		| 'tertiary'
		| 'tertiary-soft'
		| 'tertiary-light';
	background:
		| 'none'
		| 'canvas'
		| 'surface'
		| 'sunken'
		| 'primary-deep'
		| 'primary'
		| 'primary-soft'
		| 'primary-light'
		| 'secondary-deep'
		| 'secondary'
		| 'secondary-soft'
		| 'secondary-light'
		| 'tertiary-deep'
		| 'tertiary'
		| 'tertiary-soft'
		| 'tertiary-light'
		| 'transparent';
	size: number;
	className?: string;
}

export interface FormProps {
	route?: string;
	routeParams?: Record<string, any>;
	className?: string;
}

export interface FieldProps {
	label: string;
	name: string;
	type: string;
	placeholder?: string;
	required: boolean;
	helpText?: string;
	options?: {
		value: string;
		label: string;
	}[];
}

export interface HtmlTextProps {
	content: string;
}

export interface ImageProps {
	file: FileRef | null;
	className?: string;
}

/**
 * Props of the `video` block.
 *
 * `url` is either a video page URL from an enabled provider (YouTube, Vimeo)
 * or a direct media file URL (`.mp4`, `.webm`, `.ogg`, `.mov`) — absolute
 * `https://` or same-origin relative. Anything else is rejected by
 * sanitization and stored as `null` (see `embed_policy`).
 */
export interface VideoProps {
	url: string | null;
	poster?: FileRef | null;
	caption?: string;
	aspect: ResponsiveValue<MediaAspect>;
	className?: string;
}

/**
 * Props of the `carousel` block — a container whose children are the slides.
 * Each child Block (typically `image`, `title` or `paragraph`) is one slide.
 */
export interface CarouselProps {
	aspect: ResponsiveValue<MediaAspect>;
	showArrows: boolean;
	showDots: boolean;
	className?: string;
}

export interface ListProps {
	ordered: boolean;
	items: string[];
	className?: string;
}

export interface QuoteProps {
	text: string;
	attribution?: string;
	variant: 'default' | 'highlight' | 'plain';
	className?: string;
}

/**
 * Props of the `iframe` block.
 *
 * `url` must use `https` and its hostname must appear in the configured
 * allowlist (`CMS_IFRAME_ALLOWLIST`, see `config/cms.ts`) — enforced both at
 * save time (sanitization) and at render time (`PageResolverService`).
 * `height` optionally overrides `aspect` with a fixed pixel height.
 */
export interface IframeProps {
	url: string | null;
	title: string;
	aspect: ResponsiveValue<MediaAspect>;
	height?: number;
	className?: string;
}

/**
 * Props of the `hero` block — a centered band logo with social media links.
 * `logo` and each `socials` entry reference media-library files; both are
 * resolved server-side before rendering.
 */
export interface HeroProps {
	logo: FileRef | null;
	socials: FileRef[];
	className?: string;
}

/**
 * Props of the `gallery` block — a full-bleed image gallery rendered with
 * a client-side lightbox. `images` order defines the display order.
 */
export interface GalleryProps {
	images: FileRef[];
	className?: string;
}

export interface ButtonProps {
	children: string;
	linkType: 'page' | 'route' | 'external';
	pageId?: number | string;
	locale?: string;
	route?: string;
	routeParams?: Record<string, any>;
	anchor?: string;
	url?: string;
	variant: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'link_muted' | 'link_secondary';
	size: 'sm' | 'md' | 'lg';
	align: 'left' | 'center' | 'right';
	fitContent: boolean;
	icon: string | null;
}

export interface ContactFormField {
	name: string;
	label: string;
	type: 'text' | 'email' | 'textarea' | 'tel' | 'select';
	required: boolean;
	options?: string[];
}

/**
 * Maps each BlockType to its corresponding props interface.
 * Used to type-narrow block props in the renderer and the builder.
 */
export interface BlockPropsMap {
	section: SectionProps;
	grid: GridProps;
	flex: FlexProps;
	title: TitleProps;
	paragraph: ParagraphProps;
	button: ButtonProps;
	separator: SeparatorProps;
	icon: IconProps;
	form: FormProps;
	field: FieldProps;
	htmltext: HtmlTextProps;
	image: ImageProps;
	video: VideoProps;
	carousel: CarouselProps;
	list: ListProps;
	quote: QuoteProps;
	iframe: IframeProps;
	hero: HeroProps;
	gallery: GalleryProps;
}

/**
 * A single block node in the page content tree.
 * Children are only present on container blocks (`section`, `grid`).
 */
export interface Block<T extends BlockType = BlockType> {
	id: string;
	type: T;
	props: BlockPropsMap[T];
	children?: Block[];
}

/**
 * Root structure of the JSON stored in `page_translations.content`.
 */
export interface PageContent {
	blocks: Block[];
}

export interface ContactFormSubmission {
	[key: string]: string;
}

// ─── Resolved types ───────────────────────────────────────────────────────────
// Append these to the bottom of types/page.ts
// They mirror Block/Props types but with FileRef replaced by ResolvedFile,
// built server-side by PageResolverService before being passed to Inertia.

export interface ResolvedSectionProps {
	background:
		| 'none'
		| 'canvas'
		| 'surface'
		| 'sunken'
		| 'primary-deep'
		| 'primary'
		| 'primary-soft'
		| 'primary-light'
		| 'secondary-deep'
		| 'secondary'
		| 'secondary-soft'
		| 'secondary-light'
		| 'tertiary-deep'
		| 'tertiary'
		| 'tertiary-soft'
		| 'tertiary-light'
		| 'transparent';
	paddingY: ResponsiveValue<'none' | 'sm' | 'md' | 'lg' | 'xl'>;
	paddingX: ResponsiveValue<'none' | 'sm' | 'md' | 'lg' | 'xl'>;
	className?: string;
	id?: string;
}

export interface ResolvedImageProps {
	file: ResolvedFile | null;
	className?: string;
}

/**
 * Resolved props of the `video` block.
 *
 * `kind` tells the renderer which tag to emit: `embed` renders `embedUrl` in
 * an `<iframe>`, `file` renders `url` in a `<video>` tag. Both are `null`
 * when the stored URL failed the provider/format policy — the block then
 * renders nothing.
 */
export interface ResolvedVideoProps {
	kind: 'embed' | 'file' | null;
	provider: VideoProvider | null;
	url: string | null;
	embedUrl: string | null;
	poster: ResolvedFile | null;
	caption?: string;
	aspect: ResponsiveValue<MediaAspect>;
	className?: string;
}

/**
 * Resolved props of the `iframe` block.
 * `url` is `null` when the stored URL is not on the configured allowlist —
 * the block renders nothing in that case.
 */
export interface ResolvedIframeProps {
	url: string | null;
	title: string;
	aspect: ResponsiveValue<MediaAspect>;
	height?: number;
	className?: string;
}

/**
 * Resolved props of the `hero` block. `logo` is `null` when the referenced
 * file is missing; unresolvable `socials` entries are dropped.
 */
export interface ResolvedHeroProps {
	logo: ResolvedFile | null;
	socials: ResolvedFile[];
	className?: string;
}

/**
 * Resolved props of the `gallery` block. Unresolvable file references are
 * dropped from `images`.
 */
export interface ResolvedGalleryProps {
	images: ResolvedFile[];
	className?: string;
}

/**
 * Maps each BlockType to its resolved props.
 * Types without FileRef are identical to their source counterparts.
 */
export interface ResolvedBlockPropsMap {
	section: ResolvedSectionProps;
	grid: GridProps;
	flex: FlexProps;
	title: TitleProps;
	paragraph: ParagraphProps;
	button: ButtonProps;
	separator: SeparatorProps;
	icon: IconProps;
	form: FormProps;
	field: FieldProps;
	htmltext: HtmlTextProps;
	image: ResolvedImageProps;
	video: ResolvedVideoProps;
	carousel: CarouselProps;
	list: ListProps;
	quote: QuoteProps;
	iframe: ResolvedIframeProps;
	hero: ResolvedHeroProps;
	gallery: ResolvedGalleryProps;
}

/**
 * A single resolved block node.
 * All FileRef values have been replaced with ResolvedFile by `PageResolverService`.
 */
export interface ResolvedBlock<T extends BlockType = BlockType> {
	id: string;
	type: T;
	props: ResolvedBlockPropsMap[T];
	children?: ResolvedBlock[];
}

/**
 * Root structure passed to the Inertia page after server-side resolution.
 * Safe to render directly in React — no async lookups needed in components.
 */
export interface ResolvedPageContent {
	blocks: ResolvedBlock[];
}
