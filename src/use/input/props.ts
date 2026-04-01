import { makeDisabledProps } from '@/use/disabled';
import {
	makeFieldStateProps,
	makeFieldSizeProps,
	makePLAFieldProps,
	makeValidationProps
} from '@/use/form/props';
import { propsFactory } from '@/utils/propsFactory';
import type { InputTypeHTMLAttribute, PropType } from 'vue';

export const makeInputProps = propsFactory({
	...makeDisabledProps(),
	...makePLAFieldProps(),
	...makeFieldStateProps(),
	...makeFieldSizeProps(),
	...makeValidationProps<string>(),
	clearable: Boolean as PropType<boolean>,
	type: {
		type: String as PropType<InputTypeHTMLAttribute>,
		default: 'text'
	}
});

export type GInputProps = ReturnType<typeof makeInputProps>;
