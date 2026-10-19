import { propsFactory } from '@/utils/propsFactory';
import type { ExtractPropTypes, PropType } from 'vue';

export type GImgFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export type GImgLoading = 'eager' | 'lazy';
export type GImgState = 'idle' | 'loading' | 'loaded' | 'error';

export interface GImgSource {
	src: string;
	srcset?: string;
	lazySrc?: string;
	aspectRatio?: number | string;
}

export interface GImgProps {
	src?: string | GImgSource;
	alt?: string;
	srcset?: string;
	sizes?: string;
	lazySrc?: string;
	aspectRatio?: number | string;
	width?: number | string;
	height?: number | string;
	maxWidth?: number | string;
	maxHeight?: number | string;
	fit?: GImgFit;
	cover?: boolean;
	fitContent?: boolean;
	position?: string;
	gradient?: string;
	borderRadius?: number | string;
	loading?: GImgLoading;
	decoding?: 'async' | 'auto' | 'sync';
	fetchpriority?: 'auto' | 'high' | 'low';
	crossorigin?: '' | 'anonymous' | 'use-credentials';
	referrerpolicy?: ReferrerPolicy;
	draggable?: boolean;
}

export interface GImgSlotProps {
	src: string;
	state: GImgState;
}

export type GImgEmits = {
	load: [event: Event];
	error: [event: Event];
};

export const makeImgProps = propsFactory({
	src: {
		type: [String, Object] as PropType<string | GImgSource>,
		default: ''
	},
	alt: {
		type: String,
		default: ''
	},
	srcset: String,
	sizes: String,
	lazySrc: String,
	aspectRatio: [Number, String],
	width: [Number, String],
	height: [Number, String],
	maxWidth: [Number, String],
	maxHeight: [Number, String],
	fit: String as PropType<GImgFit>,
	cover: Boolean,
	fitContent: Boolean,
	position: {
		type: String,
		default: 'center center'
	},
	gradient: String,
	borderRadius: [Number, String],
	loading: {
		type: String as PropType<GImgLoading>,
		default: 'lazy'
	},
	decoding: {
		type: String as PropType<'async' | 'auto' | 'sync'>,
		default: 'async'
	},
	fetchpriority: String as PropType<'auto' | 'high' | 'low'>,
	crossorigin: String as PropType<'' | 'anonymous' | 'use-credentials'>,
	referrerpolicy: String as PropType<ReferrerPolicy>,
	draggable: {
		type: Boolean,
		default: undefined
	}
});

export type GImgResolvedProps = ExtractPropTypes<
	ReturnType<typeof makeImgProps>
>;
