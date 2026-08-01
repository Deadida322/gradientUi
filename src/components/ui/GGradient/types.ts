import type { StringeredNumber } from '@/types/CommonTypes';
import type { GGradientSurfaceFill } from '@/use/gradientSurface';
import type { GradientMaterialKind } from '@/use/gradientMaterial';
import type { GradientTokenRecipe } from '@/theme';

export interface GGradienProps {
	rootTag?: string;
	interactive?: boolean;
	active?: boolean;
	borderRadius?: number | StringeredNumber;
	borderWidth?: number | StringeredNumber;
	glow?: boolean | number | StringeredNumber;
	animateGlow?: boolean;
	shadow?: boolean;
	placement?: GGradienPositions;
	position?: GGradienPositions;
	state?: GGradienStates;
	inheritWidth?: boolean;
	surfaceFill?: GGradientSurfaceFill;
	materialKind?: GradientMaterialKind;
	gradientRecipe?: GradientTokenRecipe;
}

export type GGradienPositions = 'top' | 'bottom' | 'left' | 'right' | 'center';

export type GGradienStates = 'warning' | 'success' | 'error';
