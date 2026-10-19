import type { App } from 'vue';
import { installIcons, type IconsOptions } from '@/use/icon';
import {
	createTheme,
	installTheme,
	type GradientUIThemeOptions
} from '@/theme';
import type { ColorInput } from '@/types/Colors';
import { installDefaults, type GradientUIDefaults } from '@/use/defaults';
import {
	vGradientIcon,
	vGradientText,
	vLoading,
	vMask,
	vRipple,
	vSpecular,
	vTooltip
} from '@/directives';
import { installGradientUIServices } from '@/services';

export interface GradientUIOptions {
	/** Register every component globally. Disable when using explicit imports. */
	components?: boolean;
	icons?: boolean | Partial<IconsOptions>;
	theme?: false | ColorInput | GradientUIThemeOptions;
	defaults?: GradientUIDefaults;
}

export const resolveThemeOptions = (
	theme: GradientUIOptions['theme']
): GradientUIThemeOptions => {
	if (theme == null || theme === false) return {};
	return typeof theme === 'string' || typeof theme === 'number'
		? { seed: theme }
		: theme;
};

/** Install application context without importing the component catalogue. */
export const installGradientUIRuntime = (
	app: App,
	options: GradientUIOptions = {},
	inlineOptions: GradientUIOptions = {}
): GradientUIOptions => {
	const resolvedOptions = {
		...options,
		...inlineOptions,
		defaults: { ...options.defaults, ...inlineOptions.defaults }
	};
	installDefaults(app, resolvedOptions.defaults);
	installGradientUIServices(app);
	app.directive('gradient-icon', vGradientIcon);
	app.directive('gradient-text', vGradientText);
	app.directive('loading', vLoading);
	app.directive('mask', vMask);
	app.directive('ripple', vRipple);
	app.directive('specular', vSpecular);
	app.directive('tooltip', vTooltip);
	if (resolvedOptions.icons !== false) {
		installIcons(
			app,
			typeof resolvedOptions.icons === 'object'
				? resolvedOptions.icons
				: undefined
		);
	}
	if (resolvedOptions.theme !== false) {
		installTheme(
			app,
			createTheme(resolveThemeOptions(resolvedOptions.theme))
		);
	}
	return resolvedOptions;
};
