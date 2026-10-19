import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import process from 'node:process';

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const tag = process.argv[2] ?? 'latest';
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
	spawnSync(npm, args, { stdio, shell: false });

for (const packageToPublish of packages) {
	const specifier = `${packageToPublish.name}@${version}`;
	if (run(['view', specifier, 'version'], 'ignore').status === 0) {
		console.log(`${specifier} is already published.`);
		continue;
	}

	const workspaceArgs = packageToPublish.workspace
		? ['--workspace', packageToPublish.workspace]
		: [];
	const result = run([
		'publish',
		...workspaceArgs,
		'--access',
		'public',
		'--tag',
		tag
	]);
	if (result.error) throw result.error;
	if (result.status !== 0) process.exit(result.status ?? 1);
}
