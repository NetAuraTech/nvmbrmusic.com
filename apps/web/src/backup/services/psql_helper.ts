import { spawn as defaultSpawn, type ChildProcess } from 'node:child_process';
import { unlink, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

export interface PsqlRestoreOptions {
	host: string;
	port: number;
	user: string;
	database: string;
	password: string;
	sqlPath: string;
	/**
	 * Schemas to reset before replaying the dump, so a restore works onto a
	 * live database whose objects already exist as well as onto an empty one.
	 * Each schema's tables, views, sequences and types are dropped before the
	 * replay (in the same transaction). Omit for a bare replay without any
	 * pre-drop (the target must not contain the dumped objects).
	 */
	schemas?: string[];
	/**
	 * Limit the pre-drop to these tables only (differential restores).
	 * Requires `schemas`. Without it, every table of each schema is dropped.
	 */
	tables?: string[];
}

/**
 * Quote an SQL identifier, doubling any embedded double quote.
 *
 * @param identifier - Identifier to quote.
 * @returns The quoted identifier.
 */
function quoteIdent(identifier: string): string {
	return `"${identifier.replaceAll('"', '""')}"`;
}

/**
 * Build the pre-drop SQL for a single schema.
 *
 * With `tables`, only those tables are dropped (differential restore).
 * Without it, every table, view, materialized view, sequence and type of the
 * schema is dropped (full restore) — the dump re-creates all of them.
 *
 * @param schema - Schema to reset.
 * @param tables - Optional table whitelist.
 * @returns The pre-drop SQL statements for the schema.
 */
function buildSchemaPrelude(schema: string, tables?: string[]): string {
	if (tables && tables.length > 0) {
		return tables.map((table) => `DROP TABLE IF EXISTS ${quoteIdent(schema)}.${quoteIdent(table)} CASCADE;`).join('\n');
	}

	const schemaIdent = quoteIdent(schema);
	const schemaLiteral = `'${schema.replaceAll("'", "''")}'`;
	return `DO $$
DECLARE
	obj record;
BEGIN
	FOR obj IN
		SELECT c.relname, c.relkind
		FROM pg_class c
		JOIN pg_namespace n ON n.oid = c.relnamespace
		WHERE n.nspname = ${schemaLiteral} AND c.relkind IN ('r', 'v', 'm', 'S')
	LOOP
		IF obj.relkind = 'r' THEN
			EXECUTE format('DROP TABLE IF EXISTS ${schemaIdent}.%I CASCADE', obj.relname);
		ELSIF obj.relkind = 'm' THEN
			EXECUTE format('DROP MATERIALIZED VIEW IF EXISTS ${schemaIdent}.%I CASCADE', obj.relname);
		ELSIF obj.relkind = 'v' THEN
			EXECUTE format('DROP VIEW IF EXISTS ${schemaIdent}.%I CASCADE', obj.relname);
		ELSIF obj.relkind = 'S' THEN
			EXECUTE format('DROP SEQUENCE IF EXISTS ${schemaIdent}.%I CASCADE', obj.relname);
		END IF;
	END LOOP;

	FOR obj IN
		SELECT t.typname
		FROM pg_type t
		JOIN pg_namespace n ON n.oid = t.typnamespace
		WHERE n.nspname = ${schemaLiteral} AND t.typtype IN ('b', 'c', 'd', 'e')
	LOOP
		EXECUTE format('DROP TYPE IF EXISTS ${schemaIdent}.%I CASCADE', obj.typname);
	END LOOP;
END
$$;`;
}

/**
 * Restore a database by replaying a SQL dump through `psql`.
 *
 * **Flag hardening**
 *
 * `-v ON_ERROR_STOP=1` makes `psql` abort on the first failing statement, and
 * `-1` wraps the whole restore in a single transaction, so a failing restore
 * rolls back instead of partially applying the dump.
 *
 * **Pre-drop**
 *
 * When `options.schemas` is set, a generated prelude is replayed first (same
 * transaction) so the pure-CREATE dump can target a live database: each
 * schema's tables, views, sequences and types are dropped, while the schema
 * itself, its ACL, its extensions and any database-level objects (event
 * triggers, platform helpers) are left untouched.
 *
 * **Dependency injection for testability**
 *
 * The `_spawn` parameter is prefixed with `_` to signal it is an internal override.
 * In production, callers omit it and the real `node:child_process.spawn` is used.
 * In tests, pass a sinon stub to avoid spawning actual processes.
 *
 * @param options - psql connection and dump-file configuration.
 * @param _spawn - Optional spawn function for testability (defaults to node:child_process.spawn).
 */
export async function restoreDatabaseWithPsql(
	options: PsqlRestoreOptions,
	_spawn: typeof defaultSpawn = defaultSpawn,
): Promise<void> {
	const schemas = (options.schemas ?? []).filter(Boolean);
	const preludePath =
		schemas.length > 0 ? join(dirname(options.sqlPath), `restore-prelude-${process.pid}.sql`) : undefined;

	if (preludePath) {
		const prelude = schemas.map((schema) => buildSchemaPrelude(schema, options.tables)).join('\n');
		await writeFile(preludePath, prelude, 'utf8');
	}

	try {
		await new Promise<void>((resolve, reject) => {
			const args = [
				'-v',
				'ON_ERROR_STOP=1',
				'-1',
				'-h',
				options.host,
				'-p',
				String(options.port),
				'-U',
				options.user,
				'-d',
				options.database,
			];

			if (preludePath) {
				args.push('-f', preludePath);
			}

			args.push('-f', options.sqlPath);

			const psql: ChildProcess = _spawn('psql', args, {
				env: { ...process.env, PGPASSWORD: options.password },
			});

			let errorOutput = '';
			psql.stderr!.on('data', (data) => {
				errorOutput += data.toString();
			});
			psql.on('close', (code) => {
				if (code === 0) {
					resolve();
					return;
				}
				reject(new Error(`psql failed with code ${code}: ${errorOutput}`));
			});
			psql.on('error', (error) => {
				reject(new Error(`Failed to start psql: ${error.message}`));
			});
		});
	} finally {
		if (preludePath) {
			await unlink(preludePath).catch(() => {
				// Prelude already gone — no-op
			});
		}
	}
}
