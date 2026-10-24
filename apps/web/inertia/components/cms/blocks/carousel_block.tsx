import { Icon } from '@foundry/design-system/icon';
import { Children, useEffect, useState, type ReactNode } from 'react';
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
 * Renders an infinitely wrapping slide carousel. Each child block (pre-rendered
 * by `BlockRenderer`) is one slide, laid out side by side in a track that
 * slides horizontally (transform transition) to the active slide.
 *
 * The track is bordered by two ghost slides — a copy of the last slide on the
 * left and a copy of the first on the right — so wrapping around animates a
 * single slide in the correct direction (prev on the first slide slides in the
 * last one, next on the last slides in the first) instead of sweeping through
 * every slide. When the wrap animation reaches a ghost, the track snaps back
 * to the equivalent real slide without transition. Arrows and dots navigate
 * between the real slides. Renders nothing when there are no slides.
 *
 * Kept dependency-free: a couple of `useState`/`useEffect`, no external
 * carousel lib.
 */
export default function CarouselBlock({ block, children }: CarouselBlockProps) {
	const { aspect, showArrows, showDots, className } = block.props;
	const slides = Children.toArray(children).filter(Boolean);
	const count = slides.length;

	// Track position: 1..count are the real slides (position 1 = first slide);
	// position 0 is the ghost of the last slide, count + 1 the ghost of the
	// first. `instant` disables the transition for one frame so the post-wrap
	// snap is not animated.
	const [pos, setPos] = useState(1);
	const [instant, setInstant] = useState(false);

	useEffect(() => {
		if (!instant) return;
		const id = requestAnimationFrame(() => setInstant(false));
		return () => cancelAnimationFrame(id);
	}, [instant]);

	if (count === 0) return null;

	// Real slide currently in view (the ghost positions map to the slide they
	// duplicate, for the dots and the slide aria states).
	const displayIndex = pos <= 0 ? count - 1 : pos > count ? 0 : pos - 1;
	const aspectClasses = resolveResponsive(aspect, aspectMap) || 'aspect-video';

	const prev = () => setPos((p) => (p > 1 ? p - 1 : 0));
	const next = () => setPos((p) => (p < count ? p + 1 : count + 1));
	const goTo = (i: number) => setPos(i + 1);

	// The wrap animation landed on a ghost — snap to the equivalent real slide
	// (no transition, one frame) so the next navigation animates normally.
	const snapTo = (target: number) => {
		setInstant(true);
		setPos(target);
	};

	const arrowButton =
		'absolute top-1/2 z-10 flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-full bg-primary-400 text-neutral-100 transition-colors duration-300 hover:bg-accent-400 max-[1000px]:hidden';

	return (
		<div className={['group relative w-full', className].filter(Boolean).join(' ')}>
			<div className={`relative w-full overflow-hidden ${aspectClasses}`}>
				<div
					className="flex h-full transition-transform duration-500 ease-in-out"
					style={{
						transform: `translateX(-${pos * 100}%)`,
						// The post-wrap snap must not animate
						transition: instant ? 'none' : undefined,
					}}
					onTransitionEnd={() => {
						if (pos === 0) snapTo(count);
						else if (pos === count + 1) snapTo(1);
					}}
				>
					{/* Ghost of the last slide — infinite wrap (left edge) */}
					<div aria-hidden className="h-full w-full shrink-0">
						{slides[count - 1]}
					</div>

					{slides.map((slide, i) => (
						<div
							key={i}
							role="group"
							aria-roledescription="slide"
							aria-label={`${i + 1} / ${count}`}
							aria-hidden={i !== displayIndex}
							className="h-full w-full shrink-0"
						>
							{slide}
						</div>
					))}

					{/* Ghost of the first slide — infinite wrap (right edge) */}
					<div aria-hidden className="h-full w-full shrink-0">
						{slides[0]}
					</div>
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
							aria-current={i === displayIndex}
							className={`h-2 w-2 rounded-full transition ${
								i === displayIndex ? 'bg-overlay' : 'bg-overlay/50 hover:bg-overlay/75'
							}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}
