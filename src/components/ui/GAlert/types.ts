import type { MdiIcon } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';
import type { GGradienStates } from '../GGradient/types';
import { propsFactory } from '@/utils/propsFactory';
import type { PropType } from 'vue';

export type GAlertVariant = 'filled' | 'tonal' | 'outlined';

export interface GAlertProps {
	title?: string;
	text?: string;
	icon?: MdiIcon;
	color?: GColor;
	state?: GGradienStates;
	variant?: GAlertVariant;
}

export const makeAlertProps = propsFactory({
	title: String,
	text: String,
	icon: String as PropType<MdiIcon>,
	color: {
		type: String as PropType<GColor>,
		default: 'primary'
	},
	state: String as PropType<GGradienStates>,
	variant: {
		type: String as PropType<GAlertVariant>,
		default: 'tonal'
	}
});
