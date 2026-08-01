import type { MdiIcon } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';
import { makeSurfaceTextureProps, type GSurfaceTexture } from '@/use/surface';
import type { GGradienStates } from '../GGradient/types';
import { propsFactory } from '@/utils/propsFactory';
import type { PropType } from 'vue';
import {
	makeMaterialSurfaceProps,
	type MaterialSurfaceProps
} from '@/use/materialSurface';

export type GAlertVariant = 'gradient' | 'tonal' | 'outlined' | 'glass';

export interface GAlertProps extends MaterialSurfaceProps {
	title?: string;
	text?: string;
	icon?: MdiIcon;
	color?: GColor;
	state?: GGradienStates;
	variant?: GAlertVariant;
	texture?: GSurfaceTexture;
}

export const makeAlertProps = propsFactory({
	...makeMaterialSurfaceProps({ borderRadius: 12 }),
	...makeSurfaceTextureProps(),
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
