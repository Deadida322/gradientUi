import type { MdiIcon, Sizes } from '@/types/CommonTypes';
import { makeActionSurfaceProps } from '@/use/actionSurface';
import { makeGradientProps } from '@/use/gradient';
import type { GColor } from '@/use/color';
import { propsFactory } from '@/utils/propsFactory';
import type { GGradienStates } from '../GGradient/types';
import type { GGradientSurfaceFill } from '@/use/gradientSurface';
import type { GlassProps } from '@/use/glass';
import type { PropType } from 'vue';

export interface GChipProps extends GlassProps {
	variant?: GChipVariants;
	active?: boolean;
	rounded?: boolean;
	color?: GColor;
	label?: string;
	disabled?: boolean;
	size?: Sizes;
	state?: GGradienStates;
	activeColor?: GColor;
	activeState?: GGradienStates;
	activeVariant?: GChipVariants;
	prependIcon?: MdiIcon;
	appendIcon?: MdiIcon;
	removable?: boolean;
	onRemove?: () => void;
	surfaceFill?: GGradientSurfaceFill;
}

export type GChipVariants =
	| 'gradient'
	| 'tonal'
	| 'text'
	| 'outlined'
	| 'glass'
	| 'default';

export const makeChipProps = propsFactory({
	...makeActionSurfaceProps(),
	...makeGradientProps({
		borderWidth: undefined,
		borderRadius: 20,
		placement: 'center',
		rounded: true
	}),
	label: String,
	prependIcon: String as PropType<MdiIcon>,
	appendIcon: String as PropType<MdiIcon>,
	removable: Boolean,
	onRemove: Function as PropType<() => void>
});
