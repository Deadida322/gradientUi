import { makeDisabledProps } from '@/use/disabled';
import {
	makeFieldStateProps,
	makeFieldSizeProps,
	makePLAFieldProps,
	makeValidationProps
} from '@/use/form/props';
import { propsFactory } from '@/utils/propsFactory';
import type { GMaskTokens, GMaskValue } from '@/use/mask';
import type { InputTypeHTMLAttribute, PropType } from 'vue';

export const makeInputProps = propsFactory({
	...makeDisabledProps(),
	...makePLAFieldProps(),
	...makeFieldStateProps(),
	...makeFieldSizeProps(),
	...makeValidationProps<string>(),
	clearable: Boolean as PropType<boolean>,
	mask: [String, Array] as PropType<GMaskValue>,
	maskTokens: Object as PropType<GMaskTokens>,
	returnMaskedValue: {
		type: Boolean,
		default: true
	},
	type: {
		type: String as PropType<InputTypeHTMLAttribute>,
		default: 'text'
	}
});

export type GInputProps = ReturnType<typeof makeInputProps>;
