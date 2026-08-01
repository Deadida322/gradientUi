import type { GGradienStates } from '@/components/ui/GGradient/types';
import type { PXtype, StringeredNumber } from '@/types/CommonTypes';
import type {
	GradientAnimationOptions,
	GradientMorphBlob,
	GradientMorphOptions,
	GradientShadowOptions,
	GradientTokenRecipe
} from '@/theme';
import type { GColor } from '@/use/color';
import { propsFactory } from '@/utils/propsFactory';
import {
	computed,
	toValue,
	type CSSProperties,
	type MaybeRefOrGetter,
	type PropType
} from 'vue';
import {
	useGradientMaterial,
	type GradientMaterialKind
} from './gradientMaterial';
import { useGradientRuntime } from './gradientRuntime';

export const useMaterialLayers = (baseClass = 'g-material') => {
	const materialGlowClasses = computed(() => [`${baseClass}__material-glow`]);
	const materialGlowBaseClasses = computed(() => [
		`${baseClass}__material-glow-base`
	]);
	const materialGlowMorphClasses = computed(() => [
		`${baseClass}__material-glow-morph`
	]);
	const materialGlowMorphBlobClasses = computed(() => [
		`${baseClass}__material-glow-morph-blob`
	]);
	const materialMorphClasses = computed(() => [
		`${baseClass}__material-morph`
	]);
	const materialMorphBlobClasses = computed(() => [
		`${baseClass}__material-morph-blob`
	]);
	const materialContentClasses = computed(() => [
		`${baseClass}__material-content`
	]);

	return {
		materialContentClasses,
		materialGlowBaseClasses,
		materialGlowClasses,
		materialGlowMorphBlobClasses,
		materialGlowMorphClasses,
		materialMorphBlobClasses,
		materialMorphClasses
	};
};

export interface UseMaterialOptions {
	baseClass?: string;
	color?: MaybeRefOrGetter<GColor | GGradienStates | undefined>;
	state?: MaybeRefOrGetter<GGradienStates | undefined>;
	kind?: MaybeRefOrGetter<GradientMaterialKind | undefined>;
	recipe?: MaybeRefOrGetter<GradientTokenRecipe | undefined>;
	effects?: MaybeRefOrGetter<boolean | undefined>;
	animations?: MaybeRefOrGetter<boolean | undefined>;
	shadow?: MaybeRefOrGetter<GradientShadowOptions | undefined>;
	dropShadow?: MaybeRefOrGetter<GradientShadowOptions | undefined>;
	animation?: MaybeRefOrGetter<GradientAnimationOptions | undefined>;
	morph?: MaybeRefOrGetter<boolean | GradientMorphOptions | undefined>;
	borderRadius?: MaybeRefOrGetter<StringeredNumber | undefined>;
	padding?: MaybeRefOrGetter<StringeredNumber | undefined>;
}

export const makeMaterialProps = propsFactory({
	materialKind: {
		type: String as PropType<GradientMaterialKind>,
		default: 'surface'
	},
	gradientRecipe: String as PropType<GradientTokenRecipe>,
	borderRadius: {
		type: [Number, String] as PropType<StringeredNumber>,
		default: 8
	},
	padding: {
		type: [Number, String] as PropType<StringeredNumber>,
		default: 0
	},
	shadow: Boolean,
	dropShadow: Boolean,
	morph: Boolean,
	animationOptions: Object as PropType<GradientAnimationOptions>,
	shadowOptions: Object as PropType<GradientShadowOptions>,
	dropShadowOptions: Object as PropType<GradientShadowOptions>,
	morphOptions: Object as PropType<GradientMorphOptions>
});

const toDuration = (duration: GradientMorphBlob['duration']) =>
	typeof duration === 'number' ? `${duration}ms` : duration;

const getMorphBlobStyle = (blob: GradientMorphBlob): CSSProperties =>
	({
		'--g-gradient-morph-blob-color': blob.color,
		'--g-gradient-morph-x': `${blob.dx}%`,
		'--g-gradient-morph-x2': `${blob.dx2}%`,
		'--g-gradient-morph-y': `${blob.dy}%`,
		'--g-gradient-morph-y2': `${blob.dy2}%`,
		'--g-gradient-morph-origin-x': blob.originX,
		'--g-gradient-morph-origin-y': blob.originY,
		'--g-gradient-morph-animation': blob.animationName,
		'--g-gradient-morph-blur': `${blob.blur}px`,
		'--g-gradient-morph-opacity': blob.opacity,
		'--g-gradient-morph-rotate-mid': `${blob.rotateMid}deg`,
		'--g-gradient-morph-rotate-to': `${blob.rotateTo}deg`,
		'--g-gradient-morph-scale-mid': blob.scaleMid,
		'--g-gradient-morph-scale': blob.scaleTo,
		animationDelay: `${blob.delay}ms`,
		animationDuration: toDuration(blob.duration),
		left: `${blob.x}%`,
		top: `${blob.y}%`,
		width: `${blob.size}%`
	}) as CSSProperties;

const resolveMorphOptions = (
	morph: boolean | GradientMorphOptions | undefined
) => {
	if (typeof morph === 'object') return morph;

	return morph ? {} : undefined;
};

const toPx = (value: PXtype | undefined) => {
	if (value === null || value === undefined) return '';
	if (typeof value === 'number') return `${value}px`;

	return /^\d+(\.\d+)?$/.test(value) ? `${value}px` : value;
};

export const useMaterial = (options: UseMaterialOptions = {}) => {
	const baseClass = computed(() => options.baseClass ?? 'g-material');
	const {
		materialContentClasses,
		materialGlowBaseClasses,
		materialGlowClasses,
		materialGlowMorphBlobClasses,
		materialGlowMorphClasses,
		materialMorphBlobClasses,
		materialMorphClasses
	} = useMaterialLayers(baseClass.value);
	const borderRadius = computed(() => toPx(toValue(options.borderRadius)));
	const padding = computed(() => toPx(toValue(options.padding)));
	const morphOptions = computed(() =>
		resolveMorphOptions(toValue(options.morph))
	);
	const hasMorph = computed(() => Boolean(morphOptions.value));
	const hasEffects = computed(() =>
		Boolean(
			toValue(options.effects) ||
			toValue(options.shadow) ||
			toValue(options.dropShadow) ||
			hasMorph.value
		)
	);
	const hasAnimations = computed(() => Boolean(toValue(options.animations)));
	const { gradientMaterial, gradientMaterialStyles } = useGradientMaterial({
		color: () => toValue(options.color) ?? toValue(options.state),
		kind: () => toValue(options.kind),
		recipe: () => toValue(options.recipe),
		effects: hasEffects,
		animations: hasAnimations,
		shadow: () => toValue(options.shadow),
		dropShadow: () => toValue(options.dropShadow),
		animation: () => toValue(options.animation),
		morph: morphOptions
	});
	const { morphBlobs, morphEnabled } = useGradientRuntime({
		enabled: () => Boolean(hasAnimations.value || hasMorph.value),
		material: gradientMaterial,
		morph: hasMorph
	});
	const materialClasses = computed(() => [`${baseClass.value}_surface`]);
	const materialStyles = computed<CSSProperties>(() => ({
		...gradientMaterialStyles.value,
		'--g-gradient-material-radius': borderRadius.value,
		'--g-gradient-material-padding': padding.value
	}));

	return {
		getMorphBlobStyle,
		gradientMaterial,
		materialClasses,
		materialContentClasses,
		materialGlowBaseClasses,
		materialGlowClasses,
		materialGlowMorphBlobClasses,
		materialGlowMorphClasses,
		materialMorphBlobClasses,
		materialMorphClasses,
		materialStyles,
		morphBlobs,
		morphEnabled
	};
};
