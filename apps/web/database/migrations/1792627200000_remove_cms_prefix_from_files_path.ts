import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
	protected tableName = 'files';

	async up() {
		// Rewrite stored paths from the legacy `cms/files/` layout to the flat
		// `files/` layout. The matching objects must already have been moved
		// on the storage disk (see the issue on the foundry repo).
		await this.schema.raw(
			`update ${this.tableName} set "path" = replace("path", 'cms/files/', 'files/') where "path" like 'cms/files/%'`,
		);
	}

	async down() {
		// Anchor the rewrite to the path prefix: a bare `replace()` would also
		// corrupt later segments (e.g. `files/sub-files/x.jpg`).
		await this.schema.raw(
			`update ${this.tableName} set "path" = regexp_replace("path", '^files/', 'cms/files/') where "path" like 'files/%'`,
		);
	}
}
