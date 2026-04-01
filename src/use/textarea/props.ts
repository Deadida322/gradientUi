import { makeDisabledProps } from '@/use/disabled';
import {
	makeFieldStateProps,
	makeFieldSizeProps,
	makePLAFieldProps,
	makeValidationProps
} from '@/use/form/props';
import { propsFactory } from '@/utils/propsFactory';
import type { PropType } from 'vue';

export const makeTextareaProps = propsFactory({
	...makeDisabledProps(),
	...makePLAFieldProps(),
	...makeFieldStateProps(),
	...makeFieldSizeProps(),
	...makeValidationProps<string>(),
	clearable: Boolean as PropType<boolean>,
	rows: {
		type: Number,
		default: 3
	}
});

export type GTextareaProps = ReturnType<typeof makeTextareaProps>;
