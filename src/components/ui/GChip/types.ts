import type { MdiIcon, Sizes } from '@/types/CommonTypes';
import { makeActionSurfaceProps } from '@/use/actionSurface';
import { makeGradientProps } from '@/use/gradient';
import { propsFactory } from '@/utils/propsFactory';
import type { GGradienStates } from '../GGradient/types';
import type { PropType } from 'vue';

export interface GChipProps {
	variant?: GChipVariants;
	active?: boolean;
	rounded?: boolean;
	color?: string;
	label?: string;
	disabled?: boolean;
	size?: Sizes;
	state?: GGradienStates;
	activeVariant?: GChipVariants;
	prependIcon?: MdiIcon;
	appendIcon?: MdiIcon;
	removable?: boolean;
	onRemove?: () => void;
}

export type GChipVariants =
	| 'filled'
	| 'tonal'
	| 'text'
	| 'outlined'
	| 'default';

export const makeChipProps = propsFactory({
	...makeActionSurfaceProps(),
	...makeGradientProps({
		borderWidth: 0,
		borderRadius: 20,
		placement: 'center'
	}),
	label: String,
	prependIcon: String as PropType<MdiIcon>,
	appendIcon: String as PropType<MdiIcon>,
	removable: Boolean,
	onRemove: Function as PropType<() => void>
});
