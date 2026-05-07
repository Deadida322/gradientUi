import { makeOverlayProps } from '@/use/overlay';
import { propsFactory } from '@/utils/propsFactory';
import type { ExtractPropTypes, PropType } from 'vue';
import type { OverlayPlacement } from '@/use/overlay';

export type GDrawerPlacement = Extract<
	OverlayPlacement,
	'left' | 'right' | 'top' | 'bottom'
>;

export const makeDrawerProps = propsFactory({
	...makeOverlayProps({
		appendTo: 'body',
		placement: 'right',
		position: 'fixed',
		scrim: true,
		lockScroll: true,
		transition: {
			name: 'overlay',
			distance: '24px'
		}
	}),
	placement: {
		type: String as PropType<GDrawerPlacement>,
		default: 'right'
	},
	title: String,
	text: String,
	width: {
		type: [String, Number],
		default: 360
	},
	maxWidth: {
		type: [String, Number],
		default: 'calc(100vw - 32px)'
	},
	height: {
		type: [String, Number],
		default: 360
	},
	maxHeight: {
		type: [String, Number],
		default: 'calc(100vh - 32px)'
	},
	scrollable: {
		type: Boolean,
		default: true
	},
	hideClose: {
		type: Boolean,
		default: false
	}
});

export type GDrawerProps = ExtractPropTypes<ReturnType<typeof makeDrawerProps>>;
