import type { Sizes } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';
import type { GGradienStates } from '../GGradient/types';
import { propsFactory } from '@/utils/propsFactory';
import type { PropType } from 'vue';

export interface GBadgeProps {
	size?: Sizes;
	dot?: boolean;
	color?: GColor;
	state?: GGradienStates;
	variant?: GBadgeVariants;
	content?: string | number;
	position?: GBadgePositions;
	location?: GBadgeLocation;
}

export type GBadgeVariants = 'filled' | 'tonal' | 'primary';
export type GBadgePositions = 'floating' | 'inline';
export type GBadgeLocation =
	| 'top-left'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-right';

export const makeBadgeProps = propsFactory({
	size: {
		type: String as PropType<Sizes>,
		default: 'm'
	},
	dot: Boolean,
	color: {
		type: String as PropType<GColor>,
		default: 'primary'
	},
	state: String as PropType<GGradienStates>,
	variant: {
		type: String as PropType<GBadgeVariants>,
		default: 'tonal'
	},
	content: [String, Number],
	position: {
		type: String as PropType<GBadgePositions>,
		default: 'floating'
	},
	location: {
		type: String as PropType<GBadgeLocation>,
		default: 'top-right'
	}
});
