/**
 * The publisher identity shared with the public front for structured-data
 * purposes, resolved from the `LEGAL_*` environment variables in
 * `config/seo.ts`.
 *
 * Every field is optional: an unconfigured deployment shares an empty
 * identity and the front omits the corresponding JSON-LD fields rather than
 * emitting empty or placeholder values.
 */
export interface LegalIdentity {
	/** Legal name of the publisher (company or trade name). */
	name?: string;

	/** SIRET number (France), 14 digits. */
	siret?: string;

	/** Free-form postal address line, e.g. `"8 avenue des Tilleuls, 75011, Paris, France"`. */
	address?: string;

	/** Public contact telephone number, e.g. `'+33 3 12 34 56 78'`. */
	phone?: string;

	/** Public contact email address, e.g. `'contact@example.com'`. */
	email?: string;
}
