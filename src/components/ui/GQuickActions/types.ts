import type { MdiIcon, option } from '@/types/CommonTypes';
import type {
	GFABLabelPlacement,
	GFABLocation,
	GFABPosition
} from '../GFAB/types';
import type { GTransitionValue } from '@/use/transition';

export interface GQuickActionsOption extends option {
	icon: MdiIcon;
}

export type GQuickActionsDirection = 'top' | 'right' | 'bottom' | 'left';

export interface GQuickActionsProps {
	options?: GQuickActionsOption[];
	icon: MdiIcon;
	activeIcon: MdiIcon;
	contained?: boolean;
	position?: GFABPosition;
	location?: GFABLocation;
	direction?: GQuickActionsDirection;
	transition?: GTransitionValue;
	offset?: number | string;
	labelPlacement?: GFABLabelPlacement;
}
