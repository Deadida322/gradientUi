import type { PLASlots } from '@/types/CommonTypes';
import type { GTextareaProps } from '@/use/textarea';

export interface GTextareaSlots extends PLASlots {
	message?: () => unknown;
}

export type { GTextareaProps };
