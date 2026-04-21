import type { Sizes } from '@/types/CommonTypes';

export interface GBadgeProps {
	size?: Sizes;
	dot?: boolean;
	color?: string;
	variant?: GBadgeVariants;
	content?: string | number;
	position?: GBadgePositions;
}

export type GBadgeVariants = 'tonal' | 'primary';
export type GBadgePositions = 'floating' | 'inline';
