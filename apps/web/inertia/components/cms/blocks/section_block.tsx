import { Section } from '@foundry/design-system/section';
import { ReactNode } from 'react';
import { resolveResponsive } from '~/components/cms/utils/responsive';
import type { ResolvedBlock } from '#cms/types/page';

/**
 * November section vertical padding — the live site uses flat
 * `padding-block-N` utilities (no responsive variants), so each step maps to
 * a single class: sm 1.5rem, md 2.5rem, lg 3rem, xl 4rem.
 */
const paddingYMap = {
	none: { default: 'py-0' },
	sm: { default: 'py-6' },
	md: { default: 'py-10' },
	lg: { default: 'py-12' },
	xl: { default: 'py-16' },
};

const paddingXMap = {
	none: { default: 'px-0', md: 'md:px-0', lg: 'lg:px-0' },
	sm: { default: 'px-4', md: 'md:px-8', lg: 'lg:px-12' },
	md: { default: 'px-6', md: 'md:px-16', lg: 'lg:px-24' },
	lg: { default: 'px-8', md: 'md:px-24', lg: 'lg:px-32' },
	xl: { default: 'px-12', md: 'md:px-32', lg: 'lg:px-48' },
};

const backgroundMap: Record<string, string> = {
	none: '',
	canvas: 'bg-canvas',
	surface: 'bg-surface',
	sunken: 'bg-sunken',
	'primary-deep': 'bg-primary-deep',
	primary: 'bg-primary',
	'primary-soft': 'bg-primary-soft',
	'primary-light': 'bg-primary-light',
	'secondary-deep': 'bg-secondary-deep',
	secondary: 'bg-secondary',
	'secondary-soft': 'bg-secondary-soft',
	'secondary-light': 'bg-secondary-light',
	'tertiary-deep': 'bg-tertiary-deep',
	tertiary: 'bg-tertiary',
	'tertiary-soft': 'bg-tertiary-soft',
	'tertiary-light': 'bg-tertiary-light',
	transparent: 'bg-transparent',
};

interface SectionBlockProps {
	block: ResolvedBlock<'section'>;
	children?: ReactNode;
}

/**
 * Wrapper block that defines the section's background, spacing, and max-width.
 * All visual child blocks are rendered inside this container.
 */
export default function SectionBlock(props: SectionBlockProps) {
	const { block, children } = props;
	const { background, paddingY, paddingX, id, className } = block.props;

	const pyClasses = resolveResponsive(paddingY, paddingYMap);
	const pxClasses = resolveResponsive(paddingX, paddingXMap);
	const bgClass = backgroundMap[background] ?? '';

	return (
		<Section id={id} className={[bgClass, pyClasses, pxClasses, className].filter(Boolean).join(' ')}>
			{children}
		</Section>
	);
}
