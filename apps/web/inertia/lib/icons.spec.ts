import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
/**
 * Drift test for the local Lucide icon registry (`./icons`).
 *
 * The production CSP (`connect-src 'self' https://*.sentry.io`) forbids the
 * Iconify API the `Icon` atom would otherwise fall back to, so every icon
 * name used in the app must be pre-registered in `registeredIcons`. This spec
 * scans the app, design system, and admin-nav sources and fails if any icon
 * name is missing from the registry — a new icon that is not registered would
 * render empty (and log CSP violations) in production.
 */
import { Icon } from '@foundry/design-system/icon';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { registeredIcons } from './icons';

const here = dirname(fileURLToPath(import.meta.url)); // apps/web/inertia/lib
const appRoot = join(here, '..', '..'); // apps/web
const repoRoot = join(appRoot, '..', '..');

function* walk(dir: string): Generator<string> {
	for (const entry of readdirSync(dir)) {
		if (entry === 'node_modules' || entry === '.adonisjs' || entry.startsWith('.')) continue;
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			yield* walk(full);
		} else if (/\.(ts|tsx)$/.test(entry) && !/\.(spec|stories)\.tsx?$/.test(entry)) {
			yield full;
		}
	}
}

/**
 * Collects the PascalCase icon names the app resolves through the `Icon`
 * atom: `Icon name="…"`, `icon="…"` / `icon={… '…' …}` props, and `icon: '…'`
 * entries in the admin nav files.
 */
function collectUsedIconNames(): Set<string> {
	const names = new Set<string>();
	const attributePatterns = [
		/Icon name="([A-Z][A-Za-z0-9]*)"/g,
		/\bicon="([A-Z][A-Za-z0-9]*)"/g,
		/\bicon:\s*'([A-Z][A-Za-z0-9]*)'/g,
		/\bicon:\s*"([A-Z][A-Za-z0-9]*)"/g,
	];

	const dirs = [
		join(appRoot, 'inertia'),
		join(appRoot, 'app'),
		join(appRoot, 'start'),
		join(repoRoot, 'packages', 'design-system', 'src'),
	];

	for (const dir of dirs) {
		for (const file of walk(dir)) {
			const source = readFileSync(file, 'utf8');
			for (const pattern of attributePatterns) {
				for (const match of source.matchAll(pattern)) {
					names.add(match[1]);
				}
			}
			// icon={expression} props holding 'PascalCase' literals
			for (const match of source.matchAll(/\bicon=\{([^}]*)\}/g)) {
				for (const quoted of match[1].matchAll(/'([A-Z][A-Za-z0-9]*)'/g)) {
					names.add(quoted[1]);
				}
			}
		}
	}

	return names;
}

describe('icon registry drift', () => {
	it('registers every icon name used in the app sources', () => {
		const used = collectUsedIconNames();
		const missing = [...used].filter((name) => !(name in registeredIcons)).sort();

		expect(missing, `icon names used in the sources but missing from registeredIcons: ${missing.join(', ')}`).toEqual(
			[],
		);
	});
});

describe('icon registry rendering', () => {
	it('renders a registered icon as inline SVG without any network load (SSR-safe)', () => {
		const html = renderToString(createElement(Icon, { name: 'ChevronLeft', size: 16 }));

		// A missing registration would yield an empty <svg> placeholder that
		// triggers an (in production, CSP-blocked) fetch of the Iconify API.
		expect(html).toContain('<svg');
		expect(html).toContain('<path');
	});
});
