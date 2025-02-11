import type { sizes } from '@/CommonTypes';
import type { GSquircleProps } from '../GSquircle/types';

type shapeProp = 'rounded' | 'squircle';

export interface GFABProps extends GSquircleProps {
	shape?: shapeProp;
	size?: sizes;
	label?: string;
	icon?: string;
}
