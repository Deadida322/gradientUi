import { computed, type MaybeRef, unref } from 'vue';
import { useBooleanProp } from '@/use/booleanProp';
import { useSelectMenuItems } from './menuItems';
import { useSelectionController } from './selectionController';
import { useSelectionSummary } from './selectionSummary';
import type { GMenuItemBase } from '@/use/menu';
import type { SelectBaseProps, SelectionValue } from './types';

type MaybeRefSelectProps<
	T,
	V,
	Multiple extends boolean,
	ReturnObject extends boolean
> = {
	[K in keyof SelectBaseProps<T, V, Multiple, ReturnObject>]: MaybeRef<
		SelectBaseProps<T, V, Multiple, ReturnObject>[K]
	>;
};

export function useSelectController<
	T,
	V,
	Multiple extends boolean = false,
	ReturnObject extends boolean = false
>(
	props: MaybeRefSelectProps<T, V, Multiple, ReturnObject>,
	emit: (
		e: 'update:modelValue',
		value: SelectionValue<T, V, Multiple, ReturnObject>
	) => void
) {
	const isMultiple = useBooleanProp(props.multiple);
	const shouldCloseOnSelect = computed(
		() => unref(props.closeOnSelect) ?? !isMultiple.value
	);

	const {
		items: normalizedItems,
		isItemSelected,
		selectItem
	} = useSelectionController<T, V, Multiple, ReturnObject>(
		{
			items: props.items,
			modelValue: props.modelValue,
			labelKey: props.labelKey,
			valueKey: props.valueKey,
			itemChildren: props.itemChildren,
			returnObject: props.returnObject,
			multiple: props.multiple
		},
		emit
	);
	const { selectedItems, hasSelection, selectionText } = useSelectionSummary(
		normalizedItems,
		isItemSelected
	);

	const { menuItems, resolveMenuItem } = useSelectMenuItems(normalizedItems);

	function isMenuItemSelected(item: GMenuItemBase): boolean {
		const resolvedItem = resolveMenuItem(item);
		return resolvedItem ? isItemSelected(resolvedItem) : false;
	}

	function handleSelect(item: GMenuItemBase, onClose?: () => void) {
		const resolvedItem = resolveMenuItem(item);
		if (!resolvedItem) return;

		selectItem(resolvedItem);

		if (shouldCloseOnSelect.value) {
			onClose?.();
		}
	}

	return {
		isMultiple,
		shouldCloseOnSelect,
		menuItems,
		resolveMenuItem,
		isMenuItemSelected,
		handleSelect,
		selectedItems,
		hasSelection,
		selectionText
	};
}
