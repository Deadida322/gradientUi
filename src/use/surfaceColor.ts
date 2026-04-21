import {
	computed,
	type CSSProperties,
	type MaybeRefOrGetter,
	toValue
} from 'vue';
import { useColor, type GColor } from './color';
import { useResolveGradientValue } from './colorResolver';
import type { GGradienStates } from './gradient';

export interface SurfaceColorProps {
	color?: MaybeRefOrGetter<GColor | undefined>;
	state?: MaybeRefOrGetter<GGradienStates | undefined>;
	active?: MaybeRefOrGetter<boolean | undefined>;
	activeColor?: MaybeRefOrGetter<GColor | undefined>;
	activeState?: MaybeRefOrGetter<GGradienStates | undefined>;
}

export function useSurfaceColor(props: SurfaceColorProps) {
	const resolvedState = computed(() => {
		const activeState = toValue(props.activeState);

		if (toValue(props.active) && activeState !== undefined) {
			return activeState;
		}

		return toValue(props.state);
	});
	const resolvedColor = computed(() => {
		const state = resolvedState.value;

		if (state) {
			return state;
		}

		const activeColor = toValue(props.activeColor);

		if (toValue(props.active) && activeColor !== undefined) {
			return activeColor;
		}

		return toValue(props.color);
	});
	const { colorStyles } = useColor({ color: resolvedColor });
	const resolvedGradient = useResolveGradientValue(resolvedColor);
	const gradientStyles = computed<CSSProperties>(
		() =>
			({
				...colorStyles.value,
				'--g-gradient-current': resolvedGradient.value
			}) as CSSProperties
	);

	return {
		resolvedColor,
		resolvedState,
		resolvedGradient,
		colorStyles,
		surfaceColorStyles: colorStyles,
		gradientStyles
	};
}
