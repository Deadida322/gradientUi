import { computed, unref, type MaybeRef } from 'vue';
import { useBooleanProp } from '@/use/booleanProp';
import { useItems } from './items';
import { useSelection } from './selection';
import type {
	InternalItem,
	SelectionComparatorValue,
	SelectionValue,
	SelectionValueComparator,
	SelectItemChildren,
	SelectLabelKey,
	SelectValueKey
} from './types';

type MaybeRefSelectionControllerProps<
	T,
	V,
	Multiple extends boolean,
	ReturnObject extends boolean
> = {
	items: MaybeRef<readonly T[]>;
	modelValue: MaybeRef<SelectionValue<T, V, Multiple, ReturnObject>>;
	labelKey?: MaybeRef<SelectLabelKey<T> | undefined>;
	valueKey?: MaybeRef<SelectValueKey<T, V> | undefined>;
	itemChildren?: MaybeRef<SelectItemChildren<T> | undefined>;
	returnObject?: MaybeRef<ReturnObject | undefined>;
	multiple?: MaybeRef<Multiple | undefined>;
	valueComparator?: MaybeRef<
		| SelectionValueComparator<SelectionValue<T, V, Multiple, ReturnObject>>
		| undefined
	>;
};

export function useSelectionController<
	T,
	V,
	Multiple extends boolean,
	ReturnObject extends boolean
>(
	props: MaybeRefSelectionControllerProps<T, V, Multiple, ReturnObject>,
	emit: (
		e: 'update:modelValue',
		value: SelectionValue<T, V, Multiple, ReturnObject>
	) => void
) {
	type ModelValue = SelectionValue<T, V, Multiple, ReturnObject>;
	type ComparatorValue = SelectionComparatorValue<ModelValue>;

	const isReturnObject = useBooleanProp(props.returnObject ?? false);
	const { items: rawItems, resolveValue: rawResolveValue } = useItems<T, V>({
		items: props.items,
		labelKey: props.labelKey,
		valueKey: props.valueKey,
		itemChildren: props.itemChildren
	});

	const items = computed(() => rawItems.value as InternalItem<T, V>[]);
	const resolveValue = (item: T) => rawResolveValue(item) as V;

	const comparator: SelectionValueComparator<ModelValue> = (
		a: ComparatorValue,
		b: ComparatorValue
	): boolean => {
		const customComparator = unref(props.valueComparator);

		if (customComparator) {
			return customComparator(a, b);
		}

		if (!isReturnObject.value) {
			return Object.is(a, b);
		}

		if (!a || !b) {
			return Object.is(a, b);
		}

		return Object.is(resolveValue(a as T), resolveValue(b as T));
	};

	const { isSelected, getNextValue, select } = useSelection<
		T,
		V,
		Multiple,
		ReturnObject
	>(
		{
			modelValue: props.modelValue,
			multiple: props.multiple,
			returnObject: props.returnObject,
			comparator
		},
		emit
	);

	function isItemSelected(item: InternalItem<T, V>) {
		return isSelected(item);
	}

	function selectItem(item: InternalItem<T, V>) {
		select(item);
	}

	function getNextItemValue(item: InternalItem<T, V>) {
		return getNextValue(item);
	}

	return {
		items,
		isItemSelected,
		getNextItemValue,
		selectItem
	};
}
