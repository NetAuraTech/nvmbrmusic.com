import { useState } from 'react';
import { sanitizeHtml } from '~/components/cms/utils/purify';
import { resolveResponsive } from '~/components/cms/utils/responsive';
import type { ResolvedBlock, MediaAspect } from '#cms/types/page';

interface VideoBlockProps {
	block: ResolvedBlock<'video'>;
}

/**
 * Maps a `MediaAspect` value to a stable aspect-ratio container class so the
 * embed reserves its space before load (no layout shift / CLS).
 * Statically defined so Tailwind's compiler sees every class.
 */
const aspectMap: Record<MediaAspect, Record<'default', string>> = {
	'16:9': { default: 'aspect-video' },
	'4:3': { default: 'aspect-4/3' },
	'1:1': { default: 'aspect-square' },
};

/**
 * Extracts the YouTube video id from a resolved embed URL
 * (`https://www.youtube-nocookie.com/embed/<id>`) — used to build the
 * click-to-load thumbnail URL.
 */
function youtubeIdFromEmbedUrl(embedUrl: string): string | null {
	const id = embedUrl.split('/').pop();
	return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
}

/**
 * Renders a video block: either a provider embed (YouTube / Vimeo via a
 * sandboxed iframe) or a direct media file via the native `<video>` element.
 *
 * The server resolver has already classified the URL — `embedUrl` is set for
 * provider embeds, `url` for direct files, both `null` when the embed policy
 * rejected the source. The block renders nothing when there is no playable
 * source.
 *
 * YouTube embeds are click-to-load: a thumbnail with the YouTube play button
 * is shown first, and the sandboxed iframe is only mounted (with `autoplay`)
 * on activation — keeping the initial page weight down, like the live site.
 */
export default function VideoBlock({ block }: VideoBlockProps) {
	const { kind, url, embedUrl, poster, caption, aspect, className } = block.props;
	const [activated, setActivated] = useState(false);

	// No playable source (empty or rejected by the embed policy) — render nothing
	if (kind !== 'embed' && kind !== 'file') return null;
	if (kind === 'embed' && !embedUrl) return null;
	if (kind === 'file' && !url) return null;

	const aspectClasses = resolveResponsive(aspect, aspectMap) || 'aspect-video';
	const safeCaption = caption ? sanitizeHtml(caption) : '';

	const isYouTubePlaceholder = kind === 'embed' && block.props.provider === 'youtube' && !activated;
	const videoId = isYouTubePlaceholder ? youtubeIdFromEmbedUrl(embedUrl!) : null;

	let media: React.ReactNode;

	if (videoId) {
		media = (
			<>
				<img
					src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
					alt=""
					className="absolute inset-0 h-full w-full object-cover"
					loading="lazy"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 28.57 20"
					className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.57 20">
						<path
							fill="red"
							d="M27.973 3.123A3.578 3.578 0 0 0 25.447.597C23.22 0 14.285 0 14.285 0S5.35 0 3.123.597A3.578 3.578 0 0 0 .597 3.123C0 5.35 0 10 0 10s0 4.65.597 6.877a3.578 3.578 0 0 0 2.526 2.526C5.35 20 14.285 20 14.285 20s8.935 0 11.162-.597a3.578 3.578 0 0 0 2.526-2.526C28.57 14.65 28.57 10 28.57 10s-.002-4.65-.597-6.877Z"
						/>
						<path fill="#fff" d="M11.425 14.285 18.848 10l-7.423-4.285v8.57Z" />
					</svg>
				</svg>
			</>
		);
	} else if (kind === 'embed') {
		media = (
			<iframe
				src={activated ? `${embedUrl!}${embedUrl!.includes('?') ? '&' : '?'}autoplay=1` : embedUrl!}
				title="Embedded video"
				className="absolute inset-0 h-full w-full border-0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				loading="lazy"
				// Sandboxed embed: no top-navigation, no popups
				sandbox="allow-scripts allow-same-origin allow-presentation"
				referrerPolicy="strict-origin-when-cross-origin"
			/>
		);
	} else {
		media = (
			<video
				src={url!}
				poster={poster?.url}
				controls
				preload="metadata"
				className="absolute inset-0 h-full w-full object-cover"
			/>
		);
	}

	const activate = () => setActivated(true);

	return (
		<figure className={className}>
			<div
				role={videoId ? 'button' : undefined}
				tabIndex={videoId ? 0 : undefined}
				aria-label={videoId ? 'Play video' : undefined}
				onClick={videoId ? activate : undefined}
				onKeyDown={
					videoId
						? (event) => {
								if (event.key === 'Enter' || event.key === ' ') {
									event.preventDefault();
									activate();
								}
							}
						: undefined
				}
				className={`relative w-full overflow-hidden ${aspectClasses} ${videoId ? 'cursor-pointer' : ''}`}
			>
				{media}
			</div>
			{safeCaption ? (
				<figcaption
					className="mt-2 text-sm text-ink-muted"
					// Caption is sanitized by sanitizeHtml (defence-in-depth on top of
					// the server-side save-time sanitization).
					dangerouslySetInnerHTML={{ __html: safeCaption }}
				/>
			) : null}
		</figure>
	);
}
