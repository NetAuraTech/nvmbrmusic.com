import BlockRenderer from '~/components/cms/renderer/block_renderer';
import type { ResolvedPageContent } from '#cms/types/page';

interface PageRendererProps {
	content: ResolvedPageContent;
	pageId: number;
	locale: string;
}

/**
 * Root renderer for a resolved CMS page.
 * Iterates over the top-level block array and delegates each block to
 * `BlockRenderer`. Container blocks handle their own children recursively.
 */
export default function PageRenderer({ content, pageId, locale }: PageRendererProps) {
	if (!content.blocks.length) return null;

	return (
		<main className="font-bebas text-lg leading-normal text-neutral-800 min-[75em]:text-[1.3125rem]">
			{content.blocks.map((block, index) => (
				<BlockRenderer key={block.id} block={block} pageId={pageId} locale={locale} isPriority={index < 2} />
			))}
		</main>
	);
}
