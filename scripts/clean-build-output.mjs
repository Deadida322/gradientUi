import { rm } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const targets = process.argv.slice(2);

if (!targets.length) {
	throw new Error('At least one build output path is required');
}

const removeBuildOutput = async (target) => {
	const outputPath = resolve(target);
	const relativePath = relative(repositoryRoot, outputPath);
	const escapesRepository =
		!relativePath ||
		isAbsolute(relativePath) ||
		relativePath === '..' ||
		relativePath.startsWith(`..${sep}`);

	if (escapesRepository) {
		throw new Error(
			`Refusing to remove unsafe build output: ${outputPath}`
		);
	}

	await rm(outputPath, {
		force: true,
		maxRetries: 8,
		recursive: true,
		retryDelay: 150
	});
};

for (const target of targets) {
	await removeBuildOutput(target);
}
