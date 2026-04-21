import {
	argbFromHex,
	themeFromSourceColor,
	hexFromArgb
} from '@material/material-color-utilities';
import { MaterialSeeds } from './colorSeeds';
import { hexToRgbString } from '@/utils/color';

export function generateMaterialColors(seed: string) {
	const colors: Record<string, string> = {};

	addMaterialPalette(colors, 'source', seed);

	Object.entries(MaterialSeeds).forEach(([colorName]) => {
		addMaterialPalette(colors, colorName, MaterialSeeds[colorName]);
	});

	return colors;
}

function addMaterialPalette(
	colors: Record<string, string>,
	colorName: string,
	seed: string
) {
	const theme = themeFromSourceColor(argbFromHex(seed));
	const tonal = theme.palettes.primary;

	for (let tone = 10; tone <= 100; tone += 10) {
		const hex = hexFromArgb(tonal.tone(tone));
		const rgb = hexToRgbString(hex);

		colors[`${colorName}${tone}`] = rgb;
	}
}
