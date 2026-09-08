import { computed, toValue, unref } from 'vue';
import { flattenSelectItems } from './selectionSummary';
import { normalizeSelectSearch } from './search';
import type { InternalItem, SelectBaseProps } from './types';
import type { MaybeRef, MaybeRefOrGetter } from 'vue';

export type ComboboxItemFromQuery<T> = (query: string) => T;

type MaybeRefItemKeyProps<T, V> = Pick<
	{
		[K in keyof SelectBaseProps<T, V>]: MaybeRef<SelectBaseProps<T, V>[K]>;
	},
	'labelKey' | 'valueKey'
>;

export interface UseComboboxCreatableOptions<T, V> extends MaybeRefItemKeyProps<
	T,
	V
> {
	searchValue: MaybeRefOrGetter<string>;
	normalizedQuery: MaybeRefOrGetter<string>;
	normalizedSourceItems: MaybeRefOrGetter<readonly InternalItem<T, V>[]>;
	allowCustom?: MaybeRefOrGetter<boolean | undefined>;
	itemFromQuery?: MaybeRefOrGetter<ComboboxItemFromQuery<T> | undefined>;
	createRawRecord: (label: string, value: unknown) => T;
}

export function useComboboxCreatable<T, V>(
	options: UseComboboxCreatableOptions<T, V>
) {
	const hasExactLabelMatch = computed(() =>
		flattenSelectItems(toValue(options.normalizedSourceItems)).some(
			(item) =>
				normalizeSelectSearch(item.label) ===
				toValue(options.normalizedQuery)
		)
	);
	const canCreateWithoutFactory = computed(
		() =>
			Boolean(toValue(options.itemFromQuery)) ||
			(typeof unref(options.labelKey) !== 'function' &&
				typeof unref(options.valueKey) !== 'function')
	);
	const customItem = computed<T | undefined>(() => {
		if (!toValue(options.allowCustom)) return undefined;
		if (!toValue(options.normalizedQuery)) return undefined;
		if (!canCreateWithoutFactory.value) return undefined;
		if (hasExactLabelMatch.value) return undefined;

		return createRawItemFromQuery(toValue(options.searchValue).trim());
	});

	function createRawItemFromQuery(query: string): T {
		const itemFromQuery = toValue(options.itemFromQuery);
		if (itemFromQuery) return itemFromQuery(query);

		return options.createRawRecord(query, query);
	}

	return {
		customItem
	};
}
