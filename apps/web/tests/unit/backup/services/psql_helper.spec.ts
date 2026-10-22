import { test } from '@japa/runner';
import sinon from 'sinon';

/**
 * Unit tests for `restoreDatabaseWithPsql`.
 *
 * Passes a stubbed spawn function via the optional `_spawn` parameter so no
 * actual psql binary is executed. We verify the generated command-line
 * arguments, the pre-drop prelude written next to the dump, and its cleanup.
 */
test.group('PsqlHelper', (group) => {
	group.each.teardown(() => {
		sinon.restore();
	});

	const buildOptions = (overrides: Record<string, any> = {}) => ({
		host: 'localhost',
		port: 5432,
		user: 'postgres',
		database: 'mydb',
		password: 'secret',
		sqlPath: '/tmp/backups/dump.sql',
		...overrides,
	});

	/**
	 * Stub spawn capturing the `close` callbacks without firing them, so the
	 * test can inspect the prelude file before the restore settles.
	 */
	const buildSpawnStub = () => {
		const closeCbs: Array<(code: number) => void> = [];
		const spawnStub = sinon.stub().returns({
			on: sinon.stub().callsFake((event: string, cb: (...args: any[]) => void) => {
				if (event === 'close') closeCbs.push(cb);
			}),
			stderr: { on: sinon.stub() },
		});
		return { spawnStub, closeCbs };
	};

	test('restoreDatabaseWithPsql replays the dump with a single -f when no schemas are given', async ({ assert }) => {
		const { restoreDatabaseWithPsql } = await import('#backup/services/psql_helper');
		const { spawnStub, closeCbs } = buildSpawnStub();

		const promise = restoreDatabaseWithPsql(buildOptions(), spawnStub);
		const [cmd, args] = spawnStub.firstCall.args;

		assert.equal(cmd, 'psql');
		assert.include(args, '-v');
		assert.include(args, 'ON_ERROR_STOP=1');
		assert.include(args, '-1');
		const fIdx = args.indexOf('-f');
		assert.equal(args[fIdx + 1], '/tmp/backups/dump.sql');
		assert.equal(args.filter((a: string) => a === '-f').length, 1);

		closeCbs[0](0);
		await promise;
	});

	test('restoreDatabaseWithPsql writes a full pre-drop prelude and replays it before the dump', async ({ assert }) => {
		const { restoreDatabaseWithPsql } = await import('#backup/services/psql_helper');
		const { mkdtemp, readFile, rm } = await import('node:fs/promises');
		const { tmpdir } = await import('node:os');
		const { join } = await import('node:path');

		const dir = await mkdtemp(join(tmpdir(), 'psql-helper-'));
		const { spawnStub, closeCbs } = buildSpawnStub();

		const promise = restoreDatabaseWithPsql(
			buildOptions({ sqlPath: join(dir, 'dump.sql'), schemas: ['public'] }),
			spawnStub,
		);
		// The prelude is written before the spawn — let the write settle
		await new Promise((resolve) => setTimeout(resolve, 25));
		const [, args] = spawnStub.firstCall.args;

		// Prelude file is replayed before the dump, in the same invocation
		const fIdx = args.indexOf('-f');
		const preludePath = args[fIdx + 1];
		assert.equal(args[args.lastIndexOf('-f') + 1], join(dir, 'dump.sql'));
		assert.notEqual(preludePath, join(dir, 'dump.sql'));

		const prelude = await readFile(preludePath, 'utf8');
		assert.include(prelude, "WHERE n.nspname = 'public'");
		assert.include(prelude, 'DROP TABLE IF EXISTS "public".%I CASCADE');

		closeCbs[0](0);
		await promise;

		// The prelude file is cleaned up after the restore
		const { existsSync } = await import('node:fs');
		assert.isFalse(existsSync(preludePath));
		await rm(dir, { recursive: true, force: true });
	});

	test('restoreDatabaseWithPsql limits the pre-drop to the given tables', async ({ assert }) => {
		const { restoreDatabaseWithPsql } = await import('#backup/services/psql_helper');
		const { mkdtemp, readFile, rm } = await import('node:fs/promises');
		const { tmpdir } = await import('node:os');
		const { join } = await import('node:path');

		const dir = await mkdtemp(join(tmpdir(), 'psql-helper-'));
		const { spawnStub, closeCbs } = buildSpawnStub();

		const promise = restoreDatabaseWithPsql(
			buildOptions({ sqlPath: join(dir, 'dump.sql'), schemas: ['public'], tables: ['users', 'posts'] }),
			spawnStub,
		);
		await new Promise((resolve) => setTimeout(resolve, 25));
		const [, args] = spawnStub.firstCall.args;

		const prelude = await readFile(args[args.indexOf('-f') + 1], 'utf8');
		assert.include(prelude, 'DROP TABLE IF EXISTS "public"."users" CASCADE;');
		assert.include(prelude, 'DROP TABLE IF EXISTS "public"."posts" CASCADE;');
		// No catalog-scan DO block in table-limited preludes
		assert.notInclude(prelude, 'DO $$');

		closeCbs[0](0);
		await promise;
		await rm(dir, { recursive: true, force: true });
	});

	test('restoreDatabaseWithPsql cleans up the prelude when psql fails', async ({ assert }) => {
		const { restoreDatabaseWithPsql } = await import('#backup/services/psql_helper');
		const { mkdtemp, rm } = await import('node:fs/promises');
		const { existsSync } = await import('node:fs');
		const { tmpdir } = await import('node:os');
		const { join } = await import('node:path');

		const dir = await mkdtemp(join(tmpdir(), 'psql-helper-'));
		const { spawnStub, closeCbs } = buildSpawnStub();

		const promise = restoreDatabaseWithPsql(
			buildOptions({ sqlPath: join(dir, 'dump.sql'), schemas: ['public'] }),
			spawnStub,
		);
		await new Promise((resolve) => setTimeout(resolve, 25));
		const args = spawnStub.firstCall.args[1];
		const preludePath = args[args.indexOf('-f') + 1];

		closeCbs[0](3);
		await assert.rejects(async () => promise, /psql failed with code 3/);

		assert.isFalse(existsSync(preludePath));
		await rm(dir, { recursive: true, force: true });
	});
});
