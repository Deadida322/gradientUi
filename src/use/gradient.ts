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
import { useResolveGradientValue } from './colorResolver';
import {
	useGradientMaterial,
	type GradientMaterialKind
} from './gradientMaterial';
import type { GradientTokenRecipe } from '@/theme';

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
	state: String as PropType<GGradienStates>,
	materialKind: {
		type: String as PropType<GradientMaterialKind>,
		default: 'action'
	},
	gradientRecipe: String as PropType<GradientTokenRecipe>
});

export const makeGradientProps = propsFactory({
	...makeGradientBorderProps(),
	...makeGradientGlowProps(),
	...makeGradientSurfaceProps()
});

type GGradientProps = ExtractPropTypes<ReturnType<typeof makeGradientProps>>;

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
	const resolvedGradient = useResolveGradientValue(
		() => props.color ?? props.state
	);
	const hasBorder = computed(
		() => Number.parseFloat(String(props.borderWidth)) > 0
	);
	const { gradientMaterial, gradientMaterialStyles } = useGradientMaterial({
		color: () => props.color ?? props.state,
		kind: () => props.materialKind,
		recipe: () => (hasBorder.value ? props.gradientRecipe : undefined),
		options: () => (hasBorder.value ? {} : undefined)
	});
	const gradientClasses = computed(() => {
		return {
			[disabledClass.value]: true,
			[placementClass.value]: true,
			[roundedClasses.value]: true,
			'g-gradient_inherit-width': props.inheritWidth,
			[`g-gradient_${props.state}`]: props.state
		};
	});

	const gradientBoxStyles = computed(() => ({
		'--g-border-radius': borderRadiusPx.value,
		'--g-border-width': borderWidthPx.value
	}));
	const gradientStyles = computed(() => [
		hasBorder.value && gradientMaterialStyles.value
			? gradientMaterialStyles.value
			: { '--g-gradient-current': resolvedGradient.value },
		gradientBoxStyles.value
	]);

	return {
		borderWidthPx,
		borderRadiusPx,
		containerBorderRadius,
		gradientMaterial,
		resolvedGradient,
		gradientClasses,
		gradientStyles
	};
}
