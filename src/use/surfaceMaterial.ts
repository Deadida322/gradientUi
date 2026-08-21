import type {
	GradientAnimationOptions,
	GradientMorphOptions,
	GradientShadowOptions,
	GradientTokenRecipe
} from '@/theme';
import type { GGradienStates } from '@/components/ui/GGradient/types';
import type { GColor } from './color';
import { computed, toValue, type MaybeRefOrGetter } from 'vue';
import { useMaterial, type UseMaterialOptions } from './material';
import type { GradientMaterialKind } from './gradientMaterial';

export interface SurfaceMaterialProps {
	gradientRecipe?: MaybeRefOrGetter<GradientTokenRecipe | undefined>;
	shadow?: MaybeRefOrGetter<boolean | undefined>;
	dropShadow?: MaybeRefOrGetter<boolean | undefined>;
	morph?: MaybeRefOrGetter<boolean | undefined>;
	shadowOptions?: MaybeRefOrGetter<GradientShadowOptions | undefined>;
	dropShadowOptions?: MaybeRefOrGetter<GradientShadowOptions | undefined>;
	animationOptions?: MaybeRefOrGetter<GradientAnimationOptions | undefined>;
	morphOptions?: MaybeRefOrGetter<GradientMorphOptions | undefined>;
}

export interface UseSurfaceMaterialOptions {
	baseClass?: string;
	color?: MaybeRefOrGetter<GColor | GGradienStates | undefined>;
	state?: MaybeRefOrGetter<GGradienStates | undefined>;
	kind?: MaybeRefOrGetter<GradientMaterialKind | undefined>;
	variant?: MaybeRefOrGetter<string | undefined>;
	morphScope?: 'always' | 'gradient';
	options?: UseMaterialOptions['options'];
}

export const useSurfaceMaterial = (
	props: SurfaceMaterialProps,
	options: UseSurfaceMaterialOptions
) => {
	const hasMaterialSurface = computed(
		() => toValue(options.variant) === 'gradient'
	);
	const rawMorph = computed(
		() => toValue(props.morphOptions) ?? toValue(props.morph)
	);
	const resolvedMorph = computed(() => {
		if (options.morphScope === 'always') return rawMorph.value;

		return hasMaterialSurface.value ? rawMorph.value : false;
	});
	const hasMorph = computed(() => Boolean(resolvedMorph.value));
	const hasMaterialEffects = computed(() =>
		Boolean(
			hasMaterialSurface.value ||
			toValue(props.shadow) ||
			toValue(props.dropShadow) ||
			toValue(props.shadowOptions) ||
			toValue(props.dropShadowOptions) ||
			hasMorph.value
		)
	);
	const hasMaterialAnimations = computed(() =>
		Boolean(hasMaterialSurface.value && toValue(props.animationOptions))
	);
	const shouldUseRecipe = computed(
		() => hasMaterialSurface.value || hasMorph.value
	);
	const material = useMaterial({
		baseClass: options.baseClass,
		color: options.color,
		state: options.state,
		kind: options.kind,
		recipe: () =>
			shouldUseRecipe.value ? toValue(props.gradientRecipe) : undefined,
		effects: hasMaterialEffects,
		animations: hasMaterialAnimations,
		shadow: () => toValue(props.shadowOptions),
		dropShadow: () => toValue(props.dropShadowOptions),
		animation: () =>
			hasMaterialSurface.value
				? toValue(props.animationOptions)
				: undefined,
		morph: resolvedMorph,
		options: options.options
	});

	return {
		...material,
		hasMaterialAnimations,
		hasMaterialEffects,
		hasMaterialSurface,
		hasMorph,
		resolvedMorph
	};
};
