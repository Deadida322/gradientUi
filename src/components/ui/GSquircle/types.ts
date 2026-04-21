import type { PXtype } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';
import type { GGradienStates } from '../GGradient/types';

type SquircleVariants = 'tonal' | 'primary';

export interface GSquircleProps {
	size?: PXtype;
	variant?: SquircleVariants;
	shadow?: boolean;
	border?: number;
	borderColor?: string;
	color?: GColor;
	state?: GGradienStates;
}
