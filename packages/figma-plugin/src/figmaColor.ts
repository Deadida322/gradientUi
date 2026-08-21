type ColorInput = string | number;

interface RgbColor {
	r: number;
	g: number;
	b: number;
}

const clamp = (value: number, min = 0, max = 255) =>
	Math.min(max, Math.max(min, value));

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
		b: parseInt(normalized.slice(4, 6), 16),
		g: parseInt(normalized.slice(2, 4), 16),
		r: parseInt(normalized.slice(0, 2), 16)
	};
};

const parseRgb = (value: string): RgbColor | null => {
	const match = value.match(
		/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*[\d.]+%?)?\s*\)$/i
	);

	if (!match) return null;

	return {
		b: clamp(Number(match[3])),
		g: clamp(Number(match[2])),
		r: clamp(Number(match[1]))
	};
};

const parseColor = (input: ColorInput): RgbColor | null => {
	if (typeof input === 'number') {
		const value = input & 0xffffff;
		return {
			b: value & 0xff,
			g: (value >> 8) & 0xff,
			r: (value >> 16) & 0xff
		};
	}

	const value = input.trim();

	if (value.startsWith('#')) return parseHex(value);
	if (value.toLowerCase().startsWith('rgb')) return parseRgb(value);

	return null;
};

export const channelsToRgb = (channels: string): RGB => {
	const [r = 0, g = 0, b = 0] = channels
		.split(',')
		.map((channel) => Number(channel.trim()));

	return {
		b: b / 255,
		g: g / 255,
		r: r / 255
	};
};

export const colorInputToRgb = (color: ColorInput): RGB => {
	const parsed = parseColor(color);

	if (!parsed) return { b: 0, g: 0, r: 0 };

	return {
		b: parsed.b / 255,
		g: parsed.g / 255,
		r: parsed.r / 255
	};
};

export const solidPaintFromChannels = (channels: string): SolidPaint => ({
	color: channelsToRgb(channels),
	type: 'SOLID'
});
