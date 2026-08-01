import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	build: {
		emptyOutDir: true,
		lib: {
			entry: {
				index: resolve(__dirname, 'src/index.ts'),
				core: resolve(__dirname, 'src/core.ts'),
				formatters: resolve(__dirname, 'src/formatters/index.ts'),
				effects: resolve(__dirname, 'src/effects/index.ts'),
				animation: resolve(__dirname, 'src/animation/index.ts'),
				material: resolve(__dirname, 'src/material.ts')
			},
			name: 'GradientEngine',
			formats: ['es', 'cjs'],
			fileName: (format, entryName) =>
				`${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`
		},
		rollupOptions: {
			external: ['@material/material-color-utilities'],
			output: {
				exports: 'named'
			}
		}
	}
});
