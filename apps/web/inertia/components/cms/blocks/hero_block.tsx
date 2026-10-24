import type { ResolvedBlock } from '#cms/types/page';

interface HeroBlockProps {
	block: ResolvedBlock<'hero'>;
}

/**
 * External social targets, in the same order as the hero's social icons
 * (Facebook, Instagram, X, Bandcamp, YouTube, Big Cartel). Site-wide
 * constants — the icon images themselves come from the block's files.
 */
const SOCIAL_LINKS = [
	'https://www.facebook.com/NOVEMBERNVMBR',
	'https://www.instagram.com/november_band/',
	'https://twitter.com/NOVEMBER_NVMBR',
	'https://wearenovember.bandcamp.com',
	'https://www.youtube.com/channel/UC-bagpSlCwYWiZrzdCy7LWg',
	'https://novembermerch.bigcartel.com/',
];

/**
 * Renders the band hero: a centered logo (an `<h1>` whose accessible name is
 * the visually-hidden site title) above a row of social media icons.
 *
 * The icons scale up and shift toward the site accent hue on hover, matching
 * the live site's `.hero .flex-group` behaviour.
 */
export default function HeroBlock({ block }: HeroBlockProps) {
	const { logo, socials, className } = block.props;

	// `bg-paper`: the live hero sits on the band-portrait panel (black
	// background with the emblem); it is part of the hero's fixed design, so
	// it is applied here rather than through the block's `className` prop.
	return (
		<section className={['bg-paper', 'py-10', className].filter(Boolean).join(' ')}>
			<div className="container">
				<div className="mb-8 flex justify-center">
					<h1 className="font-bold leading-normal text-neutral-800">
						<span className="sr-only">November</span>
						{logo && (
							<img
								src={logo.url}
								alt=""
								width={logo.width ?? 618}
								height={logo.height ?? 630}
								fetchPriority="high"
								className="h-auto w-[618px] max-w-full"
							/>
						)}
					</h1>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-8">
					{socials.map((icon, i) => (
						<a
							key={icon.id}
							href={SOCIAL_LINKS[i] ?? '#'}
							target="_blank"
							rel="noopener noreferrer nofollow"
							className="group"
						>
							<img
								src={icon.url}
								alt=""
								width={icon.width ?? 45}
								height={icon.height ?? 45}
								loading="lazy"
								className="h-[45px] w-auto transition-[transform,filter] duration-300 group-hover:scale-[1.2] group-hover:[filter:sepia(1)_saturate(10)_hue-rotate(135deg)_brightness(0.9)_contrast(1)]"
							/>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
