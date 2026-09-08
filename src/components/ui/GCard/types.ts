import type { MdiIcon, Sizes } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';
import { makeDensityProps, type GDensity } from '@/use/density';
import { makeDisabledProps } from '@/use/disabled';
import type { GProgressView } from '@/components/ui/GProgress/types';
import {
	makeMaterialSurfaceProps,
	type MaterialSurfaceProps
} from '@/use/materialSurface';
import { makeSizeProps } from '@/use/size';
import { makeSurfaceTextureProps, type GSurfaceTexture } from '@/use/surface';
import { makeTagNameProps } from '@/use/tagName';
import { propsFactory } from '@/utils/propsFactory';
import type { PropType } from 'vue';
import type { GGradienStates } from '../GGradient/types';

export type GCardVariant =
	| 'default'
	| 'gradient'
	| 'tonal'
	| 'outlined'
	| 'glass';

export type GCardLayout =
	| 'default'
	| 'media'
	| 'horizontal'
	| 'overlay'
	| 'profile'
	| 'compact'
	| 'banner'
	| 'inset'
	| 'media-bottom'
	| 'metric';

export type GCardDensity = GDensity;

export interface GCardProps extends MaterialSurfaceProps {
	title?: string;
	subtitle?: string;
	text?: string;
	image?: string;
	imageAlt?: string;
	prependIcon?: MdiIcon;
	appendIcon?: MdiIcon;
	color?: GColor;
	state?: GGradienStates;
	variant?: GCardVariant;
	layout?: GCardLayout;
	size?: Sizes;
	density?: GCardDensity;
	texture?: GSurfaceTexture;
	disabled?: boolean;
	hover?: boolean;
	loading?: boolean;
	loadingText?: string;
	loadingProgressView?: GProgressView;
	tag?: string;
	href?: string;
	target?: string;
	rel?: string;
}

export type GCardEmits = {
	click: [event: MouseEvent];
};

export const makeCardProps = propsFactory({
	...makeMaterialSurfaceProps({
		borderRadius: 16,
		borderWidth: undefined,
		color: 'primary',
		placement: 'center'
	}),
	...makeSurfaceTextureProps(),
	...makeSizeProps(),
	...makeDensityProps(),
	...makeDisabledProps(),
	...makeTagNameProps(),
	hover: Boolean,
	loading: Boolean,
	loadingText: String,
	loadingProgressView: {
		type: String as PropType<GProgressView>,
		default: 'glow'
	},
	title: String,
	subtitle: String,
	text: String,
	image: String,
	imageAlt: String,
	prependIcon: String as PropType<MdiIcon>,
	appendIcon: String as PropType<MdiIcon>,
	variant: {
		type: String as PropType<GCardVariant>,
		default: 'tonal'
	},
	layout: {
		type: String as PropType<GCardLayout>,
		default: 'default'
	},
	color: {
		type: String as PropType<GColor>,
		default: 'primary'
	},
	state: String as PropType<GGradienStates>
});
