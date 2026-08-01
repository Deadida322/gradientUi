import {
	argbFromHex,
	Hct,
	hexFromArgb
} from '@material/material-color-utilities';

export const changeTone = (hex: string, tone: number) => {
	const hct = Hct.fromInt(argbFromHex(hex));
	return hexFromArgb(Hct.from(hct.hue, hct.chroma, tone).toInt());
};

export const shiftHue = (
	hex: string,
	hueShift: number,
	tone: number,
	chromaMultiplier = 1
) => {
	const hct = Hct.fromInt(argbFromHex(hex));
	const hue = (hct.hue + hueShift + 360) % 360;
	const chroma = Math.min(hct.chroma * chromaMultiplier, 100);

	return hexFromArgb(Hct.from(hue, chroma, tone).toInt());
};

export const getComplementaryColor = (hex: string) => {
	const hct = Hct.fromInt(argbFromHex(hex));
	const hue = (hct.hue + 110) % 360;
	const chroma = Math.min(hct.chroma * 1.2, 100);
	const tone = hct.tone < 50 ? 65 : Math.min(hct.tone + 10, 75);

	return hexFromArgb(Hct.from(hue, chroma, tone).toInt());
};
