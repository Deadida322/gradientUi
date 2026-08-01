import type { GGradienStates } from '@/components/ui/GGradient/types';
import type {
	GradientAnimationOptions,
	GradientMorphOptions,
	GradientShadowOptions,
	GradientTokenRecipe
} from '@/theme';
import { computed, type CSSProperties } from 'vue';
import type { GColor } from './color';
import { makeGlassProps, useGlass, type GlassProps } from './glass';
import { makeGradientProps, type GGlow } from './gradient';
import type { Placement, StringeredNumber } from '@/types/CommonTypes';
import {
	makeMaterialProps,
	useMaterial,
	type UseMaterialOptions
} from './material';
import { useSurfaceLayers } from './surface';
import { useSurfaceColor } from './surfaceColor';
import { propsFactory } from '@/utils/propsFactory';

export interface MaterialSurfaceProps extends GlassProps {
	variant?: string;
	color?: GColor;
	state?: GGradienStates;
	gradientRecipe?: GradientTokenRecipe;
	shadow?: boolean;
	dropShadow?: boolean;
	morph?: boolean;
	animationOptions?: GradientAnimationOptions;
	shadowOptions?: GradientShadowOptions;
	dropShadowOptions?: GradientShadowOptions;
	morphOptions?: GradientMorphOptions;
	borderWidth?: StringeredNumber;
	borderRadius?: StringeredNumber;
	placement?: Placement;
	rounded?: boolean;
	glow?: GGlow;
	animateGlow?: boolean;
}

export const makeMaterialSurfaceProps = propsFactory({
	...makeMaterialProps(),
	...makeGlassProps(),
	...makeGradientProps({
		borderWidth: undefined,
		borderRadius: undefined,
		interactive: false
	})
});

export const useMaterialSurface = (
	props: MaterialSurfaceProps,
	baseClass: string,
	options: Pick<UseMaterialOptions, 'kind'> = {}
) => {
	const { colorStyles, resolvedColor, resolvedState } =
		useSurfaceColor(props);
	const { glassStyles } = useGlass(props);
	const material = useMaterial({
		baseClass,
		color: resolvedColor,
		state: resolvedState,
		kind: options.kind ?? 'surface',
		recipe: () => props.gradientRecipe,
		effects: () =>
			Boolean(
				props.variant === 'gradient' ||
				props.shadow ||
				props.dropShadow ||
				props.shadowOptions ||
				props.dropShadowOptions ||
				props.morph ||
				props.morphOptions
			),
		animations: () => Boolean(props.animationOptions),
		shadow: () => props.shadowOptions,
		dropShadow: () => props.dropShadowOptions,
		animation: () => props.animationOptions,
		morph: () => props.morphOptions ?? props.morph
	});
	const surfaceStyles = computed<CSSProperties>(() => ({
		...colorStyles.value,
		...material.materialStyles.value,
		...glassStyles.value
	}));
	const materialFrameProps = computed(() => ({
		animateGlow: props.animateGlow,
		borderRadius: props.borderRadius,
		borderWidth:
			props.borderWidth ??
			(props.glow ||
			props.animateGlow ||
			props.variant === 'outlined' ||
			props.variant === 'glass'
				? 1
				: 0),
		color: resolvedColor.value,
		glow: props.glow,
		gradientRecipe: props.gradientRecipe,
		inheritWidth: true,
		interactive: false,
		placement: props.placement,
		rounded: false,
		// The material owns elevation; the frame only owns the real border/glow.
		shadow: false,
		state: resolvedState.value,
		surfaceFill: 'transparent' as const
	}));

	return {
		...material,
		...useSurfaceLayers(baseClass),
		resolvedColor,
		resolvedState,
		materialFrameProps,
		surfaceStyles
	};
};
