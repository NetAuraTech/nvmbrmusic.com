import type { LegalIdentity } from '#types/seo';

/**
 * Legal variables available as `{{legal.<key>}}` tokens in the stored content
 * of `htmltext` blocks.
 *
 * Tokens are resolved at render time by `PageResolverService` from the
 * publisher identity configured through the `LEGAL_*` environment variables
 * (see `config/seo.ts`), so the same stored content renders the configured
 * values on every deployment. The list is also surfaced to the page builder
 * so its users can insert a token and see its current value.
 *
 * Adding a new variable requires three things: a `LEGAL_*` env var, a field
 * on `LegalIdentity` / `seoConfig.identity`, and an entry in this list.
 */
export const LEGAL_VARIABLE_KEYS = ['name', 'email', 'siret', 'address', 'phone'] as const;

export type LegalVariableKey = (typeof LEGAL_VARIABLE_KEYS)[number];

/** Matches a `{{legal.<key>}}` token, tolerating whitespace inside the braces. */
const TOKEN_PATTERN = /\{\{\s*legal\.([a-z_]+)\s*\}\}/g;

/**
 * Resolves the `{{legal.<key>}}` tokens of an htmltext content string.
 *
 * A token for a known key is replaced by the identity value, or by an empty
 * string when the variable is not configured. A token for an unknown key is
 * left untouched so a typo stays visible in the builder preview and on the
 * rendered page rather than silently rendering a hole in the text.
 *
 * The input string is not mutated — a new string is returned.
 *
 * @param content - The stored htmltext content.
 * @param identity - Publisher identity the tokens are resolved against.
 */
export function resolveLegalTokens(content: string, identity: LegalIdentity): string {
	if (!TOKEN_PATTERN.test(content)) {
		TOKEN_PATTERN.lastIndex = 0;
		return content;
	}
	TOKEN_PATTERN.lastIndex = 0;

	return content.replace(TOKEN_PATTERN, (token, key: string) => {
		if (!(LEGAL_VARIABLE_KEYS as readonly string[]).includes(key)) {
			return token;
		}
		return identity[key as LegalVariableKey] ?? '';
	});
}
