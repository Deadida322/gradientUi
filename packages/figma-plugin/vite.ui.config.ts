import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	build: {
		cssCodeSplit: false,
		emptyOutDir: false,
		lib: {
			entry: resolve(__dirname, 'src/ui.ts'),
			formats: ['iife'],
			name: 'GradientUIFigmaPluginUI',
			fileName: () => 'ui.js'
		},
		rollupOptions: {
			output: {
				inlineDynamicImports: true
			}
		},
		target: 'es2020'
	},
	define: {
		'process.env.NODE_ENV': JSON.stringify('production')
	},
	plugins: [vue()]
});
