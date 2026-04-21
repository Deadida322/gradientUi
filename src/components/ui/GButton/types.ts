import type { MdiIcon, Sizes } from '@/types/CommonTypes';
import { makeActionSurfaceProps } from '@/use/actionSurface';
import { makeGradientProps } from '@/use/gradient';
import { makePLAProps } from '@/use/PLA';
import { propsFactory } from '@/utils/propsFactory';
import type { GGradienStates } from '../GGradient/types';
import type { PropType } from 'vue';

export interface GButtonProps {
	variant?: GButtonVariants;
	active?: boolean;
	rounded?: boolean;
	color?: string;
	iconButton?: MdiIcon;
	prepend?: MdiIcon;
	append?: MdiIcon;
	label?: string;
	disabled?: boolean;
	size?: Sizes;
	state?: GGradienStates;
	activeColor?: string;
	activeState?: GGradienStates;
	activeVariant?: GButtonVariants;
	isIconButton?: boolean;
}

export type GButtonVariants =
	| 'filled'
	| 'tonal'
	| 'text'
	| 'outlined'
	| 'default';

export const makeButtonProps = propsFactory({
	...makeActionSurfaceProps(),
	...makePLAProps(),
	...makeGradientProps(),
	isIconButton: Boolean as PropType<boolean>,
	iconButton: String as PropType<MdiIcon>
});
