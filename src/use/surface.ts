import type { GGradienStates } from '@/components/ui/GGradient/types';
import { makeColorProps, type ColorProps } from '@/use/color';
import { makeDisabledProps, useDisabled } from '@/use/disabled';
import { makeRoundedProps, useRounded } from '@/use/rounded';
import { makeStateProps, useState } from '@/use/state';
import { useSurfaceColor } from '@/use/surfaceColor';
import { propsFactory } from '@/utils/propsFactory';
import { computed } from 'vue';
import { makeVariantProps, useVariant, type GVariant } from './variant';

export interface SurfaceProps extends ColorProps {
	variant: GVariant;
	disabled: boolean;
	rounded?: boolean;
	state?: GGradienStates;
}

export const makeSurfaceProps = propsFactory({
	...makeVariantProps(),
	...makeColorProps(),
	...makeDisabledProps(),
	...makeRoundedProps(),
	...makeStateProps()
});

export function useSurface(props: SurfaceProps, baseClass: string) {
	const variantClass = useVariant(props, baseClass);
	const disabledClass = useDisabled(props, baseClass);
	const roundedClass = useRounded(props, baseClass);
	const stateClass = useState(props, baseClass);
	const { colorStyles } = useSurfaceColor(props);

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
		surfaceStyles: colorStyles,
		surfaceClasses
	};
}

export function useSurfaceUnderlay(baseClass: string) {
	const surfaceUnderlayClasses = computed(() => [
		`${baseClass}__surface-underlay`
	]);

	return {
		surfaceUnderlayClasses
	};
}

export function useSurfaceOverlay(baseClass: string) {
	const surfaceOverlayClasses = computed(() => [
		`${baseClass}__surface-overlay`
	]);

	return {
		surfaceOverlayClasses
	};
}

export function useSurfaceContent(baseClass: string) {
	const surfaceContentClasses = computed(() => [
		`${baseClass}__surface-content`
	]);

	return {
		surfaceContentClasses
	};
}

export function useSurfaceLayers(baseClass: string) {
	return {
		...useSurfaceUnderlay(baseClass),
		...useSurfaceOverlay(baseClass),
		...useSurfaceContent(baseClass)
	};
}
