import { computed, unref, type MaybeRef } from 'vue';
import type { InternalItem } from './types';

type ItemKey<T> = Extract<keyof T, string | number | symbol>;
type labelKey<T> = ItemKey<T> | ((item: T) => string);
type ItemChildren<T> = ItemKey<T> | ((item: T) => readonly T[] | undefined);

interface UseItemsOptionsBase<T> {
	items: MaybeRef<readonly T[]>;
	labelKey?: MaybeRef<labelKey<T> | undefined>;
	itemChildren?: MaybeRef<ItemChildren<T> | undefined>;
}

interface UseItemsOptionsWithValueKey<
	T,
	K extends ItemKey<T>
> extends UseItemsOptionsBase<T> {
	valueKey?: MaybeRef<K | undefined>;
}

interface UseItemsOptionsWithValueGetter<T, V> extends UseItemsOptionsBase<T> {
	valueKey?: MaybeRef<((item: T) => V) | undefined>;
}

export function useItems<T, K extends ItemKey<T>>(
	options: UseItemsOptionsWithValueKey<T, K>
): {
	items: Readonly<ReturnType<typeof computed<InternalItem<T, T[K]>[]>>>;
	resolveLabel: (item: T) => string;
	resolveValue: (item: T) => T[K];
};

export function useItems<T, V = unknown>(
	options: UseItemsOptionsWithValueGetter<T, V>
): {
	items: Readonly<ReturnType<typeof computed<InternalItem<T, V>[]>>>;
	resolveLabel: (item: T) => string;
	resolveValue: (item: T) => V;
};

export function useItems<T, V = unknown>(
	options:
		| UseItemsOptionsWithValueKey<T, ItemKey<T>>
		| UseItemsOptionsWithValueGetter<T, V>
) {
	function resolveLabel(item: T): string {
		const labelKey = unref(options.labelKey);

		if (typeof labelKey === 'function') {
			return labelKey(item);
		}

		if (labelKey !== undefined) {
			return String(item[labelKey]);
		}

		return String((item as Record<string, unknown>).label ?? '');
	}

	function resolveValue(item: T): V {
		const valueKey = unref(options.valueKey);
		console.log(item, 'item');
		if (typeof valueKey === 'function') {
			return valueKey(item);
		}

		if (valueKey !== undefined && item) {
			return item[valueKey] as V;
		}

		return (item as Record<string, unknown>).value as V;
	}

	function normalize(item: T): InternalItem<T, V> {
		const itemChildren = unref(options.itemChildren);
		const childrenRaw =
			typeof itemChildren === 'function'
				? itemChildren(item)
				: itemChildren
					? (item[itemChildren] as readonly T[] | undefined)
					: ((item as Record<string, unknown>).children as
							| readonly T[]
							| undefined);

		return {
			label: resolveLabel(item),
			value: resolveValue(item),
			raw: item,
			children: childrenRaw?.map(normalize) as
				| InternalItem<T, V>[]
				| undefined
		};
	}

	const normalizedItems = computed(() => unref(options.items).map(normalize));

	return {
		items: normalizedItems,
		resolveLabel,
		resolveValue
	};
}
