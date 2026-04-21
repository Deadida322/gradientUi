import { MaterialSeeds } from '@/theme/colorSeeds';
import { camelToKebabCase } from '@/utils/camelToKebabCase';
import { computed, toValue, type MaybeRefOrGetter } from 'vue';

export type GColor = string;

interface ColorAlias {
	color: string;
	onColor: string;
	gradient: string;
}

const COLOR_ALIASES: Record<string, ColorAlias> = createColorAliases();

export function resolveColorValue(color?: GColor) {
	if (!color) return COLOR_ALIASES.primary.color;

	return COLOR_ALIASES[color]?.color ?? color;
}

export function resolveOnColorValue(color?: GColor) {
	if (!color) return COLOR_ALIASES.primary.onColor;

	return COLOR_ALIASES[color]?.onColor ?? COLOR_ALIASES.primary.onColor;
}

export function resolveGradientValue(color?: GColor) {
	if (!color) return COLOR_ALIASES.primary.gradient;

	return COLOR_ALIASES[color]?.gradient ?? `var(--g-gradient-${color})`;
}

export function useResolveGradientValue(
	color: MaybeRefOrGetter<GColor | undefined>
) {
	return computed(() => resolveGradientValue(toValue(color)));
}

function createColorAliases() {
	const aliases: Record<string, ColorAlias> = {
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
			gradient: 'var(--g-gradient-source-40)'
		},
		'on-surface': {
			color: 'var(--g-token-color-on-surface)',
			onColor: 'var(--g-token-color-surface)',
			gradient: 'var(--g-gradient-source-40)'
		},
		source: {
			color: 'rgb(var(--g-color-source-40))',
			onColor: 'rgb(var(--g-color-on-source-40))',
			gradient: 'var(--g-gradient-source-40)'
		}
	};

	addMaterialColorAliases(aliases, 'source');

	Object.keys(MaterialSeeds).forEach((colorName) => {
		addMaterialColorAliases(aliases, colorName);
	});

	return aliases;
}

function addMaterialColorAliases(
	aliases: Record<string, ColorAlias>,
	colorName: string
) {
	const kebabColorName = camelToKebabCase(colorName);

	for (let tone = 10; tone <= 100; tone += 10) {
		const alias = {
			color: `rgb(var(--g-color-${kebabColorName}-${tone}))`,
			onColor: `rgb(var(--g-color-on-${kebabColorName}-${tone}))`,
			gradient: `var(--g-gradient-${kebabColorName}-${tone})`
		};

		aliases[`${colorName}${tone}`] = alias;
		aliases[`${kebabColorName}${tone}`] = alias;
		aliases[`${kebabColorName}-${tone}`] = alias;
	}

	aliases[colorName] = aliases[`${colorName}40`];
	aliases[kebabColorName] = aliases[`${kebabColorName}40`];
}
