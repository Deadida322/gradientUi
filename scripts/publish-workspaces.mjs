import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import process from 'node:process';

const npmCli = process.env.npm_execpath;
const npm = npmCli
	? { command: process.execPath, prefix: [npmCli] }
	: {
			command: process.platform === 'win32' ? 'npm.cmd' : 'npm',
			prefix: []
		};
const arguments_ = process.argv.slice(2);
const tag =
	arguments_[0] && !arguments_[0].startsWith('--') ? arguments_[0] : 'latest';
const packageFlag = arguments_.indexOf('--package');
const selectedPackage =
	packageFlag === -1 ? 'core' : arguments_[packageFlag + 1];
const preflightOnly = arguments_.includes('--dry-run');
const packages = [
	{
		id: 'gradient-engine',
		path: 'packages/gradient-engine/package.json',
		name: '@gradient-ui/gradient-engine',
		workspace: '@gradient-ui/gradient-engine'
	},
	{ id: 'core', name: '@gradient-ui/core', path: 'package.json' },
	{
		id: 'nuxt',
		name: '@gradient-ui/nuxt',
		path: 'packages/nuxt/package.json',
		workspace: '@gradient-ui/nuxt'
	}
];
const selected = packages.find(
	(pkg) => pkg.id === selectedPackage || pkg.name === selectedPackage
);
if (!selected) throw new Error(`Unknown release package: ${selectedPackage}`);
const { version } = JSON.parse(await readFile(selected.path, 'utf8'));
if (version.includes('-') && tag === 'latest') {
	throw new Error('Prereleases require a non-latest npm tag');
}

const run = (args, stdio = 'inherit') =>
	spawnSync(npm.command, [...npm.prefix, ...args], {
		stdio,
		shell: false
	});

const workspaceArgs = (packageToPublish) =>
	packageToPublish.workspace
		? ['--workspace', packageToPublish.workspace]
		: [];

const publishArgs = (packageToPublish, dryRun = false) => [
	'publish',
	...workspaceArgs(packageToPublish),
	'--access',
	'public',
	'--tag',
	tag,
	...(dryRun ? ['--dry-run'] : [])
];

const unpublished = [selected].filter((packageToPublish) => {
	const specifier = `${packageToPublish.name}@${version}`;
	const result = run(['view', specifier, 'version', '--json'], 'pipe');
	if (result.error) throw result.error;
	if (result.status === 0) {
		console.log(`${specifier} is already published; skipping.`);
		return false;
	}
	if (!result.stderr?.toString().includes('E404')) {
		process.stderr.write(result.stderr ?? 'npm view failed.');
		process.exit(result.status ?? 1);
	}
	return true;
});

for (const packageToPublish of unpublished) {
	console.log(`Preflighting ${packageToPublish.name}@${version}...`);
	const result = run(publishArgs(packageToPublish, true));
	if (result.error) throw result.error;
	if (result.status !== 0) process.exit(result.status ?? 1);
}

if (preflightOnly) {
	console.log(
		`All ${unpublished.length} unpublished packages passed npm publish --dry-run.`
	);
	process.exit(0);
}

for (const packageToPublish of unpublished) {
	const result = run(publishArgs(packageToPublish));
	if (result.error) throw result.error;
	if (result.status !== 0) process.exit(result.status ?? 1);
}
