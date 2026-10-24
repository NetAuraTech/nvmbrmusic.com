import { SharedProps } from '@adonisjs/inertia/types';
import { Head, router, usePage } from '@inertiajs/react';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { urlFor } from '~/client';

/**
 * November (nvmbrmusic.com) static layout assets — the header logo and the
 * band portrait, served from the R2 bucket the CMS files live in.
 */
const R2_FILES = 'https://files.nvmbrmusic.com/files';
const HEADER_LOGO_URL = `${R2_FILES}/8b3830cd-d9df-4b1d-a0c0-df6d0ee93c4b.png`;
const PORTRAIT_URL = `${R2_FILES}/37e003ac-05b5-4101-b28b-1139f576de5b.png`;
const BAND_EMAIL = 'netfastcoremusic@gmail.com';

const NAV_LINKS = [
	{ label: 'Show dates', href: '#show' },
	{ label: 'Discography', href: '#discography' },
	{ label: 'Merchandising', href: '#merchandising' },
	{ label: 'Contact', href: '#contact' },
];

const BAND_MEMBERS = [
	'Gauthier Joyez - Vocals',
	'Lucas Decarnin - Guitar',
	'Cyril Boulet - Guitar',
	'Rémy Finet - Bass',
	'Jerôme Molenda - Drums',
];

const LABEL_LINKS = [
	{
		href: 'https://www.facebook.com/DTTHREC/',
		url: `${R2_FILES}/39e913c4-ced9-4907-b07d-e3528ad7d864.png`,
		width: 72,
		height: 100,
	},
	{
		href: 'https://www.facebook.com/klvr.records/',
		url: `${R2_FILES}/14653d71-7386-4773-8633-9a04f2d6be66.png`,
		width: 139,
		height: 100,
	},
	{
		href: 'https://www.facebook.com/sleepydogrecords.bsm/',
		url: `${R2_FILES}/92bf9e36-f90a-4109-b41c-433c4291b7b8.png`,
		width: 116,
		height: 100,
	},
	{
		href: 'https://www.theneedlesfactory.com/',
		url: `${R2_FILES}/f6d008d1-6ffe-4db4-9687-bde89b428f5a.png`,
		width: 100,
		height: 100,
	},
];

/** Shared classes for every November footer link (primary → accent hover). */
const FOOTER_LINK = 'text-primary-500 no-underline transition-colors duration-300 hover:text-accent-500';

/** Shared classes for the November footer headings (light text on the band portrait). */
const FOOTER_HEADING = 'my-6 text-primary-500 font-bold [line-height:normal]';

/**
 * Current year for the footer copyright line, computed once at module load
 * so the render itself stays pure (the value only changes once a year).
 */
const FOOTER_YEAR = new Date().getFullYear();

interface LayoutProps {
	children: ReactElement<SharedProps>;
}

/**
 * Root layout for all public-facing pages.
 *
 * Renders the November sticky header (logo, anchor nav, mobile burger drawer)
 * and the band footer (members, portrait, contact, label links, copyright)
 * around the page content.
 */
export default function Layout(props: LayoutProps) {
	const { children } = props;
	const { props: pageProps, url, flash, component } = usePage<SharedProps>();
	const { app_name, app_url } = pageProps;

	const homeHref = urlFor('core.home.render');

	// The mobile nav drawer is a fixed off-canvas panel; the burger button
	// morphs into a close glyph while it is open. State is owned here — the
	// layout is the only place that needs it.
	const [navOpen, setNavOpen] = useState(false);

	const closeNav = useCallback(() => {
		setNavOpen(false);

		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}
	}, []);

	useEffect(() => {
		const unregisterListener = router.on('success', closeNav);

		return () => unregisterListener();
	}, [closeNav]);

	useEffect(() => {
		toast.dismiss();

		if (flash.error) toast.error(flash.error);
		if (flash.success) toast.success(flash.success);
		if (flash.info) toast.info(flash.info);
	}, [url, flash]);

	const image_alt = '';
	const geo = {
		region: '',
		placename: '',
	};

	// Error surfaces must not be indexed; every other page is open to crawlers.
	const isNoindexPage = (component ?? '').startsWith('errors/');
	const robots = isNoindexPage
		? 'noindex, nofollow'
		: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

	return (
		<>
			<Head>
				<link rel="canonical" href={`${app_url}${url}`} />
				<link rel="preconnect" href="https://api.iconify.design" />
				<link rel="dns-prefetch" href="https://api.iconify.design" />
				<meta name="robots" content={robots} />
				<meta name="language" content="fr" />
				<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<meta name="apple-mobile-web-app-title" content={app_name} />
				<link rel="manifest" href="/site.webmanifest" />
				<meta property="og:url" content={`${app_url}${url}`} />
				<meta property="og:site_name" content={app_name} />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="fr_FR" />
				<meta property="og:image:alt" content={`${app_name} - ${image_alt}`} />
				<meta name="geo.region" content={geo.region} />
				<meta name="geo.placename" content={geo.placename} />
				<meta name="author" content={app_name} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={app_name} />
				<meta name="twitter:image:alt" content={`${app_name} - ${image_alt}`} />
			</Head>
			<Toaster position="top-right" richColors />
			<div className="flex min-h-screen flex-col">
				<header
					id="header"
					aria-expanded={navOpen}
					className={[
						'sticky top-0 z-[1000] flex items-center justify-between bg-neutral-000 p-4 font-bebas text-primary-900',
						navOpen ? 'overflow-visible' : 'overflow-hidden',
						'min-[65em]:gap-4 min-[65em]:px-20 min-[65em]:py-6',
					].join(' ')}
				>
					<a
						href={homeHref}
						title="November"
						className="font-bold text-primary-900 no-underline transition-colors duration-300 hover:text-primary-500"
					>
						<img
							src={HEADER_LOGO_URL}
							alt="November"
							width={277}
							height={85}
							className="mr-4 h-auto w-[195px] min-[65em]:w-auto"
						/>
					</a>

					<ul
						id="primary-navigation"
						aria-expanded={navOpen}
						className={[
							// Mobile off-canvas drawer (fades in once slid on-screen).
							navOpen
								? 'fixed top-[92px] right-0 bottom-0 h-max w-[250px] p-4 bg-neutral-000 opacity-100'
								: 'fixed top-[92px] right-[-300px] bottom-0 h-max w-[250px] p-4 bg-neutral-000 opacity-0',
							'transition-opacity duration-500',
							// Desktop inline nav (overrides the drawer at 65em+).
							'min-[65em]:relative min-[65em]:top-0 min-[65em]:right-0 min-[65em]:bottom-auto min-[65em]:h-auto min-[65em]:w-auto min-[65em]:gap-8 min-[65em]:p-0 min-[65em]:opacity-100 min-[65em]:bg-transparent min-[65em]:flex min-[65em]:items-center',
						].join(' ')}
					>
						{NAV_LINKS.map((link, index) => (
							<li key={link.href}>
								<a
									href={link.href}
									onClick={closeNav}
									className={[
										'text-[1.5rem] text-primary-900 no-underline transition-colors duration-300 hover:text-primary-500',
										index > 0
											? 'min-[65em]:before:content-["|"] min-[65em]:before:px-[10px] min-[65em]:before:text-primary-900 min-[75em]:before:px-[35px]'
											: '',
									]
										.filter(Boolean)
										.join(' ')}
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>

					<button
						id="js-burger"
						type="button"
						aria-controls="primary-navigation"
						aria-expanded={navOpen}
						aria-label="Toggle navigation"
						onClick={() => setNavOpen(!navOpen)}
						className="block overflow-hidden bg-transparent text-primary-900 min-[65em]:hidden"
					>
						<svg
							stroke="currentColor"
							fill="none"
							viewBox="-10 -10 120 120"
							width={50}
							height={50}
							className={[
								'transition-[translate,rotate] duration-1000',
								navOpen ? 'translate-x-[3px] rotate-[22.5deg]' : '',
							]
								.filter(Boolean)
								.join(' ')}
						>
							<path
								d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70"
								strokeWidth="6"
								strokeLinecap="round"
								strokeLinejoin="round"
								className={
									navOpen
										? 'transition-all duration-1000 [stroke-dasharray:60_105_60_300] [stroke-dashoffset:-90]'
										: 'transition-all duration-1000 [stroke-dasharray:60_31_60_300]'
								}
							/>
						</svg>
					</button>
				</header>
				{children}
				<footer className="relative mt-auto bg-paper font-bebas text-lg leading-normal text-neutral-100 min-[75em]:text-[1.3125rem]">
					<section id="contact" className="py-6">
						<div className="container">
							<div className="mt-10 grid-auto-fit-[230px] gap-6">
								<div className="py-6">
									<h3 className={FOOTER_HEADING}>
										<span className="font-bold text-neutral-100">NOVEMBER IS</span>
									</h3>
									{BAND_MEMBERS.map((member) => (
										<p key={member}>{member}</p>
									))}
								</div>

								<div className="mt-10 flex justify-center py-6">
									<img src={PORTRAIT_URL} alt="" width={230} height={235} loading="lazy" className="h-[235px] w-auto" />
								</div>

								<div className="py-6">
									<h3 className={`text-right ${FOOTER_HEADING}`}>
										<span className="font-bold text-neutral-100">Contact us</span>
									</h3>
									<p className="text-right">
										<a
											href={`mailto:${BAND_EMAIL}`}
											target="_blank"
											rel="noopener noreferrer nofollow"
											className={FOOTER_LINK}
										>
											{BAND_EMAIL}
										</a>
									</p>
									<h3 className={`text-right ${FOOTER_HEADING}`}>
										<span className="font-bold text-neutral-100">Booking</span>
									</h3>
									<p className="text-right">
										<a
											href={`mailto:${BAND_EMAIL}`}
											target="_blank"
											rel="noopener noreferrer nofollow"
											className={FOOTER_LINK}
										>
											{BAND_EMAIL}
										</a>
									</p>
								</div>
							</div>

							<div className="my-10 flex justify-center gap-8">
								{LABEL_LINKS.map((label) => (
									<a
										key={label.href}
										href={label.href}
										target="_blank"
										rel="noopener noreferrer nofollow"
										className="group"
									>
										<img
											src={label.url}
											alt=""
											width={label.width}
											height={label.height}
											loading="lazy"
											className="h-[100px] w-auto transition-transform duration-300 group-hover:scale-120"
										/>
									</a>
								))}
							</div>

							<p className="text-center">
								© {FOOTER_YEAR} All Rights Reserved to November | Created by{' '}
								<a
									href="https://www.netauratech.fr"
									target="_blank"
									rel="noopener noreferrer nofollow"
									className={FOOTER_LINK}
								>
									NetAuraTech
								</a>{' '}
								|{' '}
								<a href="/legal-notices" rel="noopener noreferrer nofollow" className={FOOTER_LINK}>
									Legal Notices
								</a>
							</p>
						</div>
					</section>
				</footer>
			</div>
		</>
	);
}
