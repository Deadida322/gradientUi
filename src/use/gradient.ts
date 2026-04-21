import { makeRoundedProps, useRounded } from './rounded';
import { computed, toRef, type PropType, type ExtractPropTypes } from 'vue';
import { propsFactory } from '@/utils/propsFactory';
import type { StringeredNumber } from '@/types/CommonTypes';
import usePx from './px';
import { useDisabled } from './disabled';
import { makeDisabledProps } from './disabled';
import { makeVariantProps } from './variant';
import { makePlacementProps, usePlacement } from './placement';
import { makeGradientGlowProps } from './gradientGlow';
import { makeGradientSurfaceProps } from './gradientSurface';
import type { GColor } from './color';
import { MaterialSeeds } from '@/theme/colorSeeds';
import { camelToKebabCase } from '@/utils/camelToKebabCase';

export type GGradienStates = 'warning' | 'success' | 'error';
export type GBorderRadius = number | StringeredNumber;
export type GGlow = boolean | number | StringeredNumber;

export const makeGradientBorderProps = propsFactory({
	...makeDisabledProps(),
	...makeVariantProps(),
	...makeRoundedProps(),
	...makePlacementProps({
		placement: 'center'
	}),
	borderRadius: {
		type: [Number, String] as PropType<GBorderRadius>,
		default: 4
	},
	borderWidth: {
		type: [Number, String] as PropType<StringeredNumber>,
		default: 1
	},
	color: String as PropType<GColor>,
	state: String as PropType<GGradienStates>
});

export const makeGradientProps = propsFactory({
	...makeGradientBorderProps(),
	...makeGradientGlowProps(),
	...makeGradientSurfaceProps()
});

type GGradientProps = ExtractPropTypes<
	ReturnType<typeof makeGradientBorderProps> &
		ReturnType<typeof makeGradientSurfaceProps>
>;

const GRADIENT_ALIASES = createGradientAliases();

export function useGradient(props: GGradientProps) {
	const borderWidthPx = usePx(toRef(props, 'borderWidth'));
	const borderRadiusPx = usePx(toRef(props, 'borderRadius'));
	const containerBorderRadius = computed(() => {
		if (!borderWidthPx.value) {
			return borderRadiusPx.value;
		}

		return `calc(${borderRadiusPx.value} + ${borderWidthPx.value})`;
	});
	const disabledClass = useDisabled(props, 'g-gradient');
	const placementClass = usePlacement(props, 'g-gradient');
	const roundedClasses = useRounded(props, 'g-gradient');
	const gradientClasses = computed(() => {
		return {
			[disabledClass.value]: true,
			[placementClass.value]: true,
			[roundedClasses.value]: true,
			'g-gradient_inherit-width': props.inheritWidth,
			[`g-gradient_${props.placement}`]: props.placement,
			[`g-gradient_${props.state}`]: props.state,
			[`g-gradient_border_${props.borderWidth}`]: true
		};
	});

	const gradientStyles = computed(() => ({
		'--g-border-radius': borderRadiusPx.value,
		'--g-border-width': borderWidthPx.value,
		'--g-gradient-current': resolveGradient(props.color ?? props.state)
	}));

	return {
		borderWidthPx,
		borderRadiusPx,
		containerBorderRadius,
		gradientClasses,
		gradientStyles
	};
}

function resolveGradient(color?: GColor | GGradienStates) {
	if (!color) return 'var(--g-gradient-main)';

	return GRADIENT_ALIASES[color] ?? `var(--g-gradient-${color})`;
}

function createGradientAliases() {
	const aliases: Record<string, string> = {
		primary: 'var(--g-gradient-main)',
		main: 'var(--g-gradient-main)',
		error: 'var(--g-gradient-error)',
		warning: 'var(--g-gradient-warning)',
		success: 'var(--g-gradient-success)',
		source: 'var(--g-gradient-source-40)'
	};

	addGradientAliases(aliases, 'source');

	Object.keys(MaterialSeeds).forEach((colorName) => {
		addGradientAliases(aliases, colorName);
	});

	return aliases;
}

function addGradientAliases(
	aliases: Record<string, string>,
	colorName: string
) {
	const kebabColorName = camelToKebabCase(colorName);

	for (let tone = 10; tone <= 100; tone += 10) {
		const gradient = `var(--g-gradient-${kebabColorName}-${tone})`;

		aliases[`${colorName}${tone}`] = gradient;
		aliases[`${kebabColorName}${tone}`] = gradient;
		aliases[`${kebabColorName}-${tone}`] = gradient;
	}

	aliases[colorName] = aliases[`${colorName}40`];
	aliases[kebabColorName] = aliases[`${kebabColorName}40`];
}
