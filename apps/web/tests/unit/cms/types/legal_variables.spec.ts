import { test } from '@japa/runner';
import { LEGAL_VARIABLE_KEYS, resolveLegalTokens } from '#cms/types/legal_variables';
import type { LegalIdentity } from '#types/seo';

/**
 * Unit tests for the `{{legal.*}}` content variables.
 * Pure string resolution — no database required.
 */
test.group('legal_variables', () => {
	const identity: LegalIdentity = {
		name: 'Lhomme Aymeric',
		email: 'contact@example.com',
		siret: '89082990600027',
		address: "47 résidence de l'Aumônerie, 62830 Samer, France",
		phone: '+33 3 12 34 56 78',
	};

	test('replaces a known token with the identity value', ({ assert }) => {
		const result = resolveLegalTokens('Name: {{legal.name}}', identity);
		assert.equal(result, 'Name: Lhomme Aymeric');
	});

	test('replaces every occurrence of a token', ({ assert }) => {
		const result = resolveLegalTokens('{{legal.name}} — {{legal.name}}', identity);
		assert.equal(result, 'Lhomme Aymeric — Lhomme Aymeric');
	});

	test('replaces several different tokens in one string', ({ assert }) => {
		const result = resolveLegalTokens('{{legal.name}} / {{legal.siret}} / {{legal.email}}', identity);
		assert.equal(result, 'Lhomme Aymeric / 89082990600027 / contact@example.com');
	});

	test('resolves a token inside an HTML attribute value', ({ assert }) => {
		const result = resolveLegalTokens('<a href="mailto:{{legal.email}}">{{legal.email}}</a>', identity);
		assert.equal(result, '<a href="mailto:contact@example.com">contact@example.com</a>');
	});

	test('replaces a known but unconfigured token with an empty string', ({ assert }) => {
		const empty: LegalIdentity = { name: 'Only name' };
		const result = resolveLegalTokens('Phone: {{legal.phone}} Name: {{legal.name}}', empty);
		assert.equal(result, 'Phone:  Name: Only name');
	});

	test('leaves an unknown token untouched', ({ assert }) => {
		const result = resolveLegalTokens('Keep {{legal.bogus}} and {{legal.name}}', identity);
		assert.equal(result, 'Keep {{legal.bogus}} and Lhomme Aymeric');
	});

	test('returns the same string when it contains no token', ({ assert }) => {
		const content = '<p>No token here</p>';
		const result = resolveLegalTokens(content, identity);
		assert.strictEqual(result, content);
	});

	test('tolerates whitespace inside the token braces', ({ assert }) => {
		const result = resolveLegalTokens('{{ legal.name }}', identity);
		assert.equal(result, 'Lhomme Aymeric');
	});

	test('exposes the expected variable keys', ({ assert }) => {
		assert.deepEqual([...LEGAL_VARIABLE_KEYS], ['name', 'email', 'siret', 'address', 'phone']);
	});
});
