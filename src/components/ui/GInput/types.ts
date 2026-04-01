import type { PLASlots } from '@/types/CommonTypes';
import type { GInputProps } from '@/use/input';

export type InputState = 'default' | 'warning' | 'error' | 'success';

export interface GInputSlots extends PLASlots {
	message?: () => unknown;
}

export type GIputSlots = GInputSlots;
export type { GInputProps };
