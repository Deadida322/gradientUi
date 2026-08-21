import { applyTokensToCSS } from './cssTokens';
import type { ThemeColorExtensions, ThemeMode, ThemeTokens } from './types';
import type { ColorInput } from '@/types/Colors';
import {
	DEFAULT_SEED,
	createDesignTokens,
	normalizeDesignTokenSeed
} from '@gradient-ui/gradient-engine';
import {
	inject,
	provide,
	ref,
	shallowRef,
	type App,
	type InjectionKey,
	type Ref,
	type ShallowRef
} from 'vue';

export { DEFAULT_SEED };

export interface SeedTheme {
	seedColor: ColorInput;
}

export type { ThemeMode } from './types';

export interface GradientUIThemeOptions {
	seed?: ColorInput;
	mode?: ThemeMode;
	autoApply?: boolean;
	colors?: ThemeColorExtensions;
}

export interface CreateDefaultThemeOptions {
	colors?: ThemeColorExtensions;
}

export interface GeneratedTheme {
	tokens: {
		theme: ThemeTokens;
		colors: ThemeTokens;
		gradients: ThemeTokens;
	};
	themeCSS: HTMLStyleElement;
	colorsCSS: HTMLStyleElement;
	gradientCSS: HTMLStyleElement;
}

export interface GradientUITheme {
	seed: Ref<ColorInput>;
	mode: Ref<ThemeMode>;
	result: ShallowRef<GeneratedTheme | null>;
	apply: () => GeneratedTheme | null;
	setSeed: (seed: ColorInput) => GeneratedTheme | null;
	setMode: (mode: ThemeMode) => GeneratedTheme | null;
	toggleMode: () => GeneratedTheme | null;
}

const THEME_CLASS = 'g-theme--material';
const MODE_CLASS_PREFIX = 'g-theme--';
const ThemeSymbol: InjectionKey<GradientUITheme> = Symbol('gradient-theme');

const createTokenStyle = (tokens: ThemeTokens, prefix: string) =>
	applyTokensToCSS(tokens, {
		className: THEME_CLASS,
		id: `g-${prefix}-style`,
		prefix
	});

export const createDefaultLightTheme = (
	seed: ColorInput = DEFAULT_SEED,
	options: CreateDefaultThemeOptions = {}
) => createDefaultTheme(seed, 'light', options);

export const createDefaultDarkTheme = (
	seed: ColorInput = DEFAULT_SEED,
	options: CreateDefaultThemeOptions = {}
) => createDefaultTheme(seed, 'dark', options);

export const createDefaultTheme = (
	seed: ColorInput = DEFAULT_SEED,
	mode: ThemeMode = 'light',
	options: CreateDefaultThemeOptions = {}
): GeneratedTheme => {
	const root = document.documentElement;
	root.classList.add(THEME_CLASS);
	root.classList.remove(
		`${MODE_CLASS_PREFIX}light`,
		`${MODE_CLASS_PREFIX}dark`
	);
	root.classList.add(`${MODE_CLASS_PREFIX}${mode}`);

	const generated = createDesignTokens({
		colors: options.colors,
		mode,
		seed: normalizeDesignTokenSeed(seed)
	});
	const { tokens } = generated;

	return {
		tokens,
		themeCSS: createTokenStyle(tokens.theme, 'theme'),
		colorsCSS: createTokenStyle(tokens.colors, 'color'),
		gradientCSS: createTokenStyle(tokens.gradients, 'gradient')
	};
};

export const createTheme = (
	options: GradientUIThemeOptions = {}
): GradientUITheme => {
	const seed = ref(options.seed ?? DEFAULT_SEED) as Ref<ColorInput>;
	const mode = ref(options.mode ?? 'light') as Ref<ThemeMode>;
	const result = shallowRef<GeneratedTheme | null>(null);

	const apply = () => {
		if (typeof window === 'undefined') return null;
		result.value = createDefaultTheme(seed.value, mode.value, {
			colors: options.colors
		});
		return result.value;
	};

	const setSeed = (nextSeed: ColorInput) => {
		seed.value = nextSeed;
		return apply();
	};

	const setMode = (nextMode: ThemeMode) => {
		mode.value = nextMode;
		return apply();
	};

	const toggleMode = () => {
		mode.value = mode.value === 'dark' ? 'light' : 'dark';
		return apply();
	};

	if (options.autoApply !== false) {
		apply();
	}

	return {
		seed,
		mode,
		result,
		apply,
		setSeed,
		setMode,
		toggleMode
	};
};

export const provideTheme = (theme: GradientUITheme = createTheme()) => {
	provide(ThemeSymbol, theme);
	return theme;
};

export const installTheme = (app: App, theme: GradientUITheme) => {
	app.provide(ThemeSymbol, theme);
};

export const useTheme = () => inject(ThemeSymbol, null);
