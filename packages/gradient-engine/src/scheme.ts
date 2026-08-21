import {
	argbFromHex,
	hexFromArgb,
	themeFromSourceColor
} from '@material/material-color-utilities';
import { parseColor, rgbToChannels } from './color';
import { COLOR_SEEDS } from './colorSeeds';
import type { ColorInput } from './color';

export type ThemeMode = 'light' | 'dark';
export type ThemeTokens = Record<string, string>;

const toChannels = (color: ColorInput) => {
	const parsed = parseColor(color);

	if (!parsed) {
		throw new Error(`Unsupported generated color: ${String(color)}`);
	}

	return rgbToChannels(parsed);
};

const schemeToTokens = (seed: string, mode: ThemeMode): ThemeTokens => {
	const scheme = themeFromSourceColor(argbFromHex(seed)).schemes[
		mode
	].toJSON();

	return Object.fromEntries(
		Object.entries(scheme).map(([name, argb]) => [
			name,
			toChannels(hexFromArgb(argb))
		])
	);
};

export const createSemanticTokens = (
	seed: string,
	mode: ThemeMode
): ThemeTokens => {
	const tokens = schemeToTokens(seed, mode);
	const warning = schemeToTokens(COLOR_SEEDS.amber, mode);
	const success = schemeToTokens(COLOR_SEEDS.green, mode);

	return {
		...tokens,
		warning: warning.primary,
		onWarning: warning.onPrimary,
		warningContainer: warning.primaryContainer,
		onWarningContainer: warning.onPrimaryContainer,
		success: success.primary,
		onSuccess: success.onPrimary,
		successContainer: success.primaryContainer,
		onSuccessContainer: success.onPrimaryContainer
	};
};
