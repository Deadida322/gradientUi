import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { peerDependencies, dependencies } from './package.json';

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
	plugins: [vue()],
	resolve: {
		alias: {
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
		lib: {
			entry: {
				index: resolve(__dirname, 'src/index.ts'),
				components: resolve(__dirname, 'src/components/index.ts'),
				directives: resolve(__dirname, 'src/directives/index.ts'),
				services: resolve(__dirname, 'src/services/index.ts'),
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
