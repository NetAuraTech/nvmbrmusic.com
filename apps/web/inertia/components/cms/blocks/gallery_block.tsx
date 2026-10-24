import { useCallback, useEffect, useState } from 'react';
import type { ResolvedBlock } from '#cms/types/page';

interface GalleryBlockProps {
	block: ResolvedBlock<'gallery'>;
}

/**
 * Live-site lightbox button base — transparent, half-visible white icon that
 * turns to the accent hue on hover. Matches the live `.lightbox` controls.
 */
const lightboxControl =
	'fixed top-0 flex cursor-pointer items-center justify-center bg-transparent text-neutral-000 opacity-50 transition-[opacity,color] duration-300 hover:opacity-100 hover:text-primary-400';

/**
 * Renders the full-bleed image gallery: a centered bullet heading above a
 * wrapped row of fixed-height (470px) images, each opening a full-screen
 * lightbox.
 *
 * The lightbox mirrors the live site: 90% black overlay, 50px full-height
 * side hit zones for previous/next, a 60×60 close control top-right, and a
 * centered image constrained to the viewport. Keyboard: ←/→ navigate,
 * Escape closes.
 */
export default function GalleryBlock({ block }: GalleryBlockProps) {
	const { images, className } = block.props;
	const [open, setOpen] = useState<number | null>(null);

	const close = useCallback(() => setOpen(null), []);
	const step = useCallback(
		(delta: number) => {
			setOpen((cur) => (cur === null || images.length === 0 ? cur : (cur + delta + images.length) % images.length));
		},
		[images.length],
	);

	useEffect(() => {
		if (open === null) return;

		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') close();
			if (event.key === 'ArrowLeft') step(-1);
			if (event.key === 'ArrowRight') step(1);
		};

		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', onKey);

		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', onKey);
		};
	}, [open, close, step]);

	if (images.length === 0) return null;

	return (
		<section className={['py-0', className].filter(Boolean).join(' ')}>
			<h3 className="mb-6 text-center text-[1.75rem] font-bold leading-normal text-neutral-800">•</h3>

			<div className="mt-10 flex flex-wrap">
				{images.map((image, i) => (
					<a
						key={image.id}
						href={image.url}
						target="_blank"
						rel="noopener noreferrer"
						onClick={(event) => {
							event.preventDefault();
							setOpen(i);
						}}
					>
						<img
							src={image.url}
							alt={image.alt}
							width={image.width ?? undefined}
							height={image.height ?? undefined}
							loading="lazy"
							className="h-[470px] w-auto"
						/>
					</a>
				))}
			</div>

			{open !== null && (
				<div
					className="fixed inset-0 z-[99999] overflow-auto bg-black/90"
					role="dialog"
					aria-modal="true"
					aria-label="Image lightbox"
				>
					<div className="mx-[50px] flex min-h-screen items-center justify-center">
						<img src={images[open].url} alt={images[open].alt} className="h-auto max-w-full" />
					</div>

					<button
						type="button"
						aria-label="Previous image"
						onClick={() => step(-1)}
						className={`${lightboxControl} -mt-[14px] left-0 w-[50px]`}
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 rotate-180">
							<path d="m9 18 6-6-6-6" />
						</svg>
					</button>

					<button
						type="button"
						aria-label="Next image"
						onClick={() => step(1)}
						className={`${lightboxControl} -mt-[14px] right-0 w-[50px]`}
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
							<path d="m9 18 6-6-6-6" />
						</svg>
					</button>

					<button
						type="button"
						aria-label="Close lightbox"
						onClick={close}
						className={`${lightboxControl} z-[5002] right-5 top-5 h-[60px] w-[60px]`}
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
							<path d="M18 6 6 18M6 6l12 12" />
						</svg>
					</button>
				</div>
			)}
		</section>
	);
}
