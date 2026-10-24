import { Icon } from '@foundry/design-system/icon';
import { Children, useState, type ReactNode } from 'react';
import { resolveResponsive } from '~/components/cms/utils/responsive';
import type { ResolvedBlock, MediaAspect } from '#cms/types/page';

interface CarouselBlockProps {
	block: ResolvedBlock<'carousel'>;
	/** Pre-rendered slide blocks, mapped by `BlockRenderer` (one per slide). */
	children?: ReactNode;
}

const aspectMap: Record<MediaAspect, Record<'default', string>> = {
	'16:9': { default: 'aspect-video' },
	'4:3': { default: 'aspect-4/3' },
	'1:1': { default: 'aspect-square' },
};

/**
 * Renders a slide carousel. Each child block (pre-rendered by `BlockRenderer`)
 * is one slide, laid out side by side in a track that slides horizontally
 * (transform transition) to the active slide. Arrows and dots navigate
 * between slides. Renders nothing when there are no slides.
 *
 * Kept dependency-free: a single `useState` index, no external carousel lib.
 */
export default function CarouselBlock({ block, children }: CarouselBlockProps) {
	const { aspect, showArrows, showDots, className } = block.props;
	const slides = Children.toArray(children).filter(Boolean);
	const [index, setIndex] = useState(0);

	if (slides.length === 0) return null;

	const count = slides.length;
	// Clamp in case the slide count shrinks after mount
	const current = Math.min(index, count - 1);
	const aspectClasses = resolveResponsive(aspect, aspectMap) || 'aspect-video';

	const goTo = (i: number) => setIndex(((i % count) + count) % count);
	const prev = () => goTo(current - 1);
	const next = () => goTo(current + 1);

	const arrowButton =
		'absolute top-1/2 z-10 flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-full bg-primary-400 text-neutral-100 transition-colors duration-300 hover:bg-accent-400 max-[1000px]:hidden';

	return (
		<div className={['group relative w-full', className].filter(Boolean).join(' ')}>
			<div className={`relative w-full overflow-hidden ${aspectClasses}`}>
				{/*
					The slides sit side by side in a track; the track slides
					horizontally (transform transition) to bring the active
					slide into view instead of switching slides instantly.
				*/}
				<div
					className="flex h-full transition-transform duration-500 ease-in-out"
					style={{ transform: `translateX(-${current * 100}%)` }}
				>
					{slides.map((slide, i) => (
						<div
							key={i}
							role="group"
							aria-roledescription="slide"
							aria-label={`${i + 1} / ${count}`}
							aria-hidden={i !== current}
							className="h-full w-full shrink-0"
						>
							{slide}
						</div>
					))}
				</div>
			</div>

			{showArrows && count > 1 && (
				<>
					<button type="button" onClick={prev} aria-label="Previous slide" className={`${arrowButton} left-[35px]`}>
						<Icon name="ChevronLeft" size={24} />
					</button>
					<button type="button" onClick={next} aria-label="Next slide" className={`${arrowButton} right-[35px]`}>
						<Icon name="ChevronRight" size={24} />
					</button>
				</>
			)}

			{showDots && count > 1 && (
				<div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
					{slides.map((_, i) => (
						<button
							key={i}
							type="button"
							onClick={() => goTo(i)}
							aria-label={`Go to slide ${i + 1}`}
							aria-current={i === current}
							className={`h-2 w-2 rounded-full transition ${
								i === current ? 'bg-overlay' : 'bg-overlay/50 hover:bg-overlay/75'
							}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}
