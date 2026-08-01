import type { Placement, StringeredNumber } from '@/types/CommonTypes';
import type {
	GradientAnimationOptions,
	GradientMorphOptions,
	GradientShadowOptions,
	GradientTokenRecipe
} from '@/theme';
import type { GradientMaterialKind } from '@/use/gradientMaterial';
import type { GColor } from '@/use/color';
import type { GGradienStates } from '@/components/ui/GGradient/types';
import { propsFactory } from '@/utils/propsFactory';
import type { ExtractPropTypes, PropType } from 'vue';
import type { GGlow } from '@/use/gradient';
import { makeGlassProps } from '@/use/glass';

export type GGradientMaterialVariant = 'gradient' | 'outlined' | 'glass';

export const makeGradientMaterialProps = propsFactory({
	...makeGlassProps(),
	tag: {
		type: String,
		default: 'div'
	},
	variant: {
		type: String as PropType<GGradientMaterialVariant>,
		default: 'gradient'
	},
	color: String as PropType<GColor | GGradienStates>,
	state: String as PropType<GGradienStates>,
	kind: {
		type: String as PropType<GradientMaterialKind>,
		default: 'surface'
	},
	gradientRecipe: String as PropType<GradientTokenRecipe>,
	borderRadius: {
		type: [Number, String] as PropType<StringeredNumber>,
		default: 8
	},
	borderWidth: [Number, String] as PropType<StringeredNumber>,
	placement: {
		type: String as PropType<Placement>,
		default: 'center'
	},
	rounded: Boolean,
	glow: [Boolean, Number, String] as PropType<GGlow>,
	animateGlow: Boolean,
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

export type GGradientMaterialProps = ExtractPropTypes<
	ReturnType<typeof makeGradientMaterialProps>
>;
