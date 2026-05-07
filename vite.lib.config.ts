import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { peerDependencies, dependencies } from './package.json';

const external = [
	...Object.keys(peerDependencies ?? {}),
	...Object.keys(dependencies ?? {})
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
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'GradientUI',
			formats: ['es', 'cjs'],
			fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs')
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
