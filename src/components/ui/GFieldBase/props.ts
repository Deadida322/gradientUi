import type { GGradienStates } from '../GGradient/types';
import type { MdiIcon } from '@/types/CommonTypes';
import type { Sizes } from '@/types/CommonTypes';
import { propsFactory } from '@/utils/propsFactory';
import type { PropType } from 'vue';

export const makeFieldBaseProps = propsFactory({
	id: {
		type: String,
		required: true
	},
	label: String,
	state: String as PropType<GGradienStates>,
	disabled: Boolean,
	clearable: Boolean,
	focused: Boolean,
	size: {
		type: String as PropType<Sizes>,
		default: 'm'
	},
	message: String,
	prependIcon: String as PropType<MdiIcon>,
	appendIcon: String as PropType<MdiIcon>
});

export const makeFieldShellProps = propsFactory({
	...makeFieldBaseProps(),
	hasValue: Boolean,
	multiline: Boolean
});
