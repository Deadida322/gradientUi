import type { ColorInput } from '@/types/Colors';

export interface RgbColor {
	r: number;
	g: number;
	b: number;
}

const clamp = (value: number, min = 0, max = 1) =>
	Math.min(max, Math.max(min, value));

const toLinear = (value: number) => {
	const channel = value / 255;
	return channel <= 0.04045
		? channel / 12.92
		: ((channel + 0.055) / 1.055) ** 2.4;
};

const parseHex = (value: string): RgbColor | null => {
	const hex = value.slice(1);
	const normalized =
		hex.length === 3 || hex.length === 4
			? hex
					.slice(0, 3)
					.split('')
					.map((character) => character.repeat(2))
					.join('')
			: hex.slice(0, 6);

	if (normalized.length !== 6 || !/^[\da-f]{6}$/i.test(normalized)) {
		return null;
	}

	return {
		r: parseInt(normalized.slice(0, 2), 16),
		g: parseInt(normalized.slice(2, 4), 16),
		b: parseInt(normalized.slice(4, 6), 16)
	};
};

const parseRgb = (value: string): RgbColor | null => {
	const match = value.match(
		/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*[\d.]+%?)?\s*\)$/i
	);

	if (!match) return null;

	return {
		r: clamp(Number(match[1]), 0, 255),
		g: clamp(Number(match[2]), 0, 255),
		b: clamp(Number(match[3]), 0, 255)
	};
};

export const parseColor = (input: ColorInput): RgbColor | null => {
	if (typeof input === 'number') {
		const value = input & 0xffffff;
		return {
			r: (value >> 16) & 0xff,
			g: (value >> 8) & 0xff,
			b: value & 0xff
		};
	}

	const value = input.trim();

	if (value.startsWith('#')) return parseHex(value);
	if (value.toLowerCase().startsWith('rgb')) return parseRgb(value);

	return null;
};

export const rgbToHex = ({ r, g, b }: RgbColor) =>
	`#${[r, g, b]
		.map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
		.join('')}`;

export const rgbToChannels = ({ r, g, b }: RgbColor) =>
	`${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`;

export const colorToHex = (input: ColorInput, fallback: string) => {
	const color = parseColor(input) ?? parseColor(fallback);

	if (!color) {
		throw new Error(`Invalid fallback color: ${fallback}`);
	}

	return rgbToHex(color);
};

const relativeLuminance = (color: RgbColor) =>
	0.2126 * toLinear(color.r) +
	0.7152 * toLinear(color.g) +
	0.0722 * toLinear(color.b);

export const getContrastingColor = (color: ColorInput) => {
	const parsed = parseColor(color);

	if (!parsed) return '#ffffff';

	const luminance = relativeLuminance(parsed);
	const whiteContrast = 1.05 / (luminance + 0.05);
	const darkContrast = (luminance + 0.05) / 0.055;

	return whiteContrast >= darkContrast ? '#ffffff' : '#0d0d12';
};
