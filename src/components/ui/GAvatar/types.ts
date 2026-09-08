import type { MdiIcon, Sizes } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';
import { makeDisabledProps } from '@/use/disabled';
import {
	makeMaterialSurfaceProps,
	type MaterialSurfaceProps
} from '@/use/materialSurface';
import { makeSizeProps } from '@/use/size';
import { makeSurfaceTextureProps, type GSurfaceTexture } from '@/use/surface';
import { makeTagNameProps } from '@/use/tagName';
import { propsFactory } from '@/utils/propsFactory';
import type { ExtractPropTypes, PropType } from 'vue';
import type { GGradienStates } from '../GGradient/types';

export type GAvatarVariant =
	| 'default'
	| 'gradient'
	| 'tonal'
	| 'outlined'
	| 'glass';

export type GAvatarShape = 'circle' | 'rounded' | 'square' | 'squircle';

export interface GAvatarProps extends MaterialSurfaceProps {
	src?: string;
	image?: string;
	alt?: string;
	name?: string;
	text?: string;
	icon?: MdiIcon;
	color?: GColor;
	state?: GGradienStates;
	variant?: GAvatarVariant;
	shape?: GAvatarShape;
	size?: Sizes;
	texture?: GSurfaceTexture;
	disabled?: boolean;
	hover?: boolean;
	tag?: string;
	href?: string;
	target?: string;
	rel?: string;
}

export type GAvatarEmits = {
	click: [event: MouseEvent];
};

export interface GAvatarGroupItem {
	src?: string;
	image?: string;
	alt?: string;
	name?: string;
	text?: string;
	icon?: MdiIcon;
	color?: GColor;
	state?: GGradienStates;
	variant?: GAvatarVariant;
	shape?: GAvatarShape;
	href?: string;
	target?: string;
	rel?: string;
}

export const makeAvatarProps = propsFactory({
	...makeMaterialSurfaceProps({
		borderRadius: undefined,
		borderWidth: undefined,
		color: 'primary',
		placement: 'center'
	}),
	...makeSurfaceTextureProps(),
	...makeSizeProps(),
	...makeDisabledProps(),
	...makeTagNameProps(),
	src: String,
	image: String,
	alt: String,
	name: String,
	text: String,
	icon: String as PropType<MdiIcon>,
	hover: Boolean,
	variant: {
		type: String as PropType<GAvatarVariant>,
		default: 'tonal'
	},
	shape: {
		type: String as PropType<GAvatarShape>,
		default: 'circle'
	},
	color: {
		type: String as PropType<GColor>,
		default: 'primary'
	},
	state: String as PropType<GGradienStates>
});

export const makeAvatarGroupProps = propsFactory({
	items: {
		type: Array as PropType<GAvatarGroupItem[]>,
		default: () => []
	},
	max: Number,
	total: Number,
	size: {
		type: String as PropType<Sizes>,
		default: 'm'
	},
	shape: {
		type: String as PropType<GAvatarShape>,
		default: 'circle'
	},
	variant: {
		type: String as PropType<GAvatarVariant>,
		default: 'tonal'
	},
	color: {
		type: String as PropType<GColor>,
		default: 'primary'
	},
	overflowColor: String as PropType<GColor>,
	overlap: {
		type: [Number, String],
		default: undefined
	},
	stacked: {
		type: Boolean,
		default: true
	},
	reverse: Boolean,
	hover: Boolean,
	ariaLabel: {
		type: String,
		default: 'Avatar group'
	}
});

export type GAvatarGroupProps = ExtractPropTypes<
	ReturnType<typeof makeAvatarGroupProps>
>;
