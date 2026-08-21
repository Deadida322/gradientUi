import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const packageRoot = resolve(import.meta.dirname, '..');
const templatePath = resolve(packageRoot, 'src/ui.html');
const scriptPath = resolve(packageRoot, 'dist/ui.js');
const outputPath = resolve(packageRoot, 'dist/ui.html');
const distPath = resolve(packageRoot, 'dist');

const [template, script] = await Promise.all([
	readFile(templatePath, 'utf8'),
	readFile(scriptPath, 'utf8')
]);
const distFiles = await readdir(distPath);
const cssFiles = distFiles.filter((file) => file.endsWith('.css'));
const css = (
	await Promise.all(
		cssFiles.map((file) => readFile(resolve(distPath, file), 'utf8'))
	)
).join('\n');
const encodedScript = Buffer.from(script, 'utf8').toString('base64');
const style = css ? `<style>\n${css}\n</style>` : '';
const loader = `<script>
(() => {
	const script = document.createElement('script');
	script.textContent = atob('${encodedScript}');
	document.body.appendChild(script);
})();
</script>`;

await writeFile(
	outputPath,
	template.replace(
		'<!-- GRADIENT_UI_PLUGIN_SCRIPT -->',
		`${style}\n${loader}`
	)
);
await Promise.all([
	rm(scriptPath, { force: true }),
	...cssFiles.map((file) => rm(resolve(distPath, file), { force: true }))
]);
