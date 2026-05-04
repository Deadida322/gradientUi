import type {
	MaybeElement,
	Placement,
	ReferenceElement,
	Strategy
} from '@floating-ui/vue';
import { propsFactory } from '@/utils/propsFactory';
import { makeTransitionProps } from '@/use/transition';
import type { ExtractPropTypes, PropType } from 'vue';

export const makeFloatingProps = propsFactory({
	...makeTransitionProps(),
	modelValue: {
		type: Boolean,
		default: undefined
	},
	defaultOpen: {
		type: Boolean,
		default: false
	},
	placement: {
		type: String as PropType<Placement>,
		default: 'bottom'
	},
	strategy: {
		type: String as PropType<Strategy>,
		default: 'absolute'
	},
	offset: {
		type: Number,
		default: 8
	},
	shift: {
		type: Boolean,
		default: true
	},
	flip: {
		type: Boolean,
		default: true
	},
	sameWidth: {
		type: Boolean,
		default: false
	},
	referenceFullWidth: {
		type: Boolean,
		default: false
	},
	appendTo: {
		type: String,
		default: ''
	},
	zIndexBase: {
		type: Number,
		default: 1000
	},
	disabled: Boolean,
	content: String,
	reference: Object as PropType<MaybeElement<ReferenceElement> | null>
});

export type GFloatingProps = ExtractPropTypes<
	ReturnType<typeof makeFloatingProps>
>;
