import type { Sizes } from '@/types/CommonTypes';
import type { MdiIcon } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';
import type { GGradienStates } from '../GGradient/types';
import { propsFactory } from '@/utils/propsFactory';
import type { PropType } from 'vue';

export type GFABLocation =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right';

export type GFABPosition = 'static' | 'absolute' | 'fixed';
export type GFABVariant = 'filled' | 'tonal' | 'outlined' | 'default';
export type GFABLabelPlacement = 'left' | 'right';

export interface GFABProps {
	icon?: MdiIcon;
	label?: string;
	labelPlacement?: GFABLabelPlacement;
	extended?: boolean;
	size?: Sizes;
	variant?: GFABVariant;
	color?: GColor;
	state?: GGradienStates;
	disabled?: boolean;
	location?: GFABLocation;
	position?: GFABPosition;
	offset?: number | string;
	shadow?: boolean;
	border?: number;
	borderColor?: string;
}

export const makeFABProps = propsFactory({
	icon: String as PropType<MdiIcon>,
	label: String,
	labelPlacement: {
		type: String as PropType<GFABLabelPlacement>,
		default: 'right'
	},
	extended: Boolean,
	size: {
		type: String as PropType<Sizes>,
		default: 'm'
	},
	variant: {
		type: String as PropType<GFABVariant>,
		default: 'filled'
	},
	color: {
		type: String as PropType<GColor>,
		default: 'primary'
	},
	state: String as PropType<GGradienStates>,
	disabled: Boolean,
	location: {
		type: String as PropType<GFABLocation>,
		default: 'bottom-right'
	},
	position: {
		type: String as PropType<GFABPosition>,
		default: 'static'
	},
	offset: {
		type: [Number, String],
		default: 24
	},
	shadow: {
		type: Boolean,
		default: true
	},
	border: Number,
	borderColor: String
});
