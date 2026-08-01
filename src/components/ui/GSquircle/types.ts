import type { PXtype } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';
import type { GGradienStates } from '../GGradient/types';
import type { GradientAnimationOptions, GradientTokenRecipe } from '@/theme';
import type { GGlow } from '@/use/gradient';

export type SquircleVariants = 'tonal' | 'primary' | 'gradient';

export interface GSquircleProps {
	size?: PXtype;
	variant?: SquircleVariants;
	shadow?: boolean;
	border?: number;
	borderColor?: string;
	color?: GColor;
	state?: GGradienStates;
	gradientRecipe?: GradientTokenRecipe;
	animationOptions?: GradientAnimationOptions;
	gradientBorder?: boolean;
	glow?: GGlow;
	animateGlow?: boolean;
}
