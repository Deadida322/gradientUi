import type { Sizes } from '@/types/CommonTypes';
import type { GSquircleProps } from '../GSquircle/types';

type shapeProp = 'rounded' | 'squircle';

export interface GFABProps extends GSquircleProps {
	shape?: shapeProp;
	size?: Sizes;
	label?: string;
	icon?: string;
}
