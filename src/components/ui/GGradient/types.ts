import type { StringeredNumber } from '@/types/CommonTypes';

export interface GGradienProps {
	active?: boolean;
	borderRadius?: number | StringeredNumber;
	borderWidth?: number | StringeredNumber;
	glow?: boolean | number | StringeredNumber;
	animateGlow?: boolean;
	shadow?: boolean;
	position?: GGradienPositions;
	state?: GGradienStates;
	inheritWidth?: boolean;
}

export type GGradienPositions = 'top' | 'bottom' | 'left' | 'right';

export type GGradienStates = 'warning' | 'success' | 'error';
