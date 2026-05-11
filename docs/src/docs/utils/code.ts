const scriptSetupPattern =
	/<script setup lang="ts">\n([\s\S]*?)<\/script>\n\n?/;
const defineOptionsPattern = /^\s*defineOptions\(\{ name: '[^']+' \}\);\n?/gm;
const internalComponentImportPattern =
	/import \{ ([^}]+) \} from '@\/components';\n/g;
const internalServiceImportPattern =
	/import \{ ([^}]+) \} from '@\/services\/[^']+';\n/g;
const internalTypeImportPattern =
	/import type \{ ([^}]+) \} from '@\/[^']+';\n/g;

const hasRuntimeScript = (script: string) =>
	script
		.replace(defineOptionsPattern, '')
		.replace(internalComponentImportPattern, '')
		.replace(internalServiceImportPattern, '')
		.replace(internalTypeImportPattern, '')
		.trim().length > 0;

const toPublicScript = (script: string) =>
	script
		.replace(defineOptionsPattern, '')
		.replace(
			internalComponentImportPattern,
			(_match, imports: string) =>
				`import { ${imports.trim()} } from '@gradient-ui/core';\n`
		)
		.replace(
			internalServiceImportPattern,
			(_match, imports: string) =>
				`import { ${imports.trim()} } from '@gradient-ui/core';\n`
		)
		.replace(internalTypeImportPattern, '')
		.replace(/GChipVariants/g, 'string')
		.replace(/GDrawerPlacement/g, 'string')
		.replace(/MdiIcon/g, 'string')
		.trim();

export const toPublicExampleCode = (code: string) =>
	code.replace(scriptSetupPattern, (_match, script: string) => {
		const publicScript = toPublicScript(script);

		if (!hasRuntimeScript(script)) {
			return '';
		}

		return `<script setup lang="ts">\n${publicScript}\n</script>\n\n`;
	});
