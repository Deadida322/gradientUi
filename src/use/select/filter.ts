import { computed, toValue } from 'vue';
import { normalizeSelectSearch } from './search';
import type { SelectMenuItem } from './menuItems';
import type { MaybeRefOrGetter } from 'vue';

export type SelectMenuFilter<T, V> = (
	item: SelectMenuItem<T, V>,
	query: string
) => boolean;

export interface UseFilteredSelectMenuOptions<T, V> {
	items: MaybeRefOrGetter<readonly SelectMenuItem<T, V>[]>;
	searchValue: MaybeRefOrGetter<string>;
	normalizedQuery: MaybeRefOrGetter<string>;
	filter?: MaybeRefOrGetter<SelectMenuFilter<T, V> | undefined>;
	isAlwaysVisible?: (item: SelectMenuItem<T, V>) => boolean;
}

export function useFilteredSelectMenu<T, V>(
	options: UseFilteredSelectMenuOptions<T, V>
) {
	const filteredMenuItems = computed(() =>
		toValue(options.items)
			.map((item) => filterMenuItem(item))
			.filter((item): item is SelectMenuItem<T, V> => Boolean(item))
	);
	const firstVisibleItem = computed(() =>
		flattenMenuItems(filteredMenuItems.value).find((item) => !item.disabled)
	);

	function filterMenuItem(
		item: SelectMenuItem<T, V>
	): SelectMenuItem<T, V> | null {
		const children = item.children
			?.map((child) => filterMenuItem(child))
			.filter((child): child is SelectMenuItem<T, V> => Boolean(child));
		const query = toValue(options.normalizedQuery);
		const filter = toValue(options.filter);
		const matches =
			!query ||
			options.isAlwaysVisible?.(item) ||
			(filter
				? filter(item, toValue(options.searchValue))
				: normalizeSelectSearch(item.label).includes(query));

		if (matches) return item;
		if (children?.length) return { ...item, children };

		return null;
	}

	function flattenMenuItems(
		items: readonly SelectMenuItem<T, V>[]
	): SelectMenuItem<T, V>[] {
		const result: SelectMenuItem<T, V>[] = [];

		for (const item of items) {
			if (item.children?.length) {
				result.push(...flattenMenuItems(item.children));
			} else {
				result.push(item);
			}
		}

		return result;
	}

	return {
		filteredMenuItems,
		firstVisibleItem
	};
}
