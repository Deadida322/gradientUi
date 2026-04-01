import type { MdiIcon } from '@/types/CommonTypes';

export interface GExpansionProps<T = string> {
	title?: string;
	modelValue?: boolean;
	value?: T;
	openedIcon?: MdiIcon;
	closedIcon?: MdiIcon;
}
