import ButtonBlock from '~/components/cms/blocks/button_block';
import CarouselBlock from '~/components/cms/blocks/carousel_block';
import FieldBlock from '~/components/cms/blocks/field_block';
import FlexBlock from '~/components/cms/blocks/flex_block';
import FormBlock from '~/components/cms/blocks/form_block';
import GalleryBlock from '~/components/cms/blocks/gallery_block';
import GridBlock from '~/components/cms/blocks/grid_block';
import HeroBlock from '~/components/cms/blocks/hero_block';
import HtmlTextBlock from '~/components/cms/blocks/html_text_block';
import IconBlock from '~/components/cms/blocks/icon_block';
import IframeBlock from '~/components/cms/blocks/iframe_block';
import ImageBlock from '~/components/cms/blocks/image_block';
import ListBlock from '~/components/cms/blocks/list_block';
import ParagraphBlock from '~/components/cms/blocks/paragraph_block';
import QuoteBlock from '~/components/cms/blocks/quote_block';
import SectionBlock from '~/components/cms/blocks/section_block';
import SeparatorBlock from '~/components/cms/blocks/separator_block';
import TitleBlock from '~/components/cms/blocks/title_block';
import VideoBlock from '~/components/cms/blocks/video_block';
import type { ResolvedBlock } from '#cms/types/page';

interface BlockRendererProps {
	block: ResolvedBlock;
	pageId: number;
	locale: string;
	isPriority?: boolean;
}

/**
 * Dispatches a single resolved block to the correct component.
 *
 * Container blocks (`section`, `grid`) receive their `children` rendered
 * recursively via this same component.
 */
export default function BlockRenderer({ block, pageId, locale, isPriority = false }: BlockRendererProps) {
	switch (block.type) {
		case 'section':
			return (
				<SectionBlock block={block as ResolvedBlock<'section'>}>
					{block.children?.map((child) => (
						<BlockRenderer key={child.id} block={child} pageId={pageId} locale={locale} isPriority={isPriority} />
					))}
				</SectionBlock>
			);
		case 'grid':
			return (
				<GridBlock block={block as ResolvedBlock<'grid'>}>
					{block.children?.map((child) => (
						<BlockRenderer key={child.id} block={child} pageId={pageId} locale={locale} isPriority={isPriority} />
					))}
				</GridBlock>
			);
		case 'flex':
			return (
				<FlexBlock block={block as ResolvedBlock<'flex'>}>
					{block.children?.map((child) => (
						<BlockRenderer key={child.id} block={child} pageId={pageId} locale={locale} isPriority={isPriority} />
					))}
				</FlexBlock>
			);
		case 'title':
			return <TitleBlock block={block as ResolvedBlock<'title'>} />;
		case 'paragraph':
			return <ParagraphBlock block={block as ResolvedBlock<'paragraph'>} />;
		case 'button':
			return <ButtonBlock block={block as ResolvedBlock<'button'>} />;
		case 'separator':
			return <SeparatorBlock block={block as ResolvedBlock<'separator'>} />;
		case 'icon':
			return <IconBlock block={block as ResolvedBlock<'icon'>} />;
		case 'form':
			return (
				<FormBlock block={block as ResolvedBlock<'form'>}>
					{block.children?.map((child) => (
						<BlockRenderer key={child.id} block={child} pageId={pageId} locale={locale} isPriority={isPriority} />
					))}
				</FormBlock>
			);
		case 'field':
			return <FieldBlock block={block as ResolvedBlock<'field'>} />;
		case 'htmltext':
			return <HtmlTextBlock block={block as ResolvedBlock<'htmltext'>} />;
		case 'image':
			return <ImageBlock block={block as ResolvedBlock<'image'>} isPriority={isPriority} />;
		case 'video':
			return <VideoBlock block={block as ResolvedBlock<'video'>} />;
		case 'carousel':
			// Container: each child block is one slide
			return (
				<CarouselBlock block={block as ResolvedBlock<'carousel'>}>
					{block.children?.map((child) => (
						<BlockRenderer key={child.id} block={child} pageId={pageId} locale={locale} isPriority={isPriority} />
					))}
				</CarouselBlock>
			);
		case 'list':
			return <ListBlock block={block as ResolvedBlock<'list'>} />;
		case 'quote':
			return <QuoteBlock block={block as ResolvedBlock<'quote'>} />;
		case 'iframe':
			return <IframeBlock block={block as ResolvedBlock<'iframe'>} />;
		case 'hero':
			return <HeroBlock block={block as ResolvedBlock<'hero'>} />;
		case 'gallery':
			return <GalleryBlock block={block as ResolvedBlock<'gallery'>} />;
		default:
			if (process.env.NODE_ENV === 'development') {
				console.warn(`[BlockRenderer] Unknown block type: ${(block as any).type}`);
			}
			return null;
	}
}
