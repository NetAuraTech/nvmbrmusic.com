/**
 * Local Lucide icon registry.
 *
 * The design system's `Icon` atom resolves a PascalCase name to a `lucide:*`
 * Iconify identifier. Out of the box Iconify lazy-loads the icon data from
 * its public API (api.iconify.design and its mirrors), which the production
 * Content-Security-Policy forbids (`connect-src 'self' https://*.sentry.io`).
 *
 * This module registers every icon the app uses, from the bundled
 * `@iconify-icons/lucide` data, so Iconify finds the data in its local store
 * and never touches the network. Importing it once (client and SSR entries)
 * is enough — `addIcon` populates a module-level store.
 *
 * `icons.spec.ts` fails CI if an icon name used anywhere in the app source
 * is missing from this map, so a new icon cannot silently regress to a
 * network fetch.
 */
import { toKebabCase } from '@foundry/design-system/icon';
import archiveRestore from '@iconify-icons/lucide/archive-restore';
import arrowLeft from '@iconify-icons/lucide/arrow-left';
import bookmark from '@iconify-icons/lucide/bookmark';
import chevronDown from '@iconify-icons/lucide/chevron-down';
import chevronLeft from '@iconify-icons/lucide/chevron-left';
import chevronRight from '@iconify-icons/lucide/chevron-right';
import chevronUp from '@iconify-icons/lucide/chevron-up';
import columns from '@iconify-icons/lucide/columns';
import externalLink from '@iconify-icons/lucide/external-link';
import eye from '@iconify-icons/lucide/eye';
import fileText from '@iconify-icons/lucide/file-text';
import folder from '@iconify-icons/lucide/folder';
import folders from '@iconify-icons/lucide/folders';
import house from '@iconify-icons/lucide/house';
import image from '@iconify-icons/lucide/image';
import keyRound from '@iconify-icons/lucide/key-round';
import layoutGrid from '@iconify-icons/lucide/layout-grid';
import layoutTemplate from '@iconify-icons/lucide/layout-template';
import list from '@iconify-icons/lucide/list';
import listTree from '@iconify-icons/lucide/list-tree';
import loader from '@iconify-icons/lucide/loader';
import moon from '@iconify-icons/lucide/moon';
import mousePointer2 from '@iconify-icons/lucide/mouse-pointer-2';
import panelsTopLeft from '@iconify-icons/lucide/panels-top-left';
import pen from '@iconify-icons/lucide/pen';
import plus from '@iconify-icons/lucide/plus';
import scanEye from '@iconify-icons/lucide/scan-eye';
import scrollText from '@iconify-icons/lucide/scroll-text';
import shieldCheck from '@iconify-icons/lucide/shield-check';
import squareMenu from '@iconify-icons/lucide/square-menu';
import sun from '@iconify-icons/lucide/sun';
import tag from '@iconify-icons/lucide/tag';
import trash from '@iconify-icons/lucide/trash';
import upload from '@iconify-icons/lucide/upload';
import users from '@iconify-icons/lucide/users';
import webhook from '@iconify-icons/lucide/webhook';
import wrench from '@iconify-icons/lucide/wrench';
import x from '@iconify-icons/lucide/x';
import { addIcon } from '@iconify/react';

/**
 * Every Lucide icon the app renders, keyed by the PascalCase name the `Icon`
 * atom receives (the same names used in `Icon name="…"`, `icon="…"` props and
 * admin nav entries).
 */
export const registeredIcons = {
	ArchiveRestore: archiveRestore,
	ArrowLeft: arrowLeft,
	Bookmark: bookmark,
	ChevronDown: chevronDown,
	ChevronLeft: chevronLeft,
	ChevronRight: chevronRight,
	ChevronUp: chevronUp,
	Columns: columns,
	ExternalLink: externalLink,
	Eye: eye,
	FileText: fileText,
	Folder: folder,
	Folders: folders,
	House: house,
	Image: image,
	KeyRound: keyRound,
	LayoutGrid: layoutGrid,
	LayoutTemplate: layoutTemplate,
	List: list,
	ListTree: listTree,
	Loader: loader,
	Moon: moon,
	MousePointer2: mousePointer2,
	PanelsTopLeft: panelsTopLeft,
	Pen: pen,
	Plus: plus,
	ScanEye: scanEye,
	ScrollText: scrollText,
	ShieldCheck: shieldCheck,
	SquareMenu: squareMenu,
	Sun: sun,
	Tag: tag,
	Trash: trash,
	Upload: upload,
	Users: users,
	Webhook: webhook,
	Wrench: wrench,
	X: x,
};

for (const [name, data] of Object.entries(registeredIcons)) {
	addIcon(`lucide:${toKebabCase(name)}`, data);
}
