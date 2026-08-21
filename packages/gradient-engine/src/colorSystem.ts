import { getContrastingColor, parseColor, rgbToChannels } from './color';
import { COLOR_SEEDS } from './colorSeeds';
import { createGradient, createGradientFromColor } from './core';
import {
	COLOR_SHADES,
	createPalettePair,
	type ColorPalettePair
} from './palette';
import type { ColorInput } from './color';
import type { ThemeTokens } from './scheme';

export interface ThemeColorDefinition {
	color: ColorInput;
	onColor?: ColorInput;
	palette?: boolean;
	gradient?: string | false;
}

export type ThemeColorValue = ColorInput | ThemeColorDefinition;
export type ThemeColorExtensions = Record<string, ThemeColorValue>;

export interface ColorSystem {
	colors: ThemeTokens;
	gradients: ThemeTokens;
	palettes: Record<string, ColorPalettePair>;
}

export interface ColorSystemOptions {
	colors?: ThemeColorExtensions;
}

const toChannels = (color: ColorInput) => {
	const parsed = parseColor(color);

	if (!parsed) {
		throw new Error(`Unsupported generated color: ${String(color)}`);
	}

	return rgbToChannels(parsed);
};

const capitalize = (value: string) =>
	`${value.charAt(0).toUpperCase()}${value.slice(1)}`;

const getOnTokenName = (name: string) => `on${capitalize(name)}`;

const camelToKebabCase = (value: string) =>
	value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const kebabToCamelCase = (value: string) =>
	value.replace(/-([a-z0-9])/g, (_, character: string) =>
		character.toUpperCase()
	);

const addPaletteTokens = (
	colors: ThemeTokens,
	gradients: ThemeTokens,
	name: string,
	palettePair: ColorPalettePair
) => {
	const { colors: palette, onColors } = palettePair;

	for (const shade of COLOR_SHADES) {
		const color = palette[shade];
		colors[`${name}${shade}`] = toChannels(color);
		colors[`${getOnTokenName(name)}${shade}`] = toChannels(onColors[shade]);
		gradients[`${name}${shade}`] = createGradient(palette, { shade });
	}

	colors[name] = colors[`${name}500`];
	colors[getOnTokenName(name)] = colors[`${getOnTokenName(name)}500`];
	gradients[name] = gradients[`${name}500`];
};

const isColorDefinition = (
	value: ThemeColorValue
): value is ThemeColorDefinition =>
	typeof value === 'object' && value !== null && 'color' in value;

const normalizeColorDefinition = (
	value: ThemeColorValue
): ThemeColorDefinition =>
	isColorDefinition(value) ? value : { color: value };

const addSingleColorTokens = (
	colors: ThemeTokens,
	gradients: ThemeTokens,
	name: string,
	definition: ThemeColorDefinition
) => {
	colors[name] = toChannels(definition.color);
	colors[getOnTokenName(name)] = toChannels(
		definition.onColor ?? getContrastingColor(definition.color)
	);

	if (definition.gradient !== false) {
		gradients[name] =
			definition.gradient ?? createGradientFromColor(definition.color);
	}
};

const addCustomColorTokens = (
	colors: ThemeTokens,
	gradients: ThemeTokens,
	palettes: Record<string, ColorPalettePair>,
	name: string,
	value: ThemeColorValue
) => {
	const normalizedName = kebabToCamelCase(camelToKebabCase(name));
	const definition = normalizeColorDefinition(value);

	if (definition.palette === false) {
		addSingleColorTokens(colors, gradients, normalizedName, definition);
		return;
	}

	const palettePair = createPalettePair(definition.color);
	palettes[normalizedName] = palettePair;
	addPaletteTokens(colors, gradients, normalizedName, palettePair);

	if (definition.onColor) {
		colors[getOnTokenName(normalizedName)] = toChannels(definition.onColor);
	}

	if (definition.gradient) {
		gradients[normalizedName] = definition.gradient;
	}
};

export const createColorSystem = (
	seed: ColorInput,
	options: ColorSystemOptions = {}
): ColorSystem => {
	const colors: ThemeTokens = {};
	const gradients: ThemeTokens = {};
	const palettes: Record<string, ColorPalettePair> = {
		source: createPalettePair(seed)
	};

	for (const [name, colorSeed] of Object.entries(COLOR_SEEDS)) {
		palettes[name] = createPalettePair(colorSeed);
	}

	for (const [name, palettePair] of Object.entries(palettes)) {
		addPaletteTokens(colors, gradients, name, palettePair);
	}

	for (const [name, value] of Object.entries(options.colors ?? {})) {
		addCustomColorTokens(colors, gradients, palettes, name, value);
	}

	gradients.main = createGradient(palettes.source.colors);
	gradients.error = createGradient(palettes.red.colors, { shade: 600 });
	gradients.warning = createGradient(palettes.amber.colors, { shade: 600 });
	gradients.success = createGradient(palettes.green.colors, { shade: 600 });

	return {
		colors,
		gradients,
		palettes
	};
};
