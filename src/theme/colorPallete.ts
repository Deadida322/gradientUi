import {
	argbFromHex,
	themeFromSourceColor,
	hexFromArgb
} from '@material/material-color-utilities';
import { MaterialSeeds } from './colorSeeds';

let materialPallete = {};

Object.entries(MaterialSeeds).forEach(([colorName, hex]) => {
	const theme = themeFromSourceColor(argbFromHex(hex));
	const tonal = theme.palettes.primary;

	for (let tone = 10; tone <= 100; tone += 10) {
		const toneHex = hexFromArgb(tonal.tone(tone));
		materialPallete[`${colorName}${tone}`] = toneHex;
	}
	materialPallete = { ...MaterialSeeds, ...materialPallete };
});

export { materialPallete };
