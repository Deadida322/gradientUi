import { changeTone } from './changeTone';
import { getComplementaryColor } from './getComplementaryColor';

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
