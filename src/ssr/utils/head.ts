import { createTokensCSS } from '@/theme/cssTokens';
import {
	DEFAULT_SEED,
	createDefaultTheme,
	type GradientUIThemeOptions,
	type ThemeMode
} from '@/theme/default';

export type GradientUIHeadStyleId =
	| 'g-theme-style'
	| 'g-color-style'
	| 'g-gradient-style';

export interface GradientUIHeadStyle {
	id: GradientUIHeadStyleId;
	nonce?: string;
	textContent: string;
}

export interface GradientUIHead {
	htmlAttrs: {
		class: string[];
	};
	style: GradientUIHeadStyle[];
}

export interface GradientUIHeadOptions {
	/** Theme inputs used to generate request-local token CSS. */
	theme?: GradientUIThemeOptions;
	/** Classes used to qualify light and dark token rules. */
	modeClasses?: Record<ThemeMode, string>;
	/** Include the active mode class on the html element. */
	includeModeClass?: boolean;
	/** CSP nonce applied to every generated style descriptor. */
	nonce?: string;
}

const materialClass = 'g-theme--material';

const defaultModeClasses: Record<ThemeMode, string> = {
	light: 'g-theme--light',
	dark: 'g-theme--dark'
};

/**
 * Creates framework-neutral SSR head descriptors without touching the DOM.
 * The result is request-local and can be passed to any head manager.
 */
export const createGradientUIHead = (
	options: GradientUIHeadOptions = {}
): GradientUIHead => {
	const themeOptions = options.theme ?? {};
	const mode = themeOptions.mode ?? 'light';
	const modeClasses = { ...defaultModeClasses, ...options.modeClasses };
	const createPalette = (paletteMode: ThemeMode) =>
		createDefaultTheme(themeOptions.seed ?? DEFAULT_SEED, paletteMode, {
			applyToDom: false,
			colors: themeOptions.colors
		});
	const palettes = {
		light: createPalette('light'),
		dark: createPalette('dark')
	};
	const createStyle = (
		id: GradientUIHeadStyleId,
		prefix: 'theme' | 'color' | 'gradient',
		key: 'theme' | 'colors' | 'gradients'
	): GradientUIHeadStyle => {
		const css = (paletteMode: ThemeMode, className: string): string =>
			createTokensCSS(palettes[paletteMode].tokens[key], {
				className,
				prefix
			});

		return {
			id,
			...(options.nonce ? { nonce: options.nonce } : {}),
			textContent: [
				css(mode, materialClass),
				css('light', `${materialClass}.${modeClasses.light}`),
				css('dark', `${materialClass}.${modeClasses.dark}`)
			].join('\n')
		};
	};

	return {
		htmlAttrs: {
			class: [
				materialClass,
				...(options.includeModeClass === false
					? []
					: [modeClasses[mode]])
			]
		},
		style: [
			createStyle('g-theme-style', 'theme', 'theme'),
			createStyle('g-color-style', 'color', 'colors'),
			createStyle('g-gradient-style', 'gradient', 'gradients')
		]
	};
};
