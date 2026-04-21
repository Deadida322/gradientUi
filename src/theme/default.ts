import {
	themeFromSourceColor,
	hexFromArgb
} from '@material/material-color-utilities';
import { camelToKebabCase } from '../utils/camelToKebabCase';
import {
	generateGradientCSS,
	generateMaterialGradients
} from './generateGradient';
import { generateMaterialColors } from './generateColors';
import { hexToRgbString } from '@/utils/color';
import { normalizeColor } from '@/utils/colors/normaliseColor';
import type { ColorInput } from '@/types/Colors';
const DEFAULT_SEED = '#4e51ff';

export interface SeedTheme {
	seedColor: ColorInput;
}

export type ThemeMode = 'light' | 'dark';

const THEME_CLASS = 'g-theme--material';
const MODE_CLASS_PREFIX = 'g-theme--';

function createSemanticTokens(mode: ThemeMode) {
	const warningSeedArgb = normalizeColor('#FFC107');
	const successSeedArgb = normalizeColor('#4CAF50');

	if (warningSeedArgb == null || successSeedArgb == null) {
		throw new Error('Failed to normalize semantic seed color.');
	}

	const schemeKey = mode === 'dark' ? 'dark' : 'light';
	const warningScheme =
		themeFromSourceColor(warningSeedArgb).schemes[schemeKey].toJSON();
	const successScheme =
		themeFromSourceColor(successSeedArgb).schemes[schemeKey].toJSON();

	return {
		warning: hexToRgbString(hexFromArgb(warningScheme.primary)),
		onWarning: hexToRgbString(hexFromArgb(warningScheme.onPrimary)),
		warningContainer: hexToRgbString(
			hexFromArgb(warningScheme.primaryContainer)
		),
		onWarningContainer: hexToRgbString(
			hexFromArgb(warningScheme.onPrimaryContainer)
		),
		success: hexToRgbString(hexFromArgb(successScheme.primary)),
		onSuccess: hexToRgbString(hexFromArgb(successScheme.onPrimary)),
		successContainer: hexToRgbString(
			hexFromArgb(successScheme.primaryContainer)
		),
		onSuccessContainer: hexToRgbString(
			hexFromArgb(successScheme.onPrimaryContainer)
		)
	};
}

function generateTheme(seedColor: string, mode: ThemeMode) {
	const normalizedSeed = normalizeSeedToHex(seedColor);
	const seedArgb = normalizeColor(normalizedSeed);
	if (seedArgb == null) {
		throw new Error('Failed to normalize seed color.');
	}
	const theme = themeFromSourceColor(seedArgb);
	const schemeKey = mode === 'dark' ? 'dark' : 'light';
	const scheme = theme.schemes[schemeKey].toJSON();

	const tokens: Record<string, string> = {};

	Object.entries(scheme).forEach(([key, argb]) => {
		const hex = hexFromArgb(argb);
		const rgb = hexToRgbString(hex);
		tokens[key] = rgb;
	});

	return {
		...tokens,
		...createSemanticTokens(mode)
	};
}

function generatePrimaryGradients(seed: string) {
	const normalizedSeed = normalizeSeedToHex(seed);
	const seedArgb = normalizeColor(normalizedSeed);
	const warningSeedArgb = normalizeColor('#FFC107');
	const successSeedArgb = normalizeColor('#4CAF50');

	if (
		seedArgb == null ||
		warningSeedArgb == null ||
		successSeedArgb == null
	) {
		throw new Error('Failed to normalize gradient seed color.');
	}

	const mainTheme = themeFromSourceColor(seedArgb);
	const warningTheme = themeFromSourceColor(warningSeedArgb);
	const successTheme = themeFromSourceColor(successSeedArgb);

	const mainScheme = mainTheme.schemes.light.toJSON();
	const warningScheme = warningTheme.schemes.light.toJSON();
	const successScheme = successTheme.schemes.light.toJSON();

	const errorHex = hexFromArgb(mainScheme.error);
	const warningHex = hexFromArgb(warningScheme.primary);
	const successHex = hexFromArgb(successScheme.primary);

	return {
		...generateMaterialGradients(normalizedSeed, 135),
		main: generateGradientCSS(normalizedSeed, 135),
		error: generateGradientCSS(errorHex, 135),
		warning: generateGradientCSS(warningHex, 135),
		success: generateGradientCSS(successHex, 135)
	};
}

function normalizeSeedToHex(seed: ColorInput): string {
	const normalized = normalizeColor(seed);
	return normalized == null ? DEFAULT_SEED : hexFromArgb(normalized);
}

function applyTokensToCSS(tokens: Record<string, string>, prefix: string) {
	let css = `.${THEME_CLASS} {\n`;

	for (const [key, value] of Object.entries(tokens)) {
		css += `  --g-${prefix}-${camelToKebabCase(key)}: ${value};\n`;
	}

	css += `}`;

	let style = document.getElementById(
		`g-${prefix}-style`
	) as HTMLStyleElement;
	if (!style) {
		style = document.createElement('style');
		style.id = `g-${prefix}-style`;
		document.head.appendChild(style);
	}
	style.textContent = css;

	return style;
}

export function createDefaultLightTheme(seed: ColorInput = DEFAULT_SEED) {
	return createDefaultTheme(seed, 'light');
}

export function createDefaultDarkTheme(seed: ColorInput = DEFAULT_SEED) {
	return createDefaultTheme(seed, 'dark');
}

export function createDefaultTheme(
	seed: ColorInput = DEFAULT_SEED,
	mode: ThemeMode = 'light'
) {
	const root = document.documentElement;
	root.classList.add(THEME_CLASS);
	root.classList.remove(
		`${MODE_CLASS_PREFIX}light`,
		`${MODE_CLASS_PREFIX}dark`
	);
	root.classList.add(`${MODE_CLASS_PREFIX}${mode}`);

	const normalizedSeed = normalizeSeedToHex(seed);
	const tokens = {
		theme: generateTheme(normalizedSeed, mode),
		colors: generateMaterialColors(normalizedSeed),
		gradient: generatePrimaryGradients(normalizedSeed)
	};

	console.log(tokens.theme, 'tokens');

	return {
		tokens,
		themeCSS: applyTokensToCSS(tokens.theme, 'theme'),
		colorsCSS: applyTokensToCSS(tokens.colors, 'color'),
		gradientCSS: applyTokensToCSS(tokens.gradient, 'gradient')
	};
}
