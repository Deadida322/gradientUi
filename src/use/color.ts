import { propsFactory } from '@/utils/propsFactory';
import { camelToKebabCase } from '@/utils/camelToKebabCase';
import { MaterialSeeds } from '@/theme/colorSeeds';
import {
	computed,
	toValue,
	type CSSProperties,
	type MaybeRefOrGetter,
	type PropType
} from 'vue';

export type GColor = string;

export interface ColorProps {
	color?: MaybeRefOrGetter<GColor | undefined>;
}

const COLOR_ALIASES: Record<string, string> = {
	primary: 'var(--g-token-color-primary)',
	error: 'var(--g-token-color-error)',
	warning: 'var(--g-token-color-warning)',
	success: 'var(--g-token-color-success)',
	surface: 'var(--g-token-color-surface)',
	'on-surface': 'var(--g-token-color-on-surface)'
};

const ON_COLOR_ALIASES: Record<string, string> = {
	primary: 'var(--g-token-color-on-primary)',
	error: 'var(--g-token-color-on-error)',
	warning: 'var(--g-token-color-on-warning)',
	success: 'var(--g-token-color-on-success)',
	surface: 'var(--g-token-color-on-surface)'
};

const MATERIAL_COLOR_ALIASES = createMaterialColorAliases();

export const makeColorProps = propsFactory({
	color: {
		type: String as PropType<GColor>,
		default: 'primary'
	}
});

function resolveColor(color?: GColor) {
	if (!color) return COLOR_ALIASES.primary;

	return (
		COLOR_ALIASES[color] ?? MATERIAL_COLOR_ALIASES[color]?.color ?? color
	);
}

function resolveOnColor(color?: GColor) {
	if (!color) return ON_COLOR_ALIASES.primary;

	return (
		ON_COLOR_ALIASES[color] ??
		MATERIAL_COLOR_ALIASES[color]?.onColor ??
		ON_COLOR_ALIASES.primary
	);
}

function createMaterialColorAliases() {
	const aliases: Record<string, { color: string; onColor: string }> = {};

	addMaterialColorAliases(aliases, 'source');

	Object.keys(MaterialSeeds).forEach((colorName) => {
		addMaterialColorAliases(aliases, colorName);
	});

	return aliases;
}

function addMaterialColorAliases(
	aliases: Record<string, { color: string; onColor: string }>,
	colorName: string
) {
	const kebabColorName = camelToKebabCase(colorName);

	for (let tone = 10; tone <= 100; tone += 10) {
		const cssColor = `rgb(var(--g-color-${kebabColorName}-${tone}))`;
		const onColorTone = tone >= 60 ? 10 : 100;
		const onColor = `rgb(var(--g-color-${kebabColorName}-${onColorTone}))`;

		aliases[`${colorName}${tone}`] = {
			color: cssColor,
			onColor
		};
		aliases[`${kebabColorName}${tone}`] = {
			color: cssColor,
			onColor
		};
		aliases[`${kebabColorName}-${tone}`] = {
			color: cssColor,
			onColor
		};
	}

	aliases[colorName] = aliases[`${colorName}40`];
	aliases[kebabColorName] = aliases[`${kebabColorName}40`];
}

export function useColor(props: ColorProps) {
	const colorStyles = computed<CSSProperties>(() => {
		const color = toValue(props.color);

		return {
			'--g-color': resolveColor(color),
			'--g-on-color': resolveOnColor(color),
			'--g-surface-color': 'var(--g-token-color-surface)',
			'--g-on-surface-color': 'var(--g-token-color-on-surface)'
		} as CSSProperties;
	});

	return {
		colorStyles
	};
}
