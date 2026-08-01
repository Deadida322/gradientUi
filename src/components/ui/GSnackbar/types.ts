import type { MdiIcon } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';
import { makeSurfaceTextureProps, type GSurfaceTexture } from '@/use/surface';
import type { GTransitionValue } from '@/use/transition';
import type { GGradienStates } from '../GGradient/types';
import { propsFactory } from '@/utils/propsFactory';
import type { ExtractPropTypes, PropType } from 'vue';
import { makeMaterialSurfaceProps } from '@/use/materialSurface';

export type GSnackbarVariant = 'gradient' | 'tonal' | 'outlined' | 'glass';
export type GSnackbarLocation =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right';
export type GSnackbarCloseReason = 'manual' | 'timeout' | 'action' | 'dismiss';
export type GSnackbarPosition = 'static' | 'absolute' | 'fixed';
export type GSnackbarTexture = GSurfaceTexture;

export interface GSnackbarAction {
	label: string;
	value?: unknown;
	closeOnClick?: boolean;
}

export const makeSnackbarProps = propsFactory({
	...makeMaterialSurfaceProps({ borderRadius: 12 }),
	...makeSurfaceTextureProps(),
	modelValue: {
		type: Boolean as PropType<boolean | undefined>,
		default: undefined
	},
	defaultOpen: {
		type: Boolean,
		default: false
	},
	title: String,
	text: String,
	icon: String as PropType<MdiIcon>,
	color: {
		type: String as PropType<GColor>,
		default: 'primary'
	},
	state: String as PropType<GGradienStates>,
	variant: {
		type: String as PropType<GSnackbarVariant>,
		default: 'tonal'
	},
	location: {
		type: String as PropType<GSnackbarLocation>,
		default: 'bottom-center'
	},
	position: {
		type: String as PropType<GSnackbarPosition>,
		default: 'fixed'
	},
	transition: {
		type: [Boolean, String, Object] as PropType<GTransitionValue>,
		default: undefined
	},
	timeout: {
		type: Number,
		default: 5000
	},
	persistent: {
		type: Boolean,
		default: false
	},
	closeable: {
		type: Boolean,
		default: true
	},
	action: Object as PropType<GSnackbarAction>,
	actionText: String,
	closeOnAction: {
		type: Boolean,
		default: true
	},
	multiline: {
		type: Boolean,
		default: false
	},
	offset: {
		type: [Number, String],
		default: 24
	},
	maxWidth: {
		type: [Number, String],
		default: 520
	},
	pauseOnHover: {
		type: Boolean,
		default: true
	}
});

export type GSnackbarProps = ExtractPropTypes<
	ReturnType<typeof makeSnackbarProps>
>;
