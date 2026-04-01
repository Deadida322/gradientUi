import {
	themeFromSourceColor,
	hexFromArgb
} from '@material/material-color-utilities';
import { camelToKebabCase } from '../utils/camelToKebabCase';
import { generateGradientCSS } from './generateGradient';
import { generateMaterialColors } from './generateColors';
import { hexToRgbString } from '@/utils/color';
import { normalizeColor } from '@/utils/colors/normaliseColor';
import type { ColorInput } from '@/types/Colors';
const DEFAULT_SEED = '#4e51ff';

export interface SeedTheme {
	seedColor: ColorInput;
}

const THEME_CLASS = 'g-theme--material';

const maps = {
	primaryContainer: 'tonal',
	onPrimaryContainer: 'onTonal'
};

function createSemanticTokens() {
	const warningSeedArgb = normalizeColor('#FFC107');
	const successSeedArgb = normalizeColor('#4CAF50');

	if (warningSeedArgb == null || successSeedArgb == null) {
		throw new Error('Failed to normalize semantic seed color.');
	}

	const warningScheme =
		themeFromSourceColor(warningSeedArgb).schemes.light.toJSON();
	const successScheme =
		themeFromSourceColor(successSeedArgb).schemes.light.toJSON();

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

function generateLightTheme(seedColor: string) {
	const normalizedSeed = normalizeSeedToHex(seedColor);
	const seedArgb = normalizeColor(normalizedSeed);
	if (seedArgb == null) {
		throw new Error('Failed to normalize seed color.');
	}
	const theme = themeFromSourceColor(seedArgb);
	const scheme = theme.schemes.light.toJSON();

	const tokens: Record<string, string> = {};

	Object.entries(scheme).forEach(([key, argb]) => {
		const hex = hexFromArgb(argb);
		const rgb = hexToRgbString(hex);
		tokens[maps[key] || key] = rgb;
	});

	return {
		...tokens,
		...createSemanticTokens()
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
	document.getElementsByTagName('html')[0].classList.add(THEME_CLASS);
	const normalizedSeed = normalizeSeedToHex(seed);
	const tokens = {
		theme: generateLightTheme(normalizedSeed),
		colors: generateMaterialColors(normalizedSeed),
		gradient: generatePrimaryGradients(normalizedSeed)
	};

	console.log(
		{
			tokens,
			themeCSS: applyTokensToCSS(tokens.theme, 'theme'),
			colorsCSS: applyTokensToCSS(tokens.colors, 'color'),
			gradient: applyTokensToCSS(tokens.gradient, 'gradient')
		},
		'tokens'
	);
}
