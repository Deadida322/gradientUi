import type { MdiIcon, Sizes } from '@/types/CommonTypes';
import type { GGradienStates } from '../GGradient/types';
import type { ValidationRule } from 'gib-validate';
import { makeCheckFieldProps } from '@/use/check';
import { makeColorProps, type GColor } from '@/use/color';
import { makeRoundedProps } from '@/use/rounded';
import { makeSurfaceTextureProps, type GSurfaceTexture } from '@/use/surface';
import { propsFactory } from '@/utils/propsFactory';
import { makeVariantProps, type GVariant } from '@/use/variant';
import type { PropType } from 'vue';
import { makeGlassProps, type GlassProps } from '@/use/glass';
import { makeGradientProps } from '@/use/gradient';
import { makeMaterialProps } from '@/use/material';

export interface GToggleButtonProps extends GlassProps {
	id?: string;
	label?: string;
	message?: string;
	disabled?: boolean;
	size?: Sizes;
	state?: GGradienStates;
	activeColor?: GColor;
	activeState?: GGradienStates;
	activeVariant?: GVariant;
	inline?: boolean;
	color?: GColor;
	variant?: GVariant;
	rounded?: boolean;
	texture?: GSurfaceTexture;
	prepend?: MdiIcon;
	append?: MdiIcon;
	rules?: ValidationRule<boolean>[];
}

export interface GToggleButtonSlots {
	default?: () => unknown;
	prepend?: () => unknown;
	append?: () => unknown;
	message?: () => unknown;
}

export const makeToggleButtonProps = propsFactory({
	...makeMaterialProps(),
	...makeGradientProps({
		borderWidth: undefined
	}),
	...makeCheckFieldProps({
		disabled: false,
		size: 'm',
		inline: false
	}),
	...makeColorProps(),
	...makeVariantProps(),
	...makeRoundedProps(),
	...makeSurfaceTextureProps(),
	...makeGlassProps(),
	activeColor: String as PropType<GColor>,
	activeState: String as PropType<GGradienStates>,
	activeVariant: String as PropType<GVariant>,
	prepend: String as PropType<MdiIcon>,
	append: String as PropType<MdiIcon>,
	rules: {
		type: Array as PropType<ValidationRule<boolean>[]>,
		default: () => []
	}
});
