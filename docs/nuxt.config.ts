import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';
import nuxtFonts from '@nuxt/fonts';
import { defineNuxtConfig } from 'nuxt/config';

const root = resolve(import.meta.dirname, '..');
const require = createRequire(import.meta.url);

export default defineNuxtConfig({
	ssr: true,
	srcDir: 'src',
	typescript: {
		tsConfig: {
			compilerOptions: {
				paths: {
					// Match this app's Nuxt version, not the module builder's schema.
					'@nuxt/schema': [
						dirname(
							require.resolve('@nuxt/schema/package.json', {
								paths: [
									dirname(
										require.resolve('nuxt/package.json')
									)
								]
							})
						)
					]
				}
			}
		}
	},

	devServer: {
		host: '127.0.0.1',
		port: 8000
	},

	dir: {
		public: resolve(root, 'public')
	},

	modules: [
		'@nuxtjs/color-mode',
		nuxtFonts,
		resolve(root, 'packages/nuxt/src/module.ts')
	],

	colorMode: {
		preference: 'system',
		fallback: 'light',
		classPrefix: 'g-theme--',
		classSuffix: '',
		storage: 'cookie',
		storageKey: 'gradient-ui-docs-theme'
	},
	fonts: {
		provider: 'local',
		families: [
			{
				name: 'Manrope',
				provider: 'local',
				weights: [400, 700, 500, 300, 200, 800],
				styles: ['normal'],
				subsets: ['latin'],
				preload: true
			}
		],
		processCSSVariables: true
	},
	nitro: {
		prerender: {
			crawlLinks: true,
			routes: ['/docs/ssr-nuxt', '/docs/figma-plugin']
		},
		publicAssets: [
			{
				dir: resolve(
					dirname(
						require.resolve('@fontsource/manrope/package.json')
					),
					'files'
				),
				baseURL: '/fonts/manrope'
			}
		]
	},

	gradientUI: {
		css: false,
		components: false,
		colorMode: true,
		theme: {
			seed: '#704aff',
			mode: 'light'
		}
	},

	css: [
		resolve(root, 'docs/src/assets/docs-critical.scss'),
		'@mdi/font/css/materialdesignicons.css',
		resolve(root, 'src/style.scss')
	],

	alias: {
		'@gradient-ui/core/component-names': resolve(
			root,
			'src/componentNames.ts'
		),
		'@gradient-ui/core/plugin': resolve(root, 'src/plugin.ts'),
		'@gradient-ui/core/ssr': resolve(root, 'src/ssr/index.ts'),
		'@gradient-ui/core/theme': resolve(root, 'src/theme/index.ts'),
		'@gradient-ui/core/use': resolve(root, 'src/use/index.ts'),
		'@gradient-ui/core/components': resolve(
			root,
			'src/components/index.ts'
		),
		'@gradient-ui/core/services': resolve(root, 'src/services/index.ts'),
		'@gradient-ui/core': resolve(root, 'src/index.ts'),
		'@gradient-ui/gradient-engine': resolve(
			root,
			'packages/gradient-engine/src'
		),
		'@': resolve(root, 'src'),
		'@docs': resolve(import.meta.dirname, 'src/docs'),
		'@playground': resolve(import.meta.dirname, 'src/playground')
	},

	build: {
		transpile: ['@material/material-color-utilities', 'gib-validate']
	},

	vite: {
		ssr: {
			noExternal: ['@material/material-color-utilities', 'gib-validate']
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler'
				}
			}
		}
	},

	compatibilityDate: '2026-09-12'
});
