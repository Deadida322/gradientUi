import { makeFloatingProps } from '@/use/floating';
import { propsFactory } from '@/utils/propsFactory';

export const makeDropdownProps = propsFactory({
	...makeFloatingProps({
		zIndexBase: 2000,
		placement: 'bottom'
	}),
	sameWidth: {
		type: Boolean,
		default: false
	},
	closeOnContentClick: {
		type: Boolean,
		default: false
	},
	openOnClick: {
		type: Boolean,
		default: true
	},
	openOnHover: {
		type: Boolean,
		default: false
	},
	openOnFocus: {
		type: Boolean,
		default: true
	},
	activatorFullWidth: {
		type: Boolean,
		default: false
	},
	triggerFullWidth: {
		type: Boolean,
		default: false
	}
} as const);

export type GDropdownProps = ReturnType<typeof makeDropdownProps>;
