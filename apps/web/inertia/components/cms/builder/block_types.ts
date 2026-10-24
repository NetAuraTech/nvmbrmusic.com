import type { BlockType, Block } from '#cms/types/page';

export interface BlockDescriptor {
	type: BlockType;
	label: string;
	icon: string;
	description: string;
	isContainer: boolean;
	defaultProps: Block['props'];
}

/**
 * Catalogue of all available block types with their default props.
 * Used by the block picker panel in the page builder.
 */
export const BLOCK_CATALOG: BlockDescriptor[] = [
	{
		type: 'section',
		label: 'Section',
		icon: 'layout',
		description: 'Full-width container with background and spacing',
		isContainer: true,
		defaultProps: {
			background: 'none',
			paddingY: { default: 'md' },
			paddingX: { default: 'md' },
			className: '',
			id: '',
		},
	},
	{
		type: 'grid',
		label: 'Grid',
		icon: 'grid',
		description: 'Multi-column layout container',
		isContainer: true,
		defaultProps: {
			cols: { default: 1, md: 2 },
			gap: { default: 'md' },
			className: '',
		},
	},
	{
		type: 'flex',
		label: 'Flex Container',
		icon: 'layers',
		description: 'Boîte flexible (Stack) pour aligner des éléments',
		isContainer: true,
		defaultProps: {
			as: 'div',
			background: 'none',
			direction: { default: 'col', md: 'row' },
			gap: { default: 'sm' },
			align: 'center',
			justify: 'start',
			wrap: false,
			className: '',
		},
	},
	{
		type: 'title',
		label: 'Heading',
		icon: 'type',
		description: 'H1–H4 heading',
		isContainer: false,
		defaultProps: {
			text: 'New heading',
			level: 2,
			color: 'default',
			highlightColor: 'default',
		},
	},
	{
		type: 'paragraph',
		label: 'Paragraph',
		icon: 'paragraph',
		description: 'p text',
		isContainer: false,
		defaultProps: {
			text: 'New paragraph',
			variant: 'ink',
			fs: 'base',
			spacing: 'base',
			className: '',
		},
	},
	{
		type: 'button',
		label: 'Button',
		icon: 'mouse-pointer',
		description: 'Button with link',
		isContainer: false,
		defaultProps: {
			label: 'Click here',
			variant: 'primary',
			size: 'md',
			align: 'left',
			linkType: 'route',
			fitContent: true,
			children: '',
			icon: '',
		},
	},
	{
		type: 'separator',
		label: 'Separator',
		icon: 'minus',
		description: 'Horizontal dividing line',
		isContainer: false,
		defaultProps: {
			spacing: 'none',
			color: 'default',
			className: '',
		} as any,
	},
	{
		type: 'icon',
		label: 'Icon',
		icon: 'icon',
		description: 'Icon',
		isContainer: false,
		defaultProps: {
			name: '',
			color: 'default',
			background: 'none',
			size: 16,
			className: '',
		} as any,
	},
	{
		type: 'form',
		label: 'Form',
		icon: 'form',
		description: 'Form',
		isContainer: true,
		defaultProps: {
			route: 'cms.contact.execute',
			routeParams: {},
			className: '',
		},
	},
	{
		type: 'field',
		label: 'Field',
		icon: 'field',
		description: 'Field',
		isContainer: false,
		defaultProps: {
			label: 'My field',
			name: '',
			type: 'text',
			placeholder: '',
			required: false,
			helpText: '',
			options: [],
		},
	},
	{
		type: 'htmltext',
		label: 'Html Text',
		icon: 'htmltext',
		description: 'Html text',
		isContainer: false,
		defaultProps: {
			content: '<span>New text</span>',
		},
	},
	{
		type: 'image',
		label: 'Image',
		icon: 'image',
		description: 'Single image from the media library',
		isContainer: false,
		defaultProps: {
			file: null,
			className: '',
		},
	},
	{
		type: 'video',
		label: 'Video',
		icon: 'video',
		description: 'Provider embed or direct video file',
		isContainer: false,
		defaultProps: {
			url: '',
			poster: null,
			caption: '',
			aspect: { default: '16:9' },
			className: '',
		},
	},
	{
		type: 'carousel',
		label: 'Carousel',
		icon: 'carousel',
		description: 'Slideshow of child blocks',
		isContainer: true,
		defaultProps: {
			aspect: { default: '16:9' },
			showArrows: true,
			showDots: true,
			className: '',
		},
	},
	{
		type: 'list',
		label: 'List',
		icon: 'list',
		description: 'Bulleted or numbered list',
		isContainer: false,
		defaultProps: {
			ordered: false,
			items: ['First item'],
			className: '',
		},
	},
	{
		type: 'quote',
		label: 'Quote',
		icon: 'quote',
		description: 'Blockquote with attribution',
		isContainer: false,
		defaultProps: {
			text: 'Quote text',
			attribution: '',
			variant: 'default',
			className: '',
		},
	},
	{
		type: 'iframe',
		label: 'Embed',
		icon: 'iframe',
		description: 'Allowlisted external embed (map, calendar…)',
		isContainer: false,
		defaultProps: {
			url: '',
			title: '',
			aspect: { default: '16:9' },
			className: '',
		},
	},
	{
		type: 'hero',
		label: 'Hero',
		icon: 'image',
		description: 'Centered band logo with social media links',
		isContainer: false,
		defaultProps: {
			logo: null,
			socials: [],
			className: '',
		},
	},
	{
		type: 'gallery',
		label: 'Gallery',
		icon: 'grid',
		description: 'Full-bleed image gallery with lightbox',
		isContainer: false,
		defaultProps: {
			images: [],
			className: '',
		},
	},
];

/** Returns the descriptor for a given block type, optionally with translated labels */
export function getBlockDescriptor(
	type: BlockType,
	blockTranslations?: Record<string, { label: string; description: string }>,
): BlockDescriptor | undefined {
	const descriptor = BLOCK_CATALOG.find((b) => b.type === type);
	if (!descriptor || !blockTranslations) return descriptor;
	return {
		...descriptor,
		label: blockTranslations[type]?.label ?? descriptor.label,
		description: blockTranslations[type]?.description ?? descriptor.description,
	};
}

/** Returns the full catalog, optionally with translated labels */
export function getBlockCatalog(
	blockTranslations?: Record<string, { label: string; description: string }>,
): BlockDescriptor[] {
	if (!blockTranslations) return BLOCK_CATALOG;
	return BLOCK_CATALOG.map((b) => ({
		...b,
		label: blockTranslations[b.type]?.label ?? b.label,
		description: blockTranslations[b.type]?.description ?? b.description,
	}));
}

/** Generates a unique block ID */
export function generateBlockId(): string {
	return `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Creates a new block with defaults for the given type */
export function createBlock(type: BlockType): Block {
	const descriptor = getBlockDescriptor(type);
	if (!descriptor) throw new Error(`Unknown block type: ${type}`);

	return {
		id: generateBlockId(),
		type,
		props: { ...descriptor.defaultProps } as Block['props'],
		children: descriptor.isContainer ? [] : undefined,
	};
}
