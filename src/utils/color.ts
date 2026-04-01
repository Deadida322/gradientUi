import {
	argbFromHex,
	hexFromArgb,
	Hct
} from '@material/material-color-utilities';
export function getComplementaryColor(hex: string): string {
	const hct = Hct.fromInt(argbFromHex(hex));

	const compHue = (hct.hue + 110) % 360;

	const chroma = Math.min(hct.chroma * 1.2, 100);
	const tone = hct.tone < 50 ? 65 : Math.min(hct.tone + 10, 50);

	return hexFromArgb(Hct.from(compHue, chroma, tone).toInt());
}

export function getTonedColor(hex: string, newTone: number): string {
	const hct = Hct.fromInt(argbFromHex(hex));
	const newColor = Hct.from(hct.hue, hct.chroma, newTone);
	return hexFromArgb(newColor.toInt());
}

export function hexToRgbString(hex: string) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `${r}, ${g}, ${b}`;
}
