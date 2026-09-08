import { toValue, type MaybeRefOrGetter, type Ref } from 'vue';
import type { GMenuItemBase } from '@/use/menu';
import type { InternalItem } from './types';

export interface UseSelectCommitOptions<T, V> {
	open: Ref<boolean>;
	isMultiple: MaybeRefOrGetter<boolean>;
	shouldCloseOnSelect: MaybeRefOrGetter<boolean>;
	searchValue: MaybeRefOrGetter<string>;
	resolveMenuItem: (item: GMenuItemBase) => InternalItem<T, V> | undefined;
	firstVisibleItem: () => InternalItem<T, V> | undefined;
	selectItem: (item: InternalItem<T, V>) => void;
	setSearch: (value: string) => void;
	onInputValidation: () => void;
	isCustomItem?: (item: InternalItem<T, V>) => boolean;
	onAdd?: (item: T, query: string) => void;
	onSelect?: (item: InternalItem<T, V>) => void;
}

export function useSelectCommit<T, V>(options: UseSelectCommitOptions<T, V>) {
	function commitItem(item: InternalItem<T, V>) {
		if (item.disabled) return;

		if (options.isCustomItem?.(item)) {
			options.onAdd?.(item.raw, toValue(options.searchValue).trim());
		}

		options.selectItem(item);
		options.onSelect?.(item);

		if (toValue(options.isMultiple)) {
			options.setSearch('');
		} else {
			options.setSearch(item.label);
		}

		if (toValue(options.shouldCloseOnSelect)) {
			options.open.value = false;
		}

		options.onInputValidation();
	}

	function onSelect(item: GMenuItemBase) {
		const resolvedItem = options.resolveMenuItem(item);
		if (!resolvedItem) return;

		commitItem(resolvedItem);
	}

	function selectFirstVisibleItem() {
		const firstItem = options.firstVisibleItem();

		if (firstItem) {
			commitItem(firstItem);
		}
	}

	function removeItem(item: InternalItem<T, V>) {
		options.selectItem(item);
		options.onInputValidation();
	}

	return {
		commitItem,
		onSelect,
		selectFirstVisibleItem,
		removeItem
	};
}
