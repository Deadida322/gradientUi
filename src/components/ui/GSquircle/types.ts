import type { PXtype } from '@/types/CommonTypes';

type SquircleVariants = 'tonal' | 'primary';

export interface GSquircleProps {
	size?: PXtype;
	variant?: SquircleVariants;
	shadow?: boolean;
	border?: number;
	borderColor?: string;
	color?: string;
}
