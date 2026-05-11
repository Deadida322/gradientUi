import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@gib/gradient-ui': resolve(__dirname, '../src/index.ts'),
			'@': resolve(__dirname, '../src'),
			'@docs': resolve(__dirname, 'src/docs'),
			'@playground': resolve(__dirname, 'src/playground')
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
		outDir: resolve(__dirname, '../dist-docs'),
		emptyOutDir: true
	},
	server: {
		host: '127.0.0.1',
		port: 8000
	}
});
