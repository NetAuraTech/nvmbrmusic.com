import { spawn as defaultSpawn, type ChildProcess } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';

export interface DumpOptions {
	host: string;
	port: number;
	user: string;
	database: string;
	password: string;
	outputPath: string;
	tables?: string[];
	/**
	 * Schemas to limit the dump to (one `--schema` flag each). Omit to dump
	 * every schema (standard pg_dump behavior).
	 */
	schemas?: string[];
	/**
	 * Sanitize the dump file in place once pg_dump succeeds.
	 * Defaults to true.
	 */
	sanitizeApostrophes?: boolean;
}

/**
 * Sanitize a plain-format pg_dump by wrapping COPY data fields that contain a
 * single quote in double quotes, doubling any embedded double quote, so the
 * dump survives consumers that treat `'` as a string delimiter.
 *
 * Only data rows between a `COPY ... FROM stdin;` line and its `\.` terminator
 * are transformed. Backslash command lines (`\.`, `\restrict`, ...) and every
 * line outside a COPY section are returned untouched.
 *
 * @param input - Raw dump content.
 * @returns The sanitized dump content.
 *
 * @example
 * const safe = sanitizeDumpForApostrophes(rawDump)
 */
export function sanitizeDumpForApostrophes(input: string): string {
	let inCopySection = false;

	return input
		.split('\n')
		.map((line) => {
			if (line.startsWith('\\')) {
				if (line === '\\.') inCopySection = false;
				return line;
			}

			if (line.startsWith('COPY ') && line.includes('FROM stdin;')) {
				inCopySection = true;
				return line;
			}

			if (!inCopySection) return line;

			return line
				.split('\t')
				.map((field) => (field.includes("'") ? `"${field.replaceAll('"', '""')}"` : field))
				.join('\t');
		})
		.join('\n');
}

/**
 * Rewrite a plain-format pg_dump so its `CREATE FUNCTION` statements become
 * `CREATE OR REPLACE FUNCTION`. A plain dump never emits `OR REPLACE`, so
 * replaying it onto a database where the function already exists fails —
 * including functions that are not application code (e.g. Supabase installs
 * `public.rls_auto_enable`, which a `CREATE FUNCTION` without `OR REPLACE`
 * refuses to overwrite).
 *
 * Lines starting with `CREATE FUNCTION` are rewritten; every other line is
 * returned untouched. Lines inside a dollar-quoted function body (`$$` ...
 * `$$;`) are never touched, so function bodies that happen to contain such
 * a line are preserved verbatim.
 *
 * @param input - Raw dump content.
 * @returns The dump content with replaceable function definitions.
 *
 * @example
 * const safe = rewriteFunctionsOrReplace(rawDump)
 */
export function rewriteFunctionsOrReplace(input: string): string {
	let inFunctionBody = false;

	return input
		.split('\n')
		.map((line) => {
			if (inFunctionBody) {
				if (line === '$$;') inFunctionBody = false;
				return line;
			}

			if (line === '$$') {
				inFunctionBody = true;
				return line;
			}

			return line.startsWith('CREATE FUNCTION')
				? `CREATE OR REPLACE FUNCTION${line.slice('CREATE FUNCTION'.length)}`
				: line;
		})
		.join('\n');
}

/**
 * Rewrite a plain-format pg_dump so its `CREATE SCHEMA` statements become
 * `CREATE SCHEMA IF NOT EXISTS`. A plain dump always emits `CREATE SCHEMA`
 * for every dumped schema — including `public`, which exists in every
 * database — so replaying the dump onto a live database fails before the
 * first table is created.
 *
 * Lines starting with `CREATE SCHEMA ` that do not already carry
 * `IF NOT EXISTS` are rewritten; every other line is returned untouched.
 * Lines inside a dollar-quoted function body (`$$` ... `$$;`) are never
 * touched, so function bodies that happen to contain such a line are
 * preserved verbatim.
 *
 * @param input - Raw dump content.
 * @returns The dump content with idempotent schema definitions.
 *
 * @example
 * const safe = rewriteSchemasIfNotExist(rawDump)
 */
export function rewriteSchemasIfNotExist(input: string): string {
	let inFunctionBody = false;

	return input
		.split('\n')
		.map((line) => {
			if (inFunctionBody) {
				if (line === '$$;') inFunctionBody = false;
				return line;
			}

			if (line === '$$') {
				inFunctionBody = true;
				return line;
			}

			if (!line.startsWith('CREATE SCHEMA ') || line.includes('IF NOT EXISTS')) {
				return line;
			}

			return `CREATE SCHEMA IF NOT EXISTS ${line.slice('CREATE SCHEMA '.length)}`;
		})
		.join('\n');
}

/**
 * Reads a dump file, applies {@link sanitizeDumpForApostrophes},
 * {@link rewriteFunctionsOrReplace} and {@link rewriteSchemasIfNotExist}
 * and writes it back in place.
 *
 * @param path - Path of the dump file to sanitize.
 * @throws {Error} When the file cannot be read or written.
 */
async function sanitizeDumpFile(path: string): Promise<void> {
	const contents = await readFile(path, 'utf8');
	await writeFile(
		path,
		rewriteSchemasIfNotExist(rewriteFunctionsOrReplace(sanitizeDumpForApostrophes(contents))),
		'utf8',
	);
}

/**
 * Execute a pg_dump process for the given options.
 *
 * The dump is a pure `CREATE` + data script (no `DROP` statements): the
 * restore owns the reset and drops the objects the dump re-creates before
 * replaying it (see `restoreDatabaseWithPsql`), which keeps the dump
 * portable to any fresh database as well as replayable onto a live one.
 *
 * Without a `schemas` filter, pg_dump captures every schema of the database.
 * On platform-hosted databases (e.g. Supabase, which owns the `auth`,
 * `storage` and `realtime` schemas) this both leaks platform state into the
 * backup and breaks restores — the `CREATE SCHEMA` statements collide with
 * the schemas that already exist on the target. Pass `schemas` to restrict
 * the dump to the application schemas.
 *
 * Once pg_dump exits successfully, the dump file is sanitized in place (see
 * {@link sanitizeDumpForApostrophes}) unless `options.sanitizeApostrophes` is
 * false.
 *
 * **Dependency injection for testability**
 *
 * The `_spawn` and `_sanitize` parameters are prefixed with `_` to signal they
 * are internal overrides. In production, callers omit them and the real
 * `node:child_process.spawn` and file-based sanitization are used. In tests,
 * pass sinon stubs to avoid spawning actual processes or touching the disk.
 *
 * @param options - pg_dump connection and output configuration.
 * @param _spawn - Optional spawn function for testability (defaults to node:child_process.spawn).
 * @param _sanitize - Optional sanitization function applied to the dump file on success (defaults to file-based sanitization).
 * @throws {Error} When pg_dump fails to start, exits with a non-zero code, or sanitization fails.
 */
export function createDatabaseDump(
	options: DumpOptions,
	_spawn: typeof defaultSpawn = defaultSpawn,
	_sanitize: (path: string) => Promise<void> = sanitizeDumpFile,
): Promise<void> {
	const tables = options.tables ?? [];
	const schemas = options.schemas ?? [];

	return new Promise((resolve, reject) => {
		const args = [
			'--no-owner',
			'--no-privileges',
			'-h',
			options.host,
			'-p',
			String(options.port),
			'-U',
			options.user,
			'-d',
			options.database,
			'-F',
			'p',
			'-f',
			options.outputPath,
		];

		for (const schema of schemas) {
			args.push('--schema', schema);
		}

		for (const table of tables) {
			args.push('-t', table);
		}

		const pgDump: ChildProcess = _spawn('pg_dump', args, {
			env: { ...process.env, PGPASSWORD: options.password },
		});

		let errorOutput = '';
		pgDump.stderr!.on('data', (data) => {
			errorOutput += data.toString();
		});

		pgDump.on('close', async (code) => {
			if (code !== 0) {
				reject(new Error(`pg_dump failed with code ${code}: ${errorOutput}`));
				return;
			}

			if (options.sanitizeApostrophes === false) {
				resolve();
				return;
			}

			try {
				await _sanitize(options.outputPath);
				resolve();
			} catch (error) {
				reject(new Error(`Failed to sanitize dump: ${(error as Error).message}`));
			}
		});

		pgDump.on('error', (error) => {
			reject(new Error(`Failed to start pg_dump: ${error.message}`));
		});
	});
}
