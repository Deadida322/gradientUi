import { makeOverlayProps } from '@/use/overlay';
import { propsFactory } from '@/utils/propsFactory';
import type { ExtractPropTypes } from 'vue';

export const makeModalProps = propsFactory({
	...makeOverlayProps({
		appendTo: 'body',
		placement: 'center',
		position: 'fixed',
		scrim: true,
		lockScroll: true
	}),
	title: String,
	text: String,
	width: {
		type: [String, Number],
		default: 560
	},
	maxWidth: {
		type: [String, Number],
		default: 'min(92vw, 720px)'
	},
	fullscreen: {
		type: Boolean,
		default: false
	},
	scrollable: {
		type: Boolean,
		default: false
	},
	hideClose: {
		type: Boolean,
		default: false
	}
});

export type GModalProps = ExtractPropTypes<ReturnType<typeof makeModalProps>>;
