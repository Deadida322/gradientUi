import { type MaybeRef } from 'vue';
import { useBooleanProp } from '@/use/booleanProp';
import { useSelectionModel } from '@/use/selectionModel';
import type {
	InternalItem,
	SelectionComparatorValue,
	SelectionValue,
	SelectionValueComparator
} from './types';

export function useSelection<
	T,
	V,
	Multiple extends boolean,
	ReturnObject extends boolean
>(
	props: {
		modelValue: MaybeRef<SelectionValue<T, V, Multiple, ReturnObject>>;
		multiple?: MaybeRef<unknown>;
		returnObject?: MaybeRef<unknown>;
		comparator?: SelectionValueComparator<
			SelectionValue<T, V, Multiple, ReturnObject>
		>;
	},
	emit: (
		e: 'update:modelValue',
		value: SelectionValue<T, V, Multiple, ReturnObject>
	) => void
) {
	type ModelValue = SelectionValue<T, V, Multiple, ReturnObject>;
	type SingleValue = SelectionComparatorValue<ModelValue>;
	const isReturnObject = useBooleanProp(props.returnObject ?? false);

	function extract(item: InternalItem<T, V>): SingleValue {
		return isReturnObject.value
			? (item.raw as SingleValue)
			: (item.value as SingleValue);
	}
	const selection = useSelectionModel<ModelValue, SingleValue>(
		{
			modelValue: props.modelValue,
			multiple: props.multiple,
			comparator: props.comparator,
			emptyValue: null as ModelValue
		},
		(value) => emit('update:modelValue', value)
	);

	function isSelected(item: InternalItem<T, V>): boolean {
		return selection.isSelected(extract(item));
	}

	function getNextValue(
		item: InternalItem<T, V>
	): SelectionValue<T, V, Multiple, ReturnObject> | undefined {
		if (item.disabled) return;
		return selection.getNextValue(extract(item));
	}

	function select(item: InternalItem<T, V>) {
		if (item.disabled) return;
		selection.toggle(extract(item));
	}

	return {
		isSelected,
		getNextValue,
		select
	};
}
