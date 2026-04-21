import type { Sizes } from '@/types/CommonTypes';
import type { GGradienStates } from '@/components/ui/GGradient/types';
import { makeSizeProps, useSize } from '@/use/size';
import { propsFactory } from '@/utils/propsFactory';
import { computed, toValue, type MaybeRefOrGetter, type PropType } from 'vue';
import {
	makeSurfaceProps,
	useSurface,
	useSurfaceLayers,
	type SurfaceProps
} from './surface';
import { useSurfaceColor } from './surfaceColor';
import type { GColor } from './color';
import { type GVariant } from './variant';

export interface ActionSurfaceProps extends SurfaceProps {
	size: Sizes;
	active?: boolean;
	activeColor?: GColor;
	activeState?: GGradienStates;
	activeVariant?: GVariant;
}

export interface ActionSurfaceStateOptions {
	focused?: MaybeRefOrGetter<boolean | undefined>;
	selected?: MaybeRefOrGetter<boolean | undefined>;
	active?: MaybeRefOrGetter<boolean | undefined>;
}

export const makeActionSurfaceProps = propsFactory({
	...makeSurfaceProps(),
	...makeSizeProps(),
	active: Boolean,
	activeColor: String as PropType<GColor>,
	activeState: String as PropType<GGradienStates>,
	activeVariant: String as PropType<GVariant>
});

export function useActionSurface(
	props: ActionSurfaceProps,
	baseClass: string,
	options: ActionSurfaceStateOptions = {}
) {
	const { disabledClass, roundedClass, stateClass } = useSurface(
		props,
		baseClass
	);
	const {
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceContentClasses
	} = useSurfaceLayers(baseClass);
	const sizeClass = useSize(props, baseClass);
	const isActive = computed(() =>
		Boolean(toValue(options.active) ?? props.active)
	);
	const isSelected = computed(() => Boolean(toValue(options.selected)));
	const { resolvedColor, resolvedState, colorStyles } = useSurfaceColor({
		color: () => toValue(props.color),
		state: () => props.state,
		active: () => isActive.value || isSelected.value,
		activeColor: () => toValue(props.activeColor),
		activeState: () => props.activeState
	});
	const resolvedVariant = computed(() =>
		(isSelected.value || isActive.value) && props.activeVariant
			? props.activeVariant
			: props.variant
	);
	const actionSurfaceClasses = computed(() => {
		const isFocused = Boolean(toValue(options.focused));

		return [
			`${baseClass}_${resolvedVariant.value}`,
			disabledClass.value,
			roundedClass.value,
			stateClass.value,
			sizeClass.value,
			isFocused ? `${baseClass}_focused` : '',
			isSelected.value ? `${baseClass}_selected` : '',
			isActive.value ? `${baseClass}_active` : ''
		].filter(Boolean);
	});

	return {
		actionSurfaceClasses,
		resolvedColor,
		resolvedState,
		resolvedVariant,
		surfaceStyles: colorStyles,
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceContentClasses
	};
}
