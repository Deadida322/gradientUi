import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	resolve: {
		alias: [
			{
				find: '@gradient-ui/gradient-engine/core',
				replacement: resolve(
					__dirname,
					'../gradient-engine/src/core.ts'
				)
			},
			{
				find: '@gradient-ui/gradient-engine/design-tokens',
				replacement: resolve(
					__dirname,
					'../gradient-engine/src/designTokens.ts'
				)
			},
			{
				find: '@gradient-ui/gradient-engine/effects',
				replacement: resolve(
					__dirname,
					'../gradient-engine/src/effects/index.ts'
				)
			},
			{
				find: '@gradient-ui/gradient-engine/formatters',
				replacement: resolve(
					__dirname,
					'../gradient-engine/src/formatters/index.ts'
				)
			},
			{
				find: '@gradient-ui/gradient-engine',
				replacement: resolve(
					__dirname,
					'../gradient-engine/src/index.ts'
				)
			}
		]
	},
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
