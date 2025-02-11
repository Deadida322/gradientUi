import type { option } from '@/CommonTypes';

export interface GFABGroupOption extends option {
	icon: string;
}
export interface GFABGroupProps {
	options?: GFABGroupOption[];
	icon: string;
	activeIcon: string;
}
