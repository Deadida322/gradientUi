import type { GGradienStates } from '@/components/ui/GGradient/types';
import type { MdiIcon } from '@/types/CommonTypes';
import type { ValidationRule } from 'gib-validate';
import { makeColorProps } from '@/use/color';
import { makeSizeProps } from '@/use/size';
import { propsFactory } from '@/utils/propsFactory';
import type { PropType } from 'vue';

export const makePLAFieldProps = propsFactory({
	...makeColorProps(),
	label: String,
	prependIcon: String as PropType<MdiIcon>,
	appendIcon: String as PropType<MdiIcon>
});

export const makeFieldStateProps = propsFactory({
	state: String as PropType<GGradienStates>,
	message: String
});

export const makeFieldSizeProps = propsFactory({
	...makeSizeProps()
});

export function makeValidationProps<T = string>() {
	return propsFactory({
		rules: {
			type: Array as PropType<ValidationRule<T>[]>,
			default: () => []
		}
	})();
}
