import type { GGradienStates } from '@/components/ui/GGradient/types';
import { makeColorProps, type ColorProps } from '@/use/color';
import { makeDisabledProps, useDisabled } from '@/use/disabled';
import { makeRoundedProps, useRounded } from '@/use/rounded';
import { makeStateProps, useState } from '@/use/state';
import { useSurfaceColor } from '@/use/surfaceColor';
import { propsFactory } from '@/utils/propsFactory';
import { computed } from 'vue';
import { makeVariantProps, useVariant, type GVariant } from './variant';
import type { PropType } from 'vue';
import { makeGlassProps, type GlassProps } from './glass';

export type GSurfaceTexture = 'none' | 'noise';

export interface SurfaceProps extends ColorProps, GlassProps {
	variant: GVariant;
	disabled: boolean;
	rounded?: boolean;
	state?: GGradienStates;
	texture?: GSurfaceTexture;
}

export const makeSurfaceTextureProps = propsFactory({
	texture: {
		type: String as PropType<GSurfaceTexture>,
		default: 'none'
	}
});

export const makeSurfaceProps = propsFactory({
	...makeVariantProps(),
	...makeColorProps(),
	...makeDisabledProps(),
	...makeRoundedProps(),
	...makeStateProps(),
	...makeGlassProps(),
	...makeSurfaceTextureProps()
});

export function useSurface(props: SurfaceProps, baseClass: string) {
	const variantClass = useVariant(props, baseClass);
	const disabledClass = useDisabled(props, baseClass);
	const roundedClass = useRounded(props, baseClass);
	const stateClass = useState(props, baseClass);
	const textureClass = computed(() =>
		props.texture && props.texture !== 'none'
			? `${baseClass}_texture-${props.texture}`
			: ''
	);
	const { colorStyles } = useSurfaceColor(props);

	const surfaceClasses = computed(() =>
		[
			variantClass.value,
			disabledClass.value,
			roundedClass.value,
			stateClass.value,
			textureClass.value
		].filter(Boolean)
	);

	return {
		variantClass,
		disabledClass,
		roundedClass,
		stateClass,
		textureClass,
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

export function useSurfaceTexture(baseClass: string) {
	const surfaceTextureClasses = computed(() => [
		`${baseClass}__surface-texture`
	]);

	return {
		surfaceTextureClasses
	};
}

export function useSurfaceMaterial(baseClass: string) {
	const surfaceMaterialMorphClasses = computed(() => [
		`${baseClass}__surface-material-morph`
	]);
	const surfaceMaterialMorphBlobClasses = computed(() => [
		`${baseClass}__surface-material-morph-blob`
	]);

	return {
		surfaceMaterialMorphBlobClasses,
		surfaceMaterialMorphClasses
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
		...useSurfaceMaterial(baseClass),
		...useSurfaceUnderlay(baseClass),
		...useSurfaceOverlay(baseClass),
		...useSurfaceTexture(baseClass),
		...useSurfaceContent(baseClass)
	};
}
