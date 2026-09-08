import { computed } from 'vue';
import { useSelectController } from './controller';
import { type ComboboxItemFromQuery, useComboboxCreatable } from './creatable';
import { useFilteredSelectMenu, type SelectMenuFilter } from './filter';
import { useModelFallbackItems } from './modelFallbackItems';
import { useSelectSearch } from './search';
import type { GMenuItemBase } from '@/use/menu';
import type { InternalItem, SelectBaseProps, SelectionValue } from './types';
import type { MaybeRef, MaybeRefOrGetter } from 'vue';

export type { ComboboxItemFromQuery } from './creatable';
export type ComboboxFilter<T, V> = SelectMenuFilter<T, V>;

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

export interface UseComboboxControllerOptions<
	T,
	V,
	Multiple extends boolean,
	ReturnObject extends boolean
> extends MaybeRefSelectProps<T, V, Multiple, ReturnObject> {
	search?: MaybeRefOrGetter<string | undefined>;
	allowCustom?: MaybeRefOrGetter<boolean | undefined>;
	itemFromQuery?: MaybeRefOrGetter<ComboboxItemFromQuery<T> | undefined>;
	filter?: MaybeRefOrGetter<ComboboxFilter<T, V> | undefined>;
	onSearch: (value: string) => void;
}

export function useComboboxController<
	T,
	V,
	Multiple extends boolean = false,
	ReturnObject extends boolean = false
>(
	props: UseComboboxControllerOptions<T, V, Multiple, ReturnObject>,
	emit: (
		e: 'update:modelValue',
		value: SelectionValue<T, V, Multiple, ReturnObject>
	) => void
) {
	const { sourceItems, normalizedSourceItems, createRawRecord } =
		useModelFallbackItems<T, V, Multiple, ReturnObject>({
			items: props.items,
			modelValue: props.modelValue,
			returnObject: props.returnObject,
			labelKey: props.labelKey,
			valueKey: props.valueKey,
			itemChildren: props.itemChildren
		});
	const { searchValue, normalizedQuery, setSearch, syncSelectionText } =
		useSelectSearch({
			search: props.search,
			onSearch: props.onSearch
		});
	const { customItem } = useComboboxCreatable<T, V>({
		searchValue,
		normalizedQuery,
		normalizedSourceItems,
		allowCustom: props.allowCustom,
		itemFromQuery: props.itemFromQuery,
		labelKey: props.labelKey,
		valueKey: props.valueKey,
		createRawRecord
	});
	const selectableItems = computed<readonly T[]>(() => [
		...sourceItems.value,
		...(customItem.value === undefined ? [] : [customItem.value])
	]);
	const {
		isMultiple,
		shouldCloseOnSelect,
		normalizedItems,
		menuItems,
		resolveMenuItem,
		getSlotItem,
		isItemSelected,
		isMenuItemSelected,
		selectItem,
		selectedItems,
		hasSelection,
		selectionText
	} = useSelectController<T, V, Multiple, ReturnObject>(
		{
			items: selectableItems,
			modelValue: props.modelValue,
			multiple: props.multiple,
			returnObject: props.returnObject,
			labelKey: props.labelKey,
			valueKey: props.valueKey,
			itemChildren: props.itemChildren
		},
		emit
	);
	const { filteredMenuItems, firstVisibleItem: firstVisibleMenuItem } =
		useFilteredSelectMenu<T, V>({
			items: menuItems,
			searchValue,
			normalizedQuery,
			filter: props.filter,
			isAlwaysVisible: (item) => isCustomItem(item)
		});
	const customSelectionItem = computed(() =>
		normalizedItems.value.find(isCustomItem)
	);
	syncSelectionText(selectionText, isMultiple);

	function isCustomItem(item: InternalItem<T, V>) {
		return (
			customItem.value !== undefined &&
			Object.is(item.raw, customItem.value)
		);
	}

	function isCustomMenuItem(item: GMenuItemBase) {
		const resolvedItem = resolveMenuItem(item);
		return resolvedItem ? isCustomItem(resolvedItem) : false;
	}

	function firstVisibleItem() {
		return firstVisibleMenuItem.value;
	}

	return {
		isMultiple,
		shouldCloseOnSelect,
		searchValue,
		setSearch,
		filteredMenuItems,
		getSlotItem,
		resolveMenuItem,
		isItemSelected,
		isMenuItemSelected,
		isCustomItem,
		isCustomMenuItem,
		customSelectionItem,
		firstVisibleItem,
		selectItem,
		selectedItems,
		hasSelection,
		selectionText
	};
}
