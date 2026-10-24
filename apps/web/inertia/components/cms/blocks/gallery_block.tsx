import { useCallback, useEffect, useRef, useState } from 'react';
import type { ResolvedBlock } from '#cms/types/page';
import type { ResolvedFile } from '#types/file';

interface GalleryBlockProps {
	block: ResolvedBlock<'gallery'>;
}

/** Height the gallery rows are packed against, as on the live site (`rowHeight="470"`). */
const ROW_HEIGHT = 470;

/**
 * Live-site lightbox button base — transparent, half-visible white icon that
 * turns to the accent hue on hover. Matches the live `.lightbox` controls.
 */
const lightboxControl =
	'fixed top-0 flex cursor-pointer items-center justify-center bg-transparent text-neutral-000 opacity-50 transition-[opacity,color] duration-300 hover:opacity-100 hover:text-primary-400';

/**
 * Packs the gallery images into rows exactly like the live `automatic-gallery`
 * element (core-cms `AutomaticGallery.ts`): walk the images in order, keep
 * adding an image to the current row while the row's natural width (at
 * `ROW_HEIGHT`) is below the container width, and close the row once it
 * reaches or exceeds it — the image that overflows stays in the row. Any
 * leftover images form the final row.
 *
 * @param widths - Natural width of each image at `ROW_HEIGHT`
 * @param containerWidth - Measured width of the gallery container
 * @returns The row indices of `widths`, in display order
 */
function packRows(widths: number[], containerWidth: number): number[][] {
	const rows: number[][] = [];
	let index = 0;
	let rowWidth = 0;
	let rowStartAt = 0;

	while (index < widths.length) {
		const newRowWidth = rowWidth + widths[index];

		if (rowWidth < containerWidth) {
			index += 1;
			rowWidth = newRowWidth;
			continue;
		}

		if (rowWidth > 0 && newRowWidth - containerWidth > containerWidth - rowWidth) {
			index -= 1;
		}

		rows.push(widths.slice(rowStartAt, index + 1).map((_, i) => rowStartAt + i));
		rowStartAt = index + 1;
		rowWidth = 0;
		index += 1;
	}

	if (rowStartAt < widths.length) {
		rows.push(widths.slice(rowStartAt).map((_, i) => rowStartAt + i));
	}

	return rows;
}

function GalleryImage({ image, fill, onOpen }: { image: ResolvedFile; fill: boolean; onOpen: () => void }) {
	return (
		<a
			href={image.url}
			target="_blank"
			rel="noopener noreferrer"
			onClick={(event) => {
				event.preventDefault();
				onOpen();
			}}
		>
			<img
				src={image.url}
				alt={image.alt}
				width={image.width ?? undefined}
				height={image.height ?? undefined}
				loading="lazy"
				className={fill ? 'block h-auto w-full' : 'h-[470px] w-auto'}
			/>
		</a>
	);
}

/**
 * Renders the full-bleed image gallery: a centered bullet heading above rows
 * of images, each opening a full-screen lightbox.
 *
 * Row packing mirrors the live site: each row is a grid whose columns are
 * proportional to the images' natural widths, so every row is filled exactly
 * (two rows on desktop) and the images scale to complete the space instead of
 * wrapping at a fixed 470px height with gaps. Until the container width is
 * measured (SSR, first paint), the gallery falls back to a plain wrapped row
 * of 470px-tall images.
 *
 * The lightbox mirrors the live site: 90% black overlay, 50px full-height
 * side hit zones for previous/next, a 60×60 close control top-right, and a
 * centered image constrained to the viewport. Keyboard: ←/→ navigate,
 * Escape closes.
 */
export default function GalleryBlock({ block }: GalleryBlockProps) {
	const { images, className } = block.props;
	const [open, setOpen] = useState<number | null>(null);
	const wrapRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState<number | null>(null);

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

	useEffect(() => {
		const el = wrapRef.current;

		if (!el) return;

		const observer = new ResizeObserver((entries) => setContainerWidth(entries[0].contentRect.width));
		observer.observe(el);

		return () => observer.disconnect();
	}, []);

	if (images.length === 0) return null;

	const sizedWidths = images.map((image) =>
		image.width && image.height ? (image.width / image.height) * ROW_HEIGHT : null,
	);
	const rowWidths = sizedWidths.map((width) => width ?? 0);
	const rows =
		containerWidth !== null && sizedWidths.every((width) => width !== null)
			? packRows(rowWidths, containerWidth)
			: null;

	return (
		<section className={['py-0', className].filter(Boolean).join(' ')}>
			<h3 className="mb-6 text-center text-[1.75rem] font-bold leading-normal text-neutral-800">•</h3>

			{rows === null ? (
				<div ref={wrapRef} className="mt-10 flex flex-wrap">
					{images.map((image, i) => (
						<GalleryImage key={image.id} image={image} fill={false} onOpen={() => setOpen(i)} />
					))}
				</div>
			) : (
				<div ref={wrapRef} className="mt-10 flex flex-col">
					{rows.map((row) => (
						<div
							key={row[0]}
							className="grid"
							style={{ gridTemplateColumns: row.map((i) => `${rowWidths[i]}fr`).join(' ') }}
						>
							{row.map((i) => (
								<GalleryImage key={images[i].id} image={images[i]} fill onOpen={() => setOpen(i)} />
							))}
						</div>
					))}
				</div>
			)}

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
