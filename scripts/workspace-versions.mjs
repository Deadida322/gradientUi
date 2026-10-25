import { readFile, writeFile } from 'node:fs/promises';
import process from 'node:process';
import semver from 'semver';

const command = process.argv[2];
if (!['sync', 'check'].includes(command)) {
	throw new Error('Expected "sync" or "check" command');
}

const packagePaths = [
	'package.json',
	'packages/gradient-engine/package.json',
	'packages/nuxt/package.json',
	'packages/figma-plugin/package.json'
];
const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const packages = await Promise.all(packagePaths.map(readJson));
const byName = new Map(packages.map((pkg) => [pkg.name, pkg]));
const dependencyFields = ['dependencies', 'peerDependencies'];

for (const pkg of packages) {
	if (!semver.valid(pkg.version)) {
		throw new Error(`${pkg.name} has an invalid version: ${pkg.version}`);
	}
	for (const field of dependencyFields) {
		for (const [name, range] of Object.entries(pkg[field] ?? {})) {
			const dependency = byName.get(name);
			if (dependency && !semver.satisfies(dependency.version, range)) {
				throw new Error(
					`${pkg.name} ${field} ${name}@${range} does not accept workspace version ${dependency.version}; update the compatibility range explicitly`
				);
			}
		}
	}
}

const lockPath = 'package-lock.json';
const lock = await readJson(lockPath);
for (const [index, path] of packagePaths.entries()) {
	const key =
		path === 'package.json' ? '' : path.replace('/package.json', '');
	const pkg = packages[index];
	const snapshot = lock.packages?.[key];
	if (!snapshot)
		throw new Error(`Missing package-lock workspace ${key || pkg.name}`);
	if (command === 'sync') {
		snapshot.version = pkg.version;
		for (const field of dependencyFields) {
			if (pkg[field]) snapshot[field] = { ...pkg[field] };
			else delete snapshot[field];
		}
	}
	if (snapshot.version !== pkg.version) {
		throw new Error(
			`package-lock workspace ${pkg.name} must match its manifest version ${pkg.version}`
		);
	}
	for (const field of dependencyFields) {
		for (const name of byName.keys()) {
			if (snapshot[field]?.[name] !== pkg[field]?.[name]) {
				throw new Error(
					`package-lock ${pkg.name} ${field} ${name} does not match its manifest`
				);
			}
		}
	}
}
if (command === 'sync') {
	lock.version = packages[0].version;
	await writeFile(lockPath, `${JSON.stringify(lock, null, '\t')}\n`);
} else if (lock.version !== packages[0].version) {
	throw new Error('package-lock root version does not match core');
}

console.log(
	`${command === 'sync' ? 'Synced lockfile metadata for' : 'Verified'} independently versioned workspaces`
);
