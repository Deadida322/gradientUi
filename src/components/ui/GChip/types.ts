import type { MdiIcon, Sizes } from '@/types/CommonTypes';

export interface GButtonProps {
	variant?: GButtonVariants;
	active?: boolean;
	rounded?: boolean;
	color?: string;
	appendIcon?: MdiIcon;
	iconButton?: MdiIcon;
	prependIcon?: MdiIcon;
	label?: string;
	disabled?: boolean;
	size?: Sizes;
	isIconButton?: boolean;
}

export type GButtonVariants = 'tonal' | 'text' | 'outlined' | 'default';
