import { makeRoundedProps, useRounded } from './rounded';
import { computed, type PropType, type ExtractPropTypes } from 'vue';
import { propsFactory } from '@/utils/propsFactory';
import type { StringeredNumber } from '@/types/CommonTypes';
import usePx from './px';
import { useDisabled } from './disabled';
import { makeDisabledProps } from './disabled';
import { makeVariantProps } from './variant';
import { makePlacementProps, usePlacement } from './placement';

export type GGradienStates = 'warning' | 'success' | 'error';
export type GBorderRadius = number | StringeredNumber;
export type GGlow = boolean | number | StringeredNumber;

export const makeGradientProps = propsFactory({
	active: Boolean,
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
	glow: [Boolean, Number, String] as PropType<GGlow>,
	animateGlow: Boolean,
	shadow: Boolean,
	state: String as PropType<GGradienStates>,
	inheritWidth: Boolean
});

type GGradientProps = ExtractPropTypes<ReturnType<typeof makeGradientProps>>;

export function useGradient(props: GGradientProps) {
	const borderWidthPx = computed(() => usePx(props.borderWidth));
	const borderRadiusPx = computed(() => usePx(props.borderRadius));
	const disabledClass = useDisabled(props, 'g-gradient');
	const placementClass = usePlacement(props, 'g-gradient');
	const roundedClasses = useRounded(props, 'g-gradient');
	const gradientClasses = computed(() => {
		return {
			[disabledClass.value]: true,
			[placementClass.value]: true,
			[roundedClasses.value]: true,
			'g-gradient_shadow': props.shadow,
			'g-gradient_active': props.active,
			'g-gradient_glow': props.glow,
			'g-gradient_animate-glow': props.animateGlow,
			'g-gradient_inherit-width': props.inheritWidth,
			[`g-gradient_${props.placement}`]: props.placement,
			[`g-gradient_${props.state}`]: props.state,
			[`g-gradient_border_${props.borderWidth}`]: true
		};
	});

	const gradientStyles = computed(() => ({
		'--g-border-radius': borderRadiusPx.value,
		'--g-border-width': borderWidthPx.value
	}));

	return {
		borderWidthPx,
		borderRadiusPx,
		gradientClasses,
		gradientStyles
	};
}
