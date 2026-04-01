import { computed } from 'vue';
interface UseItemsOptions<T, V> {
	items: T[];
	labelKey?: keyof T | ((item: T) => string);
	valueKey?: keyof T | ((item: T) => V);
	itemChildren?: keyof T;
	returnObject?: boolean;
}

export interface InternalItem<T, V = unknown> {
	label: string;
	value: V;
	raw: T;
	disabled?: boolean;
	children?: InternalItem<T, V>[];
}

export function useItems<T, V = unknown>(options: UseItemsOptions<T, V>) {
	const {
		items,
		labelKey = 'label',
		valueKey = 'value',
		itemChildren
	} = options;

	function resolveLabel(item: T): string {
		if (typeof labelKey === 'function') {
			return labelKey(item);
		}
		return String(item[labelKey as keyof T]);
	}

	function resolveValue(item: T): V {
		if (typeof valueKey === 'function') {
			return valueKey(item);
		}
		return item[valueKey as keyof T] as V;
	}

	function normalize(item: T): InternalItem<T, V> {
		const childrenRaw = itemChildren
			? (item[itemChildren as keyof T] as T[])
			: undefined;

		return {
			label: resolveLabel(item),
			value: resolveValue(item),
			raw: item,
			children: childrenRaw?.map(normalize)
		};
	}

	const normalizedItems = computed(() => items.map(normalize));

	return {
		items: normalizedItems,
		resolveLabel,
		resolveValue
	};
}
