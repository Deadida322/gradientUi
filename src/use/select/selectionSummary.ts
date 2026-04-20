import { computed, type ComputedRef, type Ref } from 'vue';
import type { InternalItem } from './types';

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

export function useSelectionSummary<T, V>(
	items: Ref<InternalItem<T, V>[]>,
	isItemSelected: (item: InternalItem<T, V>) => boolean
): {
	selectedItems: ComputedRef<InternalItem<T, V>[]>;
	hasSelection: ComputedRef<boolean>;
	selectionText: ComputedRef<string>;
} {
	const selectedItems = computed(() => {
		return flattenItems(items.value).filter((item) => isItemSelected(item));
	});

	const hasSelection = computed(() => selectedItems.value.length > 0);
	const selectionText = computed(() => {
		if (!hasSelection.value) return '';
		return selectedItems.value.map((item) => item.label).join(', ');
	});

	return {
		selectedItems,
		hasSelection,
		selectionText
	};
}
