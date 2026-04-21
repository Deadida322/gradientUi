import type { Sizes } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';
import type { GGradienStates } from '../GGradient/types';

export interface GBadgeProps {
	size?: Sizes;
	dot?: boolean;
	color?: GColor;
	state?: GGradienStates;
	variant?: GBadgeVariants;
	content?: string | number;
	position?: GBadgePositions;
}

export type GBadgeVariants = 'tonal' | 'primary';
export type GBadgePositions = 'floating' | 'inline';
