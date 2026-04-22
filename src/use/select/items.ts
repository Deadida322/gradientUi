import { computed, unref, type MaybeRef } from 'vue';
import type {
	InternalItem,
	SelectItemChildren,
	SelectLabelKey,
	SelectValueKey
} from './types';

interface UseItemsOptions<T, V> {
	items: MaybeRef<readonly T[]>;
	labelKey?: MaybeRef<SelectLabelKey<T> | undefined>;
	valueKey?: MaybeRef<SelectValueKey<T, V> | undefined>;
	itemChildren?: MaybeRef<SelectItemChildren<T> | undefined>;
}

export function useItems<T, V = unknown>(options: UseItemsOptions<T, V>) {
	function resolveLabel(item: T): string {
		const labelKey = unref(options.labelKey);

		if (typeof labelKey === 'function') {
			return labelKey(item);
		}

		if (labelKey !== undefined) {
			return String(item[labelKey]);
		}

		if (isRecord(item) && 'label' in item) {
			return String(item.label);
		}

		return String(item);
	}

	function resolveValue(item: T): V {
		const valueKey = unref(options.valueKey);

		if (typeof valueKey === 'function') {
			return valueKey(item);
		}

		if (valueKey !== undefined && item) {
			return item[valueKey] as V;
		}

		if (isRecord(item) && 'value' in item) {
			return item.value as V;
		}

		return item as unknown as V;
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
			disabled: Boolean(
				(item as Record<string, unknown>).disabled ?? false
			),
			children: childrenRaw?.map(normalize) as
				| InternalItem<T, V>[]
				| undefined
		};
	}

	const normalizedItems = computed(() => {
		const source = unref(options.items) ?? [];
		return source.map(normalize);
	});

	return {
		items: normalizedItems,
		resolveLabel,
		resolveValue
	};
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}
