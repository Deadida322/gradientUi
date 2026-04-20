import type { GGradienStates } from '@/components/ui/GGradient/types';
import { makeDisabledProps, useDisabled } from '@/use/disabled';
import { makeRoundedProps, useRounded } from '@/use/rounded';
import { makeStateProps, useState } from '@/use/state';
import { propsFactory } from '@/utils/propsFactory';
import { computed } from 'vue';
import { makeVariantProps, useVariant, type GVariant } from './variant';

export interface SurfaceProps {
	variant: GVariant;
	disabled: boolean;
	rounded?: boolean;
	state?: GGradienStates;
}

export const makeSurfaceProps = propsFactory({
	...makeVariantProps(),
	...makeDisabledProps(),
	...makeRoundedProps(),
	...makeStateProps()
});

export function useSurface(props: SurfaceProps, baseClass: string) {
	const variantClass = useVariant(props, baseClass);
	const disabledClass = useDisabled(props, baseClass);
	const roundedClass = useRounded(props, baseClass);
	const stateClass = useState(props, baseClass);

	const surfaceClasses = computed(() =>
		[
			variantClass.value,
			disabledClass.value,
			roundedClass.value,
			stateClass.value
		].filter(Boolean)
	);

	return {
		variantClass,
		disabledClass,
		roundedClass,
		stateClass,
		surfaceClasses
	};
}
