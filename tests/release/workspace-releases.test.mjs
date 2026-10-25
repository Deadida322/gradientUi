import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const versionsScript = fileURLToPath(
	new URL('../../scripts/workspace-versions.mjs', import.meta.url)
);
const publishScript = fileURLToPath(
	new URL('../../scripts/publish-workspaces.mjs', import.meta.url)
);
const fixture = async (run) => {
	const cwd = await mkdtemp(join(tmpdir(), 'gradient-release-'));
	const manifests = {
		'': {
			name: '@gradient-ui/core',
			version: '1.2.0',
			dependencies: { '@gradient-ui/gradient-engine': '^1.0.1' }
		},
		'packages/gradient-engine': {
			name: '@gradient-ui/gradient-engine',
			version: '1.0.1'
		},
		'packages/nuxt': {
			name: '@gradient-ui/nuxt',
			version: '1.0.2',
			peerDependencies: { '@gradient-ui/core': '^1.0.1' }
		},
		'packages/figma-plugin': {
			name: '@gradient-ui/figma-plugin',
			version: '0.4.0',
			dependencies: { '@gradient-ui/gradient-engine': '^1.0.1' }
		}
	};
	const json = async (path, value) =>
		writeFile(join(cwd, path), JSON.stringify(value));
	for (const [path, manifest] of Object.entries(manifests)) {
		await mkdir(join(cwd, path), { recursive: true });
		await json(`${path ? `${path}/` : ''}package.json`, manifest);
	}
	const lock = { version: '1.2.0', packages: structuredClone(manifests) };
	await json('package-lock.json', lock);
	const execute = (script, args, env = {}) =>
		spawnSync(process.execPath, [script, ...args], {
			cwd,
			env: { ...process.env, ...env },
			encoding: 'utf8'
		});
	try {
		await run({ cwd, manifests, lock, json, execute });
	} finally {
		await rm(cwd, { recursive: true, force: true });
	}
};

test('accepts different compatible versions', () =>
	fixture(async ({ execute }) => {
		const result = execute(versionsScript, ['check']);
		assert.equal(result.status, 0, result.stderr);
	}));

test('rejects incompatible dependency and peer ranges', () =>
	fixture(async ({ manifests, json, execute }) => {
		manifests[''].version = '2.0.0';
		await json('package.json', manifests['']);
		const result = execute(versionsScript, ['check']);
		assert.notEqual(result.status, 0);
		assert.match(
			result.stderr,
			/peerDependencies.*does not accept workspace version 2.0.0/
		);
	}));

test('sync updates only lock metadata and preserves manifest ranges', () =>
	fixture(async ({ cwd, lock, json, execute, manifests }) => {
		lock.version = '1.0.1';
		lock.packages[''].version = '1.0.1';
		await json('package-lock.json', lock);
		assert.notEqual(execute(versionsScript, ['check']).status, 0);
		const result = execute(versionsScript, ['sync']);
		assert.equal(result.status, 0, result.stderr);
		assert.equal(execute(versionsScript, ['check']).status, 0);
		for (const [path, manifest] of Object.entries(manifests)) {
			assert.deepEqual(
				JSON.parse(
					await readFile(join(cwd, path, 'package.json'), 'utf8')
				),
				manifest
			);
		}
	}));

for (const [id, version, workspace] of [
	['core', '1.2.0', undefined],
	['gradient-engine', '1.0.1', '@gradient-ui/gradient-engine'],
	['nuxt', '1.0.2', '@gradient-ui/nuxt']
]) {
	test(`publisher preflights only ${id} using its own version`, () =>
		fixture(async ({ cwd, execute }) => {
			const stub = join(cwd, 'npm-stub.cjs');
			const log = join(cwd, 'calls.jsonl');
			await writeFile(
				stub,
				`const fs = require('node:fs'); const args = process.argv.slice(2); fs.appendFileSync(process.env.CALL_LOG, JSON.stringify(args) + '\\n'); if (args[0] === 'view') { console.error('E404'); process.exit(1); }`
			);
			const result = execute(
				publishScript,
				['latest', '--package', id, '--dry-run'],
				{ npm_execpath: stub, CALL_LOG: log }
			);
			assert.equal(result.status, 0, result.stderr);
			const calls = (await readFile(log, 'utf8'))
				.trim()
				.split('\n')
				.map((line) => JSON.parse(line));
			assert.deepEqual(calls[0], [
				'view',
				`@gradient-ui/${id}@${version}`,
				'version',
				'--json'
			]);
			assert.deepEqual(calls[1], [
				'publish',
				...(workspace ? ['--workspace', workspace] : []),
				'--access',
				'public',
				'--tag',
				'latest',
				'--dry-run'
			]);
			assert.equal(calls.length, 2);
		}));
}
