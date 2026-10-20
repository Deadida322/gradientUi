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
const tag = arguments_.find((argument) => !argument.startsWith('--')) ?? 'latest';
const preflightOnly = arguments_.includes('--dry-run');
const rootPackage = JSON.parse(await readFile('package.json', 'utf8'));
const version = rootPackage.version;
const packages = [
	{
		name: '@gradient-ui/gradient-engine',
		workspace: '@gradient-ui/gradient-engine'
	},
	{ name: '@gradient-ui/core' },
	{ name: '@gradient-ui/nuxt', workspace: '@gradient-ui/nuxt' }
];

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

for (const packageToPublish of packages) {
	console.log(`Preflighting ${packageToPublish.name}@${version}...`);
	const result = run(publishArgs(packageToPublish, true));
	if (result.error) throw result.error;
	if (result.status !== 0) process.exit(result.status ?? 1);
}

if (preflightOnly) {
	console.log(`All ${packages.length} packages passed npm publish --dry-run.`);
	process.exit(0);
}

for (const packageToPublish of packages) {
	const specifier = `${packageToPublish.name}@${version}`;
	if (run(['view', specifier, 'version'], 'ignore').status === 0) {
		console.log(`${specifier} is already published.`);
		continue;
	}

	const result = run(publishArgs(packageToPublish));
	if (result.error) throw result.error;
	if (result.status !== 0) process.exit(result.status ?? 1);
}
