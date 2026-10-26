import { Icon as IconifyIcon } from '@iconify/react';
import { cn, tv } from 'tailwind-variants';

// The icon carries no base styling of its own — it is a pure pass-through to
// the Iconify element — but routes its `className` through `tv` so the
// component keeps the package's standard class-merging behaviour.
const icon = tv({
	base: '',
});

interface IconProps {
	/**
	 * Icon identifier. Either a full Iconify name (`'lucide:arrow-left'`) or a
	 * bare PascalCase name (`'ArrowLeft'`), which resolves to the Lucide set.
	 */
	name: string;
	/** Icon size in pixels. */
	size?: number;
	/** Additional Tailwind classes. */
	className?: string;
}

/**
 * Converts a PascalCase icon name to the kebab-case identifier Iconify uses.
 * Splits at both letter→letter and letter→digit boundaries, matching the
 * Lucide naming convention (`MousePointer2` → `mouse-pointer-2`, not
 * `mouse-pointer2`, which does not resolve).
 */
export function toKebabCase(str: string) {
	return str
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/([a-zA-Z])([0-9])/g, '$1-$2')
		.toLowerCase();
}

/**
 * Icon component backed by Iconify's local store.
 *
 * Pass a PascalCase name (e.g. `<Icon name="ArrowLeft" />`) to render a Lucide
 * icon, or a full Iconify identifier (e.g. `<Icon name="mdi:github" />`) to
 * render any icon from any Iconify set. The consuming app pre-registers every
 * icon it uses (`apps/web/inertia/lib/icons.ts`), so no Iconify API request is
 * ever made — the production CSP (`connect-src 'self'`) forbids it. `ssr` is
 * always passed so a registered icon renders synchronously on the server and
 * on first paint instead of flashing an empty placeholder.
 *
 * @example
 * <Icon name="ArrowLeft" size={20} className="text-ink-muted" />
 */
export function Icon(props: IconProps) {
	const { name, size, className, ...iconProps } = props;

	const iconName = name.includes(':') ? name : `lucide:${toKebabCase(name)}`;

	return (
		<IconifyIcon
			ssr
			icon={iconName}
			width={size}
			height={size}
			className={cn(icon(), className)}
			{...(iconProps as any)}
		/>
	);
}
