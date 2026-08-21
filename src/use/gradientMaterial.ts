import {
	COLOR_SHADES,
	DEFAULT_GRADIENT_MORPH_BLEND_MODE,
	createGradientMaterial,
	createPalette,
	type CreatedGradientMaterial,
	type GradientAnimationOptions,
	type GradientMaterialOptions,
	type GradientMorphOptions,
	type GradientShadowOptions,
	type GradientTokenRecipe,
	type ColorShade
} from '@/theme';
import { COLOR_SEEDS } from '@/theme/colorSeeds';
import { parseColor } from '@/theme/color';
import { DEFAULT_SEED, useTheme } from '@/theme/default';
import { camelToKebabCase } from '@/utils/camelToKebabCase';
import {
	computed,
	toValue,
	type CSSProperties,
	type MaybeRefOrGetter
} from 'vue';
import {
	resolveColorValue,
	resolveGradientValue,
	resolveOnColorValue,
	type GColor
} from './colorResolver';
import type { GGradienStates } from './gradient';

export type GradientMaterialKind = 'action' | 'surface';

export interface UseGradientMaterialOptions {
	color?: MaybeRefOrGetter<GColor | GGradienStates | undefined>;
	kind?: MaybeRefOrGetter<GradientMaterialKind | undefined>;
	recipe?: MaybeRefOrGetter<GradientTokenRecipe | undefined>;
	effects?: MaybeRefOrGetter<boolean | undefined>;
	animations?: MaybeRefOrGetter<boolean | undefined>;
	shadow?: MaybeRefOrGetter<GradientShadowOptions | undefined>;
	dropShadow?: MaybeRefOrGetter<GradientShadowOptions | undefined>;
	animation?: MaybeRefOrGetter<GradientAnimationOptions | undefined>;
	morph?: MaybeRefOrGetter<GradientMorphOptions | undefined>;
	options?: MaybeRefOrGetter<GradientMaterialOptions | undefined>;
}

const MATERIAL_RECIPE_BY_KIND = {
	action: 'materialAction',
	surface: 'materialSurface'
} satisfies Record<GradientMaterialKind, GradientTokenRecipe>;

const DEFAULT_SHADOW = 'var(--g-token-elevation-2)';
const EMPTY_SHADOW = 'none';
const EMPTY_FILTER = 'none';
const EMPTY_ANIMATION = 'none';
const LIGHT_FOREGROUND = '#ffffff';
const DARK_FOREGROUND = '#0d0d12';

const PALETTE_SEEDS = Object.fromEntries(
	Object.entries(COLOR_SEEDS).map(([name, seed]) => [
		camelToKebabCase(name),
		seed
	])
) as Record<string, string>;
const COLOR_SHADE_SET = new Set<number>(COLOR_SHADES);

const SEMANTIC_MATERIAL_SEEDS: Partial<
	Record<GColor | GGradienStates, string>
> = {
	error: COLOR_SEEDS.red,
	success: COLOR_SEEDS.green,
	warning: COLOR_SEEDS.orange
};

const resolvePaletteSeed = (color: string) => {
	if (color in PALETTE_SEEDS) return PALETTE_SEEDS[color];

	const match = color.match(/^(.+)-(\d+)$/);

	if (!match) return null;

	const [, family, shadeValue] = match;
	const seed = PALETTE_SEEDS[family];
	const shade = Number(shadeValue);

	if (!seed || !COLOR_SHADE_SET.has(shade)) return null;

	return createPalette(seed)[shade as ColorShade];
};

const resolveMaterialSeed = (
	color: GColor | GGradienStates | undefined,
	themeSeed: string | number
) => {
	if (!color) return themeSeed;
	if (parseColor(color)) return color;
	if (color === 'primary' || color === 'main') return themeSeed;
	if (color in SEMANTIC_MATERIAL_SEEDS) return SEMANTIC_MATERIAL_SEEDS[color];

	return resolvePaletteSeed(color);
};

const toLinear = (value: number) => {
	const channel = value / 255;

	return channel <= 0.04045
		? channel / 12.92
		: ((channel + 0.055) / 1.055) ** 2.4;
};

const getRelativeLuminance = (
	color: NonNullable<ReturnType<typeof parseColor>>
) =>
	0.2126 * toLinear(color.r) +
	0.7152 * toLinear(color.g) +
	0.0722 * toLinear(color.b);

const getContrastRatio = (
	foreground: NonNullable<ReturnType<typeof parseColor>>,
	background: NonNullable<ReturnType<typeof parseColor>>
) => {
	const foregroundLuminance = getRelativeLuminance(foreground);
	const backgroundLuminance = getRelativeLuminance(background);
	const lighter = Math.max(foregroundLuminance, backgroundLuminance);
	const darker = Math.min(foregroundLuminance, backgroundLuminance);

	return (lighter + 0.05) / (darker + 0.05);
};

const getGradientCenterColor = (material: CreatedGradientMaterial) => {
	const stops = material.gradient.stops
		?.map((stop) => {
			const color = parseColor(stop.color);

			return color ? { color, position: stop.position } : null;
		})
		.filter((stop): stop is NonNullable<typeof stop> => stop !== null)
		.sort((first, second) => first.position - second.position);

	if (!stops?.length) return null;

	const targetPosition = 50;
	const nextIndex = stops.findIndex(
		(stop) => stop.position >= targetPosition
	);

	if (nextIndex === -1) return stops.at(-1)?.color ?? null;
	if (nextIndex === 0) return stops[0]?.color ?? null;

	const previous = stops[nextIndex - 1];
	const next = stops[nextIndex];
	const distance = next.position - previous.position;
	const progress = distance
		? (targetPosition - previous.position) / distance
		: 0;

	return {
		r: previous.color.r + (next.color.r - previous.color.r) * progress,
		g: previous.color.g + (next.color.g - previous.color.g) * progress,
		b: previous.color.b + (next.color.b - previous.color.b) * progress
	};
};

const getGradientForeground = (
	material: CreatedGradientMaterial,
	fallback: string
) => {
	const centerColor = getGradientCenterColor(material);

	if (!centerColor) return fallback;

	const candidates = [LIGHT_FOREGROUND, DARK_FOREGROUND]
		.map((color) => {
			const parsed = parseColor(color);

			if (!parsed) return null;

			return {
				color,
				contrast: getContrastRatio(parsed, centerColor)
			};
		})
		.filter((candidate): candidate is NonNullable<typeof candidate> =>
			Boolean(candidate)
		);

	const bestCandidate = candidates.sort(
		(first, second) => second.contrast - first.contrast
	)[0];

	return bestCandidate?.color ?? fallback;
};

const createFallbackVars = (
	color: GColor | GGradienStates | undefined,
	effects: boolean,
	animations: boolean,
	morphOptions?: GradientMorphOptions
): CSSProperties =>
	({
		'--g-gradient-material-background': resolveGradientValue(color),
		'--g-gradient-material-color': resolveColorValue(color),
		'--g-gradient-material-foreground': resolveOnColorValue(color),
		'--g-gradient-material-shadow': effects ? DEFAULT_SHADOW : EMPTY_SHADOW,
		'--g-gradient-material-drop-shadow': EMPTY_FILTER,
		'--g-gradient-material-filter': EMPTY_FILTER,
		'--g-gradient-material-morph-blend-mode':
			morphOptions?.blendMode ?? DEFAULT_GRADIENT_MORPH_BLEND_MODE,
		'--g-gradient-material-animation': animations
			? 'var(--g-gradient-animation, none)'
			: EMPTY_ANIMATION,
		'--g-gradient-current': 'var(--g-gradient-material-background)',
		'--g-gradient-current-shadow': 'var(--g-gradient-material-shadow)',
		'--g-gradient-current-filter': 'var(--g-gradient-material-filter)',
		'--g-gradient-current-animation': 'var(--g-gradient-material-animation)'
	}) as CSSProperties;

const createMaterialVars = (
	material: CreatedGradientMaterial,
	effects: boolean,
	animations: boolean,
	color: GColor | GGradienStates | undefined,
	morphOptions?: GradientMorphOptions
): CSSProperties => {
	const shadow = material.effects?.boxShadow?.cssVar;
	const dropShadow = material.effects?.dropShadow?.cssVar;
	const morph = material.effects?.morph?.cssVar;
	const animation = material.animation?.cssVar;

	return {
		...material.cssVars,
		'--g-gradient-material-background': `var(${material.gradient.cssVar})`,
		'--g-gradient-material-color': resolveColorValue(color),
		'--g-gradient-material-foreground': getGradientForeground(
			material,
			resolveOnColorValue(color)
		),
		'--g-gradient-material-shadow':
			effects && shadow ? `var(${shadow})` : EMPTY_SHADOW,
		'--g-gradient-material-drop-shadow':
			effects && dropShadow ? `var(${dropShadow})` : EMPTY_FILTER,
		'--g-gradient-material-filter':
			effects && morph
				? `var(${morph})`
				: effects && dropShadow
					? `var(${dropShadow})`
					: EMPTY_FILTER,
		'--g-gradient-material-morph-blend-mode':
			effects && material.effects?.morph?.blendModeCssVar
				? `var(${material.effects.morph.blendModeCssVar})`
				: (morphOptions?.blendMode ??
					DEFAULT_GRADIENT_MORPH_BLEND_MODE),
		'--g-gradient-material-animation':
			animations && animation ? `var(${animation})` : EMPTY_ANIMATION,
		'--g-gradient-current': 'var(--g-gradient-material-background)',
		'--g-gradient-current-shadow': 'var(--g-gradient-material-shadow)',
		'--g-gradient-current-filter': 'var(--g-gradient-material-filter)',
		'--g-gradient-current-animation': 'var(--g-gradient-material-animation)'
	} as CSSProperties;
};

export const useGradientMaterial = (
	options: UseGradientMaterialOptions = {}
) => {
	const theme = useTheme();
	const kind = computed(() => toValue(options.kind) ?? 'surface');
	const effects = computed(() => Boolean(toValue(options.effects)));
	const animations = computed(() => Boolean(toValue(options.animations)));
	const resolvedColor = computed(() => toValue(options.color));
	const recipe = computed(() => toValue(options.recipe));
	const morph = computed(() => toValue(options.morph));
	const shouldGenerateMaterial = computed(() =>
		Boolean(
			effects.value ||
			animations.value ||
			recipe.value ||
			morph.value ||
			toValue(options.options)
		)
	);
	const materialSeed = computed(() =>
		resolveMaterialSeed(
			resolvedColor.value,
			theme?.seed.value ?? DEFAULT_SEED
		)
	);
	const material = computed<CreatedGradientMaterial | null>(() => {
		if (!shouldGenerateMaterial.value) return null;

		const seed = materialSeed.value;

		if (!seed) return null;

		return createGradientMaterial(seed, {
			...toValue(options.options),
			animation: toValue(options.animation),
			animations: animations.value,
			dropShadow: toValue(options.dropShadow),
			effects: effects.value,
			morph: morph.value,
			recipe: recipe.value ?? MATERIAL_RECIPE_BY_KIND[kind.value],
			shadow: toValue(options.shadow)
		});
	});
	const gradientMaterialStyles = computed<CSSProperties | undefined>(() => {
		const generatedMaterial = material.value;

		if (!generatedMaterial) {
			if (!shouldGenerateMaterial.value) return undefined;

			return createFallbackVars(
				resolvedColor.value,
				effects.value,
				animations.value,
				morph.value
			);
		}

		return createMaterialVars(
			generatedMaterial,
			effects.value,
			animations.value,
			resolvedColor.value,
			morph.value
		);
	});

	return {
		gradientMaterial: material,
		gradientMaterialStyles
	};
};
