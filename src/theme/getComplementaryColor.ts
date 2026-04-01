import {
	argbFromHex,
	hexFromArgb,
	Hct
} from '@material/material-color-utilities';
export function getComplementaryColor(hex: string): string {
	const hct = Hct.fromInt(argbFromHex(hex));

	const compHue = (hct.hue + 110) % 360;

	const chroma = Math.min(hct.chroma * 1.2, 100);
	const tone = hct.tone < 50 ? 65 : Math.min(hct.tone + 10, 75);

	return hexFromArgb(Hct.from(compHue, chroma, tone).toInt());
}
