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
import { useSurfaceMaterial } from './surfaceMaterial';
import type {
	GradientAnimationOptions,
	GradientMorphOptions,
	GradientShadowOptions,
	GradientTokenRecipe
} from '@/theme';
import { useGlass } from './glass';

export interface ActionSurfaceProps extends SurfaceProps {
	size: Sizes;
	active?: boolean;
	activeColor?: GColor;
	activeState?: GGradienStates;
	activeVariant?: GVariant;
	gradientRecipe?: GradientTokenRecipe;
	morph?: boolean;
	shadowOptions?: GradientShadowOptions;
	dropShadowOptions?: GradientShadowOptions;
	animationOptions?: GradientAnimationOptions;
	morphOptions?: GradientMorphOptions;
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
	activeVariant: String as PropType<GVariant>,
	gradientRecipe: String as PropType<GradientTokenRecipe>,
	morph: Boolean,
	shadowOptions: Object as PropType<GradientShadowOptions>,
	dropShadowOptions: Object as PropType<GradientShadowOptions>,
	animationOptions: Object as PropType<GradientAnimationOptions>,
	morphOptions: Object as PropType<GradientMorphOptions>
});

export function useActionSurface(
	props: ActionSurfaceProps,
	baseClass: string,
	options: ActionSurfaceStateOptions = {}
) {
	const { disabledClass, roundedClass, stateClass, textureClass } =
		useSurface(props, baseClass);
	const { glassStyles } = useGlass(props);
	const {
		surfaceOverlayClasses,
		surfaceMaterialMorphBlobClasses,
		surfaceMaterialMorphClasses,
		surfaceTextureClasses,
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
	const hasMaterialSurface = computed(
		() => resolvedVariant.value === 'gradient'
	);
	const hasSurfaceUnderlay = computed(() =>
		Boolean(
			resolvedVariant.value === 'default' ||
			resolvedVariant.value === 'tonal' ||
			hasMaterialSurface.value
		)
	);
	const hasSurfaceOverlay = computed(() =>
		Boolean(
			!props.disabled ||
			isActive.value ||
			isSelected.value ||
			toValue(options.focused)
		)
	);
	const hasSurfaceTexture = computed(
		() => props.texture !== undefined && props.texture !== 'none'
	);
	const {
		getMorphBlobStyle,
		gradientMaterial,
		materialStyles: gradientMaterialStyles,
		morphBlobs,
		morphEnabled
	} = useSurfaceMaterial(props, {
		color: resolvedColor,
		variant: resolvedVariant,
		kind: 'action',
		morphScope: 'always'
	});
	const surfaceStyles = computed(() => [
		colorStyles.value,
		gradientMaterialStyles.value,
		resolvedVariant.value === 'glass' ? glassStyles.value : undefined
	]);
	const actionSurfaceClasses = computed(() => {
		const isFocused = Boolean(toValue(options.focused));
		const animationPreset = props.animationOptions?.preset;

		return [
			`${baseClass}_${resolvedVariant.value}`,
			disabledClass.value,
			roundedClass.value,
			stateClass.value,
			textureClass.value,
			sizeClass.value,
			isFocused ? `${baseClass}_focused` : '',
			isSelected.value ? `${baseClass}_selected` : '',
			isActive.value ? `${baseClass}_active` : '',
			animationPreset ? `${baseClass}_animation-${animationPreset}` : ''
		].filter(Boolean);
	});

	return {
		actionSurfaceClasses,
		getMorphBlobStyle,
		gradientMaterial,
		hasSurfaceOverlay,
		hasSurfaceTexture,
		hasSurfaceUnderlay,
		morphBlobs,
		morphEnabled,
		resolvedColor,
		resolvedState,
		resolvedVariant,
		surfaceStyles,
		surfaceMaterialMorphBlobClasses,
		surfaceMaterialMorphClasses,
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceTextureClasses,
		surfaceContentClasses
	};
}
