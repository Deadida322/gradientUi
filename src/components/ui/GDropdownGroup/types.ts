import { propsFactory } from '@/utils/propsFactory';
import type { ExtractPropTypes } from 'vue';

export const makeDropdownGroupProps = propsFactory({
	label: String
});

export type GDropdownGroupProps = ExtractPropTypes<
	ReturnType<typeof makeDropdownGroupProps>
>;
