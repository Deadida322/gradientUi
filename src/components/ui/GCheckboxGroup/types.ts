import type { CheckValueComparator, SelectionGroupProps } from '@/use/check';
import type {
	SelectionValue,
	SelectLabelKey,
	SelectValueKey
} from '@/use/select/types';

export interface GCheckboxGroupProps<
	T,
	V = T,
	ReturnObject extends boolean = false
> extends SelectionGroupProps<SelectionValue<T, V, true, ReturnObject>> {
	modelValue: SelectionValue<T, V, true, ReturnObject>;
	options: readonly T[];
	name?: string;
	labelKey?: SelectLabelKey<T>;
	valueKey?: SelectValueKey<T, V>;
	returnObject?: ReturnObject;
	valueComparator?: CheckValueComparator<
		SelectionValue<T, V, true, ReturnObject>
	>;
}
