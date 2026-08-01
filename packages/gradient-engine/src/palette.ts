import {
	argbFromHex,
	hexFromArgb,
	themeFromSourceColor
} from '@material/material-color-utilities';
import { colorToHex, type ColorInput } from './color';

export const COLOR_SHADES = [
	50, 100, 200, 300, 400, 500, 600, 700, 800, 900
] as const;

export type ColorShade = (typeof COLOR_SHADES)[number];
export type ColorPalette = Record<ColorShade, string>;

export const SHADE_TONES: Record<ColorShade, number> = {
	50: 90,
	100: 80,
	200: 70,
	300: 60,
	400: 50,
	500: 40,
	600: 35,
	700: 30,
	800: 20,
	900: 10
};

const createTonalPalette = (seed: ColorInput) => {
	const hex = colorToHex(seed, '#000000');
	return themeFromSourceColor(argbFromHex(hex)).palettes.primary;
};

export const createPalette = (seed: ColorInput): ColorPalette => {
	const tonalPalette = createTonalPalette(seed);

	return Object.fromEntries(
		COLOR_SHADES.map((shade) => [
			shade,
			hexFromArgb(tonalPalette.tone(SHADE_TONES[shade]))
		])
	) as ColorPalette;
};
