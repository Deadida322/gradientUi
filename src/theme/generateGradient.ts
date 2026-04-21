import { changeTone } from './changeTone';
import { getComplementaryColor } from './getComplementaryColor';
import {
	argbFromHex,
	hexFromArgb,
	themeFromSourceColor
} from '@material/material-color-utilities';
import { MaterialSeeds } from './colorSeeds';

export function generateGradient(seedColor: string) {
	const oppositeColor = getComplementaryColor(seedColor);
	return {
		0: changeTone(oppositeColor, 95),
		25: oppositeColor,
		50: seedColor,
		75: changeTone(seedColor, 80),
		100: changeTone(seedColor, 20)
	};
}

export function generateGradientCSS(seedColor: string, deg: number): string {
	const stops = generateGradient(seedColor);
	let gString = `linear-gradient(${deg}deg, `;
	for (const key of Object.keys(stops)) {
		gString += `${stops[key]} ${key}%, `;
	}
	return gString.slice(0, -2) + ')';
}

export function generateMaterialGradients(seed: string, deg = 135) {
	const gradients: Record<string, string> = {};

	addMaterialGradientPalette(gradients, 'source', seed, deg);

	Object.entries(MaterialSeeds).forEach(([colorName, colorSeed]) => {
		addMaterialGradientPalette(gradients, colorName, colorSeed, deg);
	});

	return gradients;
}

function addMaterialGradientPalette(
	gradients: Record<string, string>,
	colorName: string,
	seed: string,
	deg: number
) {
	const theme = themeFromSourceColor(argbFromHex(seed));
	const tonal = theme.palettes.primary;

	for (let tone = 10; tone <= 100; tone += 10) {
		const hex = hexFromArgb(tonal.tone(tone));

		gradients[`${colorName}${tone}`] = generateGradientCSS(hex, deg);
	}
}
