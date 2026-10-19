import { readFile, writeFile } from 'node:fs/promises';
import process from 'node:process';

const command = process.argv[2];
const packagePaths = [
	'package.json',
	'packages/gradient-engine/package.json',
	'packages/nuxt/package.json',
	'packages/figma-plugin/package.json'
];
const versionedPackageCount = 3;

if (command !== 'sync' && command !== 'check') {
	throw new Error('Expected "sync" or "check" command');
}

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const packages = await Promise.all(packagePaths.map(readJson));
const [core, gradientEngine, nuxt, figmaPlugin] = packages;
const expectedVersion = core.version;

const syncPackage = (json, syncVersion) => {
	if (syncVersion) json.version = expectedVersion;
	if (json.dependencies?.['@gradient-ui/gradient-engine']) {
		json.dependencies['@gradient-ui/gradient-engine'] =
			`^${expectedVersion}`;
	}
	if (json.peerDependencies?.['@gradient-ui/core']) {
		json.peerDependencies['@gradient-ui/core'] = `^${expectedVersion}`;
	}
};

const lockPath = 'package-lock.json';
const lock = await readJson(lockPath);

if (command === 'sync') {
	for (const [index, json] of packages.entries()) {
		syncPackage(json, index < versionedPackageCount);
		await writeFile(
			packagePaths[index],
			`${JSON.stringify(json, null, '\t')}\n`
		);
	}

	for (const [index, path] of packagePaths.entries()) {
		const key =
			path === 'package.json'
				? ''
				: path.replace(/\\/g, '/').replace('/package.json', '');
		const snapshot = lock.packages?.[key];
		if (snapshot) syncPackage(snapshot, index < versionedPackageCount);
	}
	await writeFile(lockPath, `${JSON.stringify(lock, null, '\t')}\n`);
}

const expectedRanges = [
	[
		'@gradient-ui/core dependency @gradient-ui/gradient-engine',
		core.dependencies?.['@gradient-ui/gradient-engine']
	],
	[
		'@gradient-ui/nuxt peer dependency @gradient-ui/core',
		nuxt.peerDependencies?.['@gradient-ui/core']
	],
	[
		'@gradient-ui/figma-plugin dependency @gradient-ui/gradient-engine',
		figmaPlugin.dependencies?.['@gradient-ui/gradient-engine']
	]
];

for (const pkg of [core, gradientEngine, nuxt]) {
	if (pkg.version !== expectedVersion) {
		throw new Error(
			`${pkg.name} is ${pkg.version}; expected ${expectedVersion}`
		);
	}
}

for (const [label, range] of expectedRanges) {
	if (range !== `^${expectedVersion}`) {
		throw new Error(`${label} is ${range}; expected ^${expectedVersion}`);
	}
}

const lockPaths = ['', 'packages/gradient-engine', 'packages/nuxt'];
for (const path of lockPaths) {
	const version = lock.packages?.[path]?.version;
	if (version !== expectedVersion) {
		throw new Error(
			`package-lock workspace ${path || core.name} is ${version}; expected ${expectedVersion}`
		);
	}
}

const lockRanges = [
	[
		'package-lock core dependency @gradient-ui/gradient-engine',
		lock.packages?.['']?.dependencies?.['@gradient-ui/gradient-engine']
	],
	[
		'package-lock Nuxt peer dependency @gradient-ui/core',
		lock.packages?.['packages/nuxt']?.peerDependencies?.[
			'@gradient-ui/core'
		]
	],
	[
		'package-lock Figma dependency @gradient-ui/gradient-engine',
		lock.packages?.['packages/figma-plugin']?.dependencies?.[
			'@gradient-ui/gradient-engine'
		]
	]
];

for (const [label, range] of lockRanges) {
	if (range !== `^${expectedVersion}`) {
		throw new Error(`${label} is ${range}; expected ^${expectedVersion}`);
	}
}

console.log(
	`${command === 'sync' ? 'Synced' : 'Verified'} workspace versions at ${expectedVersion}`
);
