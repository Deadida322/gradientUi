import {
	argbFromHex,
	themeFromSourceColor,
	hexFromArgb
} from '@material/material-color-utilities';
import { MaterialSeeds } from './colorSeeds';
import { hexToRgbString } from '@/utils/color';
export function generateMaterialColors(seed: string) {
	const theme = themeFromSourceColor(argbFromHex(seed));
	const tonal = theme.palettes.primary;
	const colors = {};
	Object.entries(MaterialSeeds).forEach(([colorName]) => {
		for (let tone = 10; tone <= 100; tone += 10) {
			const hex = hexFromArgb(tonal.tone(tone));

			const rgb = hexToRgbString(hex);
			colors[`${colorName}${tone}`] = rgb;
		}
	});
	return colors;
}
