import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	build: {
		emptyOutDir: true,
		lib: {
			entry: resolve(__dirname, 'src/main.ts'),
			formats: ['iife'],
			name: 'GradientUIFigmaPlugin',
			fileName: () => 'code.js'
		},
		rollupOptions: {
			output: {
				inlineDynamicImports: true
			}
		},
		target: 'es2020'
	}
});
