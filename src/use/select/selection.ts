import { unref, type MaybeRef } from 'vue';
import { useBooleanProp } from '@/use/booleanProp';
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
	const isMultiple = useBooleanProp(props.multiple ?? false);
	const isReturnObject = useBooleanProp(props.returnObject ?? false);

	type ModelValue = SelectionValue<T, V, Multiple, ReturnObject>;
	type SingleValue = SelectionComparatorValue<ModelValue>;
	type Comparator = SelectionValueComparator<ModelValue>;

	const compare: Comparator =
		props.comparator ??
		((a: SingleValue, b: SingleValue) => Object.is(a, b));

	function getModelAsArray(modelValue: ModelValue): SingleValue[] {
		return Array.isArray(modelValue) ? modelValue : [];
	}

	function getModelAsSingle(modelValue: ModelValue): SingleValue | null {
		return Array.isArray(modelValue) ? null : (modelValue as SingleValue);
	}

	function extract(item: InternalItem<T, V>): SingleValue {
		return (isReturnObject.value ? item.raw : item.value) as SingleValue;
	}

	function isSelected(item: InternalItem<T, V>): boolean {
		const value = extract(item);
		const modelValue = unref(props.modelValue);

		if (isMultiple.value) {
			const model = getModelAsArray(modelValue);
			return model.some((v) => compare(v, value));
		}

		const model = getModelAsSingle(modelValue);
		if (model === null) return false;
		return compare(model, value);
	}

	function getNextValue(
		item: InternalItem<T, V>
	): SelectionValue<T, V, Multiple, ReturnObject> | undefined {
		if (item.disabled) return;

		const value = extract(item);
		const modelValue = unref(props.modelValue);

		if (isMultiple.value) {
			const model = getModelAsArray(modelValue);
			const next = [...model];

			const index = next.findIndex((v) => compare(v, value));

			if (index > -1) {
				next.splice(index, 1);
			} else {
				next.push(value);
			}

			return next as ModelValue;
		}

		if (compare(modelValue as SingleValue, value)) {
			return null as ModelValue;
		}

		return value as ModelValue;
	}

	function select(item: InternalItem<T, V>) {
		const nextValue = getNextValue(item);
		if (nextValue === undefined) return;

		emit('update:modelValue', nextValue);
	}

	return {
		isSelected,
		getNextValue,
		select
	};
}
