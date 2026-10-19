import {
	access,
	cp,
	mkdir,
	readdir,
	readFile,
	rename,
	writeFile
} from 'node:fs/promises';
import { dirname, join } from 'node:path';

/* global process:readonly */

const dist = process.argv[2] ?? 'dist';
const useNodeExtensions = process.argv.includes('--node-extensions');
const source = join(dist, 'types');
const target = join(dist, 'types-cjs');

const renameDeclarations = async (directory) => {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) await renameDeclarations(path);
		else if (entry.name.endsWith('.d.ts'))
			await rename(path, path.replace(/\.d\.ts$/, '.d.cts'));
	}
};

const rewriteRelativeSpecifiers = async (directory, extension) => {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) {
			await rewriteRelativeSpecifiers(path, extension);
			continue;
		}
		if (!entry.name.endsWith('.d.ts') && !entry.name.endsWith('.d.cts'))
			continue;

		const declarationExtension = entry.name.endsWith('.d.cts')
			? '.d.cts'
			: '.d.ts';
		const content = (await readFile(path, 'utf8')).replace(
			/^import\s+['"][^'"]+\.(?:css|scss|sass|less)['"];\r?\n/gm,
			''
		);
		const matches = content.matchAll(
			/(\bfrom\s*|\bimport\()(['"])(\.\.?\/[^'"]+)(\2)/g
		);
		let lastIndex = 0;
		let rewritten = '';

		for (const match of matches) {
			const [matched, prefix, quote, specifier] = match;
			const matchIndex = match.index ?? 0;
			const normalized = specifier.replace(
				/\.(?:d\.[cm]?ts|[cm]?js)$/,
				''
			);
			let resolvedSpecifier = normalized;
			try {
				await access(
					join(dirname(path), `${normalized}${declarationExtension}`)
				);
			} catch {
				await access(
					join(
						dirname(path),
						normalized,
						`index${declarationExtension}`
					)
				);
				resolvedSpecifier = `${normalized}/index`;
			}
			rewritten += `${content.slice(lastIndex, matchIndex)}${prefix}${quote}${resolvedSpecifier}${extension}${quote}`;
			lastIndex = matchIndex + matched.length;
		}
		rewritten += content.slice(lastIndex);
		await writeFile(path, rewritten);
	}
};

if (useNodeExtensions) await rewriteRelativeSpecifiers(source, '.js');
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true, force: true });
await renameDeclarations(target);
if (useNodeExtensions) await rewriteRelativeSpecifiers(target, '.cjs');
await writeFile(join(target, 'package.json'), '{\n\t"type": "commonjs"\n}\n');
