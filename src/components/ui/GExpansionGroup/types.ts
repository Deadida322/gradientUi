import { makeDisabledProps } from '@/use/disabled';
import { propsFactory } from '@/utils/propsFactory';
import type { PXtype } from '@/types/CommonTypes';
import type { ExtractPropTypes, PropType } from 'vue';
import type { ExpansionGroupModel } from '@/use/expansion';
import type { ExpansionValue } from '../GExpansion/types';

export interface GExpansionGroupSlots {
	default?: () => unknown;
}

export type GExpansionGroupEmits<T> = {
	'update:modelValue': [value: ExpansionGroupModel<T>];
};

export const makeExpansionGroupProps = propsFactory({
	...makeDisabledProps(),
	modelValue: {
		type: [String, Number, Boolean, Object, Array] as PropType<
			ExpansionGroupModel<ExpansionValue>
		>,
		default: null
	},
	readonly: Boolean,
	multiple: Boolean,
	mandatory: Boolean,
	gap: [Number, String] as PropType<PXtype>,
	divided: {
		type: Boolean,
		default: true
	}
});

export type GExpansionGroupProps = ExtractPropTypes<
	ReturnType<typeof makeExpansionGroupProps>
>;
