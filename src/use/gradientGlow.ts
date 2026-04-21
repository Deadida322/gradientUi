import { makeDisabledProps, useDisabled } from '@/use/disabled';
import { makeStateProps, useState } from '@/use/state';
import { propsFactory } from '@/utils/propsFactory';
import { computed, type ExtractPropTypes, type PropType } from 'vue';
import { type GGlow } from './gradient';

export const makeGradientGlowProps = propsFactory({
	active: Boolean,
	...makeDisabledProps(),
	glow: [Boolean, Number, String] as PropType<GGlow>,
	animateGlow: Boolean,
	shadow: Boolean,
	...makeStateProps()
});

type GGradientGlowProps = ExtractPropTypes<
	ReturnType<typeof makeGradientGlowProps>
>;

export function useGradientGlow(
	props: GGradientGlowProps,
	baseClass = 'g-gradient'
) {
	const disabledClass = useDisabled(props, baseClass);
	const stateClass = useState(props, baseClass);

	const glowClasses = computed(() => ({
		[disabledClass.value]: true,
		[stateClass.value]: true,
		[`${baseClass}_active`]: props.active,
		[`${baseClass}_glow`]: props.glow,
		[`${baseClass}_animate-glow`]: props.animateGlow,
		[`${baseClass}_shadow`]: props.shadow
	}));

	return {
		glowClasses
	};
}
