import { type Sizes } from '@/types/CommonTypes';
export interface GProgressProps {
	rounded?: boolean;
	color?: string;
	modelValue?: number;
	indeterminate?: boolean;
	noLabel?: boolean;
	size?: Sizes;
}
