import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { readFileSync } from 'node:fs';
import { peerDependencies, dependencies } from './package.json';
import {
	componentEntryDirectories,
	componentNames
} from './src/componentNames';

const componentEntries = Object.fromEntries(
	componentNames.map((name) => {
		const directory = componentEntryDirectories[name] ?? name;
		const root =
			name.startsWith('GTransition') || name === 'GExpandTransition'
				? 'src/components/transitions'
				: `src/components/ui/${directory}`;
		return [`components/${name}`, resolve(__dirname, root, `${name}.vue`)];
	})
);

const bundledDependencies = new Set([
	'@material/material-color-utilities',
	'gib-validate'
]);
const external = [
	...Object.keys(peerDependencies ?? {}),
	...Object.keys(dependencies ?? {}).filter(
		(dependency) => !bundledDependencies.has(dependency)
	)
];

export default defineConfig({
	plugins: [
		vue(),
		{
			name: 'gradient-ui-scss-media',
			generateBundle() {
				this.emitFile({
					type: 'asset',
					fileName: 'styles/media.scss',
					source: readFileSync(
						resolve(__dirname, 'src/styles/mixins/media.scss'),
						'utf8'
					)
				});
			}
		}
	],
	esbuild: {
		// Published ESM is parsed and bundled again by consumers such as Nuxt.
		minifyIdentifiers: false
	},
	resolve: {
		alias: {
			'@gradient-ui/gradient-engine': resolve(
				__dirname,
				'packages/gradient-engine/src'
			),
			'@': resolve(__dirname, 'src')
		},
		extensions: ['.ts', '.js', '.json']
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler'
			}
		}
	},
	build: {
		emptyOutDir: true,
		copyPublicDir: false,
		minify: 'esbuild',
		lib: {
			entry: {
				...componentEntries,
				'component-names': resolve(__dirname, 'src/componentNames.ts'),
				index: resolve(__dirname, 'src/index.ts'),
				plugin: resolve(__dirname, 'src/plugin.ts'),
				components: resolve(__dirname, 'src/components/index.ts'),
				directives: resolve(__dirname, 'src/directives/index.ts'),
				services: resolve(__dirname, 'src/services/index.ts'),
				ssr: resolve(__dirname, 'src/ssr/index.ts'),
				theme: resolve(__dirname, 'src/theme/index.ts'),
				use: resolve(__dirname, 'src/use/index.ts')
			},
			name: 'GradientUI',
			formats: ['es', 'cjs'],
			fileName: (format, entryName) =>
				`${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`
		},
		rollupOptions: {
			external,
			output: {
				exports: 'named',
				globals: {
					vue: 'Vue'
				}
			}
		}
	}
});
