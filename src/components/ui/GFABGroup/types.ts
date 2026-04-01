import type { option } from '@/types/CommonTypes';

export interface GFABGroupOption extends option {
	icon: string;
}
export interface GFABGroupProps {
	options?: GFABGroupOption[];
	icon: string;
	activeIcon: string;
}
