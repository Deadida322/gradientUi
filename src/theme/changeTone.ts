import {
	argbFromHex,
	hexFromArgb,
	Hct
} from '@material/material-color-utilities';

export function changeTone(hex: string, newTone: number): string {
	const hct = Hct.fromInt(argbFromHex(hex));
	const newColor = Hct.from(hct.hue, hct.chroma, newTone);
	return hexFromArgb(newColor.toInt());
}
