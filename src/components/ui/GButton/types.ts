import type { MdiIcon, Sizes } from '@/types/CommonTypes';
import type { RippleBindingValue } from '@/directives';
import { makeActionSurfaceProps } from '@/use/actionSurface';
import { makeGradientProps } from '@/use/gradient';
import { makePLAProps } from '@/use/PLA';
import { makeTagNameProps } from '@/use/tagName';
import { propsFactory } from '@/utils/propsFactory';
import type { GGradienStates } from '../GGradient/types';
import type { PropType } from 'vue';

export interface GButtonProps {
	variant?: GButtonVariants;
	active?: boolean;
	rounded?: boolean;
	color?: string;
	iconButton?: MdiIcon;
	prepend?: MdiIcon;
	append?: MdiIcon;
	label?: string;
	tag?: string;
	href?: string;
	target?: string;
	rel?: string;
	disabled?: boolean;
	size?: Sizes;
	state?: GGradienStates;
	activeColor?: string;
	activeState?: GGradienStates;
	activeVariant?: GButtonVariants;
	isIconButton?: boolean;
	ripple?: RippleBindingValue;
}

export type GButtonVariants =
	| 'filled'
	| 'tonal'
	| 'text'
	| 'outlined'
	| 'default';

export const makeButtonProps = propsFactory({
	...makeActionSurfaceProps(),
	...makePLAProps(),
	...makeGradientProps(),
	...makeTagNameProps(),
	isIconButton: Boolean as PropType<boolean>,
	iconButton: String as PropType<MdiIcon>,
	ripple: {
		type: [Boolean, String, Object] as PropType<RippleBindingValue>,
		default: true
	}
});
