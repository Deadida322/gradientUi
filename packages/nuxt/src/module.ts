import {
	addPlugin,
	addComponent,
	addImports,
	addTemplate,
	createResolver,
	hasNuxtModule,
	defineNuxtModule
} from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import type { GradientUIOptions } from '@gradient-ui/core/plugin';
import { componentNames } from '@gradient-ui/core/component-names';

export interface ModuleOptions extends GradientUIOptions {
	/** Auto-register all Gradient UI components in Nuxt. */
	components?: boolean;
	/** SSR viewport values used by responsive Gradient UI components. */
	ssr?: {
		/** Width to use when the request does not send a viewport-width header. */
		initialWidth?: number;
		/** Optional initial viewport height. */
		initialHeight?: number;
		/** Request header containing the viewport width. */
		viewportWidthHeader?: string;
	};
	/** Integrate an installed @nuxtjs/color-mode module. */
	colorMode?: boolean;
	/** Add the Gradient UI stylesheet to Nuxt's global CSS bundle. */
	css?: boolean;
	/** Path to a module exporting GradientUIOptions. Supports functions and icons. */
	configFile?: string;
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: '@gradient-ui/nuxt',
		configKey: 'gradientUI',
		compatibility: {
			nuxt: '>=3.15.0'
		}
	},
	defaults: {
		css: true
	},
	setup(options: ModuleOptions, nuxt: Nuxt) {
		const resolver = createResolver(import.meta.url);
		if (options.colorMode && !hasNuxtModule('@nuxtjs/color-mode', nuxt))
			throw new Error(
				'gradientUI.colorMode requires @nuxtjs/color-mode in nuxt.config modules.'
			);

		if (options.components !== false) {
			for (const name of componentNames) {
				const template = addTemplate({
					filename: `gradient-ui/components/${name}.ts`,
					write: true,
					getContents: () =>
						`import type { Component } from 'vue';\nimport ${name} from '@gradient-ui/core/components/${name}';\nimport { withGradientDefaults } from '@gradient-ui/core/use';\nexport default /* @__PURE__ */ withGradientDefaults('${name}', ${name} as Component) as typeof ${name};`
				});
				addComponent({ name, filePath: template.dst });
			}
		}
		addImports([
			{
				name: 'useGradientUI',
				from: resolver.resolve('./runtime/composables')
			},
			{
				name: 'useTheme',
				as: 'useGradientTheme',
				from: '@gradient-ui/core/theme'
			},
			{ name: 'useSnackbar', from: '@gradient-ui/core/services' },
			{ name: 'useLoading', from: '@gradient-ui/core/services' }
		]);
		const colorModeOptions = (
			nuxt.options as typeof nuxt.options & {
				colorMode?: { classPrefix?: string; classSuffix?: string };
			}
		).colorMode;
		const integration = addTemplate({
			filename: 'gradient-ui-nuxt-options.mjs',
			getContents: () =>
				`export default ${JSON.stringify({
					colorMode: options.colorMode ?? false,
					classPrefix: colorModeOptions?.classPrefix ?? '',
					classSuffix: colorModeOptions?.classSuffix ?? '',
					ssr: {
						initialWidth: options.ssr?.initialWidth,
						initialHeight: options.ssr?.initialHeight,
						viewportWidthHeader:
							options.ssr?.viewportWidthHeader ??
							'sec-ch-viewport-width'
					}
				})}`
		});
		nuxt.options.alias['#gradient-ui-nuxt-options'] = integration.dst;

		if (
			options.css !== false &&
			!nuxt.options.css.includes('@gradient-ui/core/style.css')
		) {
			nuxt.options.css.push('@gradient-ui/core/style.css');
		}

		if (options.configFile) {
			const rootResolver = createResolver(nuxt.options.rootDir);
			nuxt.options.alias['#gradient-ui-options'] = rootResolver.resolve(
				options.configFile
			);
		} else {
			const {
				configFile: _configFile,
				css: _css,
				colorMode: _colorMode,
				ssr: _ssr,
				...coreOptions
			} = options;
			const optionsTemplate = addTemplate({
				filename: 'gradient-ui-options.mjs',
				getContents: () =>
					`export default ${JSON.stringify(coreOptions)}`,
				write: true
			});

			nuxt.options.alias['#gradient-ui-options'] = optionsTemplate.dst;
		}

		addPlugin({ src: resolver.resolve('./runtime/plugin'), order: 10 });
		addPlugin({
			src: resolver.resolve('./runtime/plugin.client'),
			order: 20
		});
	}
});
