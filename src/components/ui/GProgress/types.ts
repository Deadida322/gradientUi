import { type Sizes } from '@/types/CommonTypes';
export interface GProgressProps {
	rounded?: boolean;
	modelValue?: number;
	indeterminate?: boolean;
	noLabel?: boolean;
	size?: Sizes;
}
