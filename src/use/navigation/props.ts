import type { PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';
import { makeColorProps, type GColor } from '@/use/color';
import { makeDisabledProps } from '@/use/disabled';
import type { GNavigationValue } from './types';

const makeValueProp = () => ({
	type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
		GNavigationValue | undefined
	>,
	default: undefined
});

export const makeNavigationProps = propsFactory({
	...makeColorProps(),
	modelValue: makeValueProp(),
	defaultValue: makeValueProp(),
	activeColor: {
		type: String as PropType<GColor | undefined>,
		default: undefined
	}
});

export const makeNavigationItemProps = propsFactory({
	...makeDisabledProps(),
	value: makeValueProp(),
	label: String
});
