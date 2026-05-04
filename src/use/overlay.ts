import { propsFactory } from '@/utils/propsFactory';
import { makeTransitionProps } from '@/use/transition';
import type { ExtractPropTypes, PropType } from 'vue';

export type OverlayPlacement =
	| 'center'
	| 'left'
	| 'right'
	| 'top'
	| 'bottom'
	| 'fullscreen';

export type OverlayPosition = 'fixed' | 'absolute';

export const makeOverlayProps = propsFactory({
	...makeTransitionProps(),
	modelValue: {
		type: Boolean,
		default: undefined
	},
	defaultOpen: {
		type: Boolean,
		default: false
	},
	appendTo: {
		type: String,
		default: 'body'
	},
	zIndexBase: {
		type: Number,
		default: 2400
	},
	position: {
		type: String as PropType<OverlayPosition>,
		default: 'fixed'
	},
	placement: {
		type: String as PropType<OverlayPlacement>,
		default: 'center'
	},
	persistent: {
		type: Boolean,
		default: false
	},
	closeOnEsc: {
		type: Boolean,
		default: true
	},
	closeOnOutside: {
		type: Boolean,
		default: true
	},
	lockScroll: {
		type: Boolean,
		default: true
	},
	scrim: {
		type: Boolean,
		default: true
	},
	disabled: Boolean
});

export type GOverlayProps = ExtractPropTypes<
	ReturnType<typeof makeOverlayProps>
>;
