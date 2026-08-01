import { COLOR_SEEDS } from '@/theme/colorSeeds';
import { getContrastingColor, parseColor } from '@/theme/color';
import { createGradientFromColor } from '@/theme/gradient';
import { COLOR_SHADES, type ColorShade } from '@/theme/palette';
import { camelToKebabCase } from '@/utils/camelToKebabCase';
import { computed, toValue, type MaybeRefOrGetter } from 'vue';

type KebabCase<Value extends string> =
	Value extends `${infer Head}${infer Tail}`
		? Tail extends Uncapitalize<Tail>
			? `${Lowercase<Head>}${KebabCase<Tail>}`
			: `${Lowercase<Head>}-${KebabCase<Tail>}`
		: Value;

type ColorFamilyName =
	| 'source'
	| KebabCase<Extract<keyof typeof COLOR_SEEDS, string>>;

export const SEMANTIC_COLORS = [
	'primary',
	'main',
	'error',
	'warning',
	'success',
	'surface',
	'on-surface'
] as const;

export type SemanticColor = (typeof SEMANTIC_COLORS)[number];
export type PaletteColor = ColorFamilyName | `${ColorFamilyName}-${ColorShade}`;
export type CSSKeywordColor =
	| 'transparent'
	| 'currentColor'
	| 'currentcolor'
	| 'inherit'
	| 'initial'
	| 'revert'
	| 'unset'
	| 'black'
	| 'white';
export type CSSColor =
	| CSSKeywordColor
	| `#${string}`
	| `rgb(${string})`
	| `rgba(${string})`
	| `hsl(${string})`
	| `hsla(${string})`
	| `hwb(${string})`
	| `lab(${string})`
	| `lch(${string})`
	| `oklab(${string})`
	| `oklch(${string})`
	| `color(${string})`
	| `var(${string})`
	| `${string}-gradient(${string})`;
export type GColor = SemanticColor | PaletteColor | CSSColor;

interface ColorAlias {
	color: string;
	onColor: string;
	gradient: string;
}

export const resolveColorValue = (color?: GColor) => {
	const alias = resolveColorAlias(color);

	if (alias) return alias.color;
	if (!color) return SEMANTIC_ALIASES.primary.color;
	if (parseColor(color) || isCSSKeywordColor(color)) return color;
	if (isTokenColor(color)) return `rgb(var(--g-color-${color}))`;

	return color;
};

export const resolveOnColorValue = (color?: GColor) => {
	const alias = resolveColorAlias(color);

	if (alias) return alias.onColor;
	if (!color) return SEMANTIC_ALIASES.primary.onColor;
	if (parseColor(color)) return getContrastingColor(color);
	if (isTokenColor(color)) return `rgb(var(--g-color-on-${color}))`;

	return SEMANTIC_ALIASES.primary.onColor;
};

export const resolveGradientValue = (color?: GColor) => {
	if (!color) return SEMANTIC_ALIASES.primary.gradient;

	const alias = resolveColorAlias(color);

	if (alias) return alias.gradient;
	if (parseColor(color)) return createGradientFromColor(color);
	if (color.includes('gradient(') || color.startsWith('var(')) return color;

	return `var(--g-gradient-${color}, var(--g-gradient-main))`;
};

export const useResolveGradientValue = (
	color: MaybeRefOrGetter<GColor | undefined>
) => computed(() => resolveGradientValue(toValue(color)));

const createPaletteAlias = (
	colorName: string,
	shade: ColorShade
): ColorAlias => {
	return {
		color: `rgb(var(--g-color-${colorName}-${shade}))`,
		onColor: `rgb(var(--g-color-on-${colorName}-${shade}))`,
		gradient: `var(--g-gradient-${colorName}-${shade})`
	};
};

const SEMANTIC_ALIASES: Record<SemanticColor, ColorAlias> = {
	primary: {
		color: 'var(--g-token-color-primary)',
		onColor: 'var(--g-token-color-on-primary)',
		gradient: 'var(--g-gradient-main)'
	},
	main: {
		color: 'var(--g-token-color-primary)',
		onColor: 'var(--g-token-color-on-primary)',
		gradient: 'var(--g-gradient-main)'
	},
	error: {
		color: 'var(--g-token-color-error)',
		onColor: 'var(--g-token-color-on-error)',
		gradient: 'var(--g-gradient-error)'
	},
	warning: {
		color: 'var(--g-token-color-warning)',
		onColor: 'var(--g-token-color-on-warning)',
		gradient: 'var(--g-gradient-warning)'
	},
	success: {
		color: 'var(--g-token-color-success)',
		onColor: 'var(--g-token-color-on-success)',
		gradient: 'var(--g-gradient-success)'
	},
	surface: {
		color: 'var(--g-token-color-surface)',
		onColor: 'var(--g-token-color-on-surface)',
		gradient: 'var(--g-gradient-source-500)'
	},
	'on-surface': {
		color: 'var(--g-token-color-on-surface)',
		onColor: 'var(--g-token-color-surface)',
		gradient: 'var(--g-gradient-source-500)'
	}
};

const PALETTE_FAMILIES = new Set([
	'source',
	...Object.keys(COLOR_SEEDS).map(camelToKebabCase)
]);
const COLOR_SHADE_SET = new Set<number>(COLOR_SHADES);
const SEMANTIC_COLOR_SET = new Set<string>(SEMANTIC_COLORS);
const CSS_KEYWORD_COLOR_SET = new Set<string>([
	'transparent',
	'currentColor',
	'currentcolor',
	'inherit',
	'initial',
	'revert',
	'unset',
	'black',
	'white'
]);
const TOKEN_COLOR_RE = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;

const isSemanticColor = (color: string): color is SemanticColor =>
	SEMANTIC_COLOR_SET.has(color);

const isCSSKeywordColor = (color: string) => CSS_KEYWORD_COLOR_SET.has(color);

const isTokenColor = (color: string) =>
	TOKEN_COLOR_RE.test(color) && !isCSSKeywordColor(color);

const resolvePaletteAlias = (color: string): ColorAlias | null => {
	if (PALETTE_FAMILIES.has(color)) {
		return createPaletteAlias(color, 500);
	}

	const match = color.match(/^(.+)-(\d+)$/);

	if (!match || !PALETTE_FAMILIES.has(match[1])) return null;

	const shade = Number(match[2]);

	if (!COLOR_SHADE_SET.has(shade)) return null;

	return createPaletteAlias(match[1], shade as ColorShade);
};

const resolveColorAlias = (color?: GColor) => {
	if (!color) return SEMANTIC_ALIASES.primary;
	return isSemanticColor(color)
		? SEMANTIC_ALIASES[color]
		: resolvePaletteAlias(color);
};
