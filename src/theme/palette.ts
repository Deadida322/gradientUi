import { colorToHex } from './color';
import type { ColorInput } from '@/types/Colors';
import {
	argbFromHex,
	hexFromArgb,
	themeFromSourceColor
} from '@material/material-color-utilities';

export const COLOR_SHADES = [
	50, 100, 200, 300, 400, 500, 600, 700, 800, 900
] as const;

export type ColorShade = (typeof COLOR_SHADES)[number];
export type ColorPalette = Record<ColorShade, string>;
export interface ColorPalettePair {
	colors: ColorPalette;
	onColors: ColorPalette;
}

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

export const ON_SHADE_TONES: Record<ColorShade, number> = Object.fromEntries(
	COLOR_SHADES.map((shade) => [shade, SHADE_TONES[shade] >= 60 ? 10 : 100])
) as Record<ColorShade, number>;

const createTonalPalette = (seed: ColorInput) => {
	const hex = colorToHex(seed, '#000000');
	return themeFromSourceColor(argbFromHex(hex)).palettes.primary;
};

const createPaletteFromTones = (
	seed: ColorInput,
	tones: Record<ColorShade, number>
) => {
	const tonalPalette = createTonalPalette(seed);
	return Object.fromEntries(
		COLOR_SHADES.map((shade) => [
			shade,
			hexFromArgb(tonalPalette.tone(tones[shade]))
		])
	) as ColorPalette;
};

export const createPalette = (seed: ColorInput): ColorPalette =>
	createPaletteFromTones(seed, SHADE_TONES);

export const createOnPalette = (seed: ColorInput): ColorPalette =>
	createPaletteFromTones(seed, ON_SHADE_TONES);

export const createPalettePair = (seed: ColorInput): ColorPalettePair => ({
	colors: createPalette(seed),
	onColors: createOnPalette(seed)
});
