import type { Sizes } from '@/types/CommonTypes';
import { makeSizeProps, useSize } from '@/use/size';
import { propsFactory } from '@/utils/propsFactory';
import { computed, toValue, type MaybeRefOrGetter, type PropType } from 'vue';
import {
	makeSurfaceProps,
	useSurface,
	useSurfaceLayers,
	type SurfaceProps
} from './surface';
import { type GVariant } from './variant';

export interface ActionSurfaceProps extends SurfaceProps {
	size: Sizes;
	active?: boolean;
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
	activeVariant: String as PropType<GVariant>
});

export function useActionSurface(
	props: ActionSurfaceProps,
	baseClass: string,
	options: ActionSurfaceStateOptions = {}
) {
	const { disabledClass, roundedClass, stateClass, surfaceStyles } =
		useSurface(props, baseClass);
	const {
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceContentClasses
	} = useSurfaceLayers(baseClass);
	const sizeClass = useSize(props, baseClass);

	const actionSurfaceClasses = computed(() => {
		const isFocused = Boolean(toValue(options.focused));
		const isSelected = Boolean(toValue(options.selected));
		const isActive = Boolean(toValue(options.active) ?? props.active);
		const resolvedVariant =
			(isSelected || isActive) && props.activeVariant
				? props.activeVariant
				: props.variant;

		return [
			`${baseClass}_${resolvedVariant}`,
			disabledClass.value,
			roundedClass.value,
			stateClass.value,
			sizeClass.value,
			isFocused ? `${baseClass}_focused` : '',
			isSelected ? `${baseClass}_selected` : '',
			isActive ? `${baseClass}_active` : ''
		].filter(Boolean);
	});

	return {
		actionSurfaceClasses,
		surfaceStyles,
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceContentClasses
	};
}
