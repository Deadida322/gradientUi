import { computed, type MaybeRef, unref } from 'vue';
import { useBooleanProp } from '@/use/booleanProp';
import { useItems } from './items';
import { useSelection } from './selection';
import { useSelectMenuItems } from './menuItems';
import type { InternalItem, SelectBaseProps, SelectionValue } from './types';
import type { GMenuItemBase } from '@/use/menu';

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

function flattenItems<T, V>(items: InternalItem<T, V>[]): InternalItem<T, V>[] {
	const result: InternalItem<T, V>[] = [];

	for (const item of items) {
		result.push(item);
		if (item.children?.length) {
			result.push(...flattenItems(item.children));
		}
	}

	return result;
}

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
	type ModelValue = SelectionValue<T, V, Multiple, ReturnObject>;
	type SingleModelValue = ModelValue extends (infer U)[] ? U : ModelValue;

	const isMultiple = useBooleanProp(props.multiple);
	const isReturnObject = useBooleanProp(props.returnObject);
	const shouldCloseOnSelect = computed(
		() => unref(props.closeOnSelect) ?? !isMultiple.value
	);

	const { items: rawItems, resolveValue: rawResolveValue } = useItems<
		T,
		unknown
	>({
		items: props.items,
		labelKey: props.labelKey,
		valueKey: props.valueKey as never,
		itemChildren: props.itemChildren
	});
	const normalizedItems = computed(
		() => rawItems.value as InternalItem<T, V>[]
	);
	const resolveValue = (item: T) => rawResolveValue(item) as V;

	const comparator: (
		a: ModelValue extends (infer U)[] ? U : ModelValue,
		b: ModelValue extends (infer U)[] ? U : ModelValue
	) => boolean = (a: SingleModelValue, b: SingleModelValue): boolean => {
		if (!isReturnObject.value) {
			return Object.is(a, b);
		}
		if (!a) return false;
		return Object.is(resolveValue(a as T), resolveValue(b as T));
	};

	const { menuItems, resolveMenuItem } = useSelectMenuItems(normalizedItems);

	const { isSelected, select } = useSelection<
		T,
		V,
		Multiple,
		ReturnObject,
		ModelValue
	>(
		{
			modelValue: props.modelValue,
			multiple: props.multiple,
			returnObject: props.returnObject,
			comparator
		},
		emit
	);

	function isMenuItemSelected(item: GMenuItemBase): boolean {
		const resolvedItem = resolveMenuItem(item);
		return resolvedItem ? isSelected(resolvedItem) : false;
	}

	function handleSelect(item: GMenuItemBase, onClose?: () => void) {
		console.log('handleSelect', item);
		const resolvedItem = resolveMenuItem(item);
		if (!resolvedItem) return;

		select(resolvedItem);

		if (shouldCloseOnSelect.value) {
			onClose?.();
		}
	}

	const selectedItems = computed(() => {
		return flattenItems(normalizedItems.value).filter((item) =>
			isSelected(item)
		);
	});

	const hasSelection = computed(() => selectedItems.value.length > 0);
	const selectionText = computed(() => {
		if (!hasSelection.value) return '';
		return selectedItems.value.map((item) => item.label).join(', ');
	});

	return {
		isMultiple,
		shouldCloseOnSelect,
		menuItems,
		isMenuItemSelected,
		handleSelect,
		selectedItems,
		hasSelection,
		selectionText
	};
}
