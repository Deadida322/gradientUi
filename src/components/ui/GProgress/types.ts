import { type Sizes } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';
import type { GGradienStates } from '../GGradient/types';

export interface GProgressProps {
	rounded?: boolean;
	color?: GColor;
	state?: GGradienStates;
	modelValue?: number;
	indeterminate?: boolean;
	noLabel?: boolean;
	size?: Sizes;
	label?: string;
}
