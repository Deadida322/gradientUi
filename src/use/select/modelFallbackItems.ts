import { computed, unref } from 'vue';
import { useItems } from './items';
import { flattenSelectItems } from './selectionSummary';
import type { SelectBaseProps } from './types';
import type { MaybeRef } from 'vue';

type MaybeRefSelectProps<
	T,
	V,
	Multiple extends boolean,
	ReturnObject extends boolean
> = Pick<
	{
		[K in keyof SelectBaseProps<T, V, Multiple, ReturnObject>]: MaybeRef<
			SelectBaseProps<T, V, Multiple, ReturnObject>[K]
		>;
	},
	| 'items'
	| 'modelValue'
	| 'labelKey'
	| 'valueKey'
	| 'itemChildren'
	| 'returnObject'
>;

export type UseModelFallbackItemsOptions<
	T,
	V,
	Multiple extends boolean,
	ReturnObject extends boolean
> = MaybeRefSelectProps<T, V, Multiple, ReturnObject>;

export function useModelFallbackItems<
	T,
	V,
	Multiple extends boolean,
	ReturnObject extends boolean
>(options: UseModelFallbackItemsOptions<T, V, Multiple, ReturnObject>) {
	const baseItems = computed<readonly T[]>(() => unref(options.items));
	const { items: normalizedBaseItems, resolveValue } = useItems<T, V>({
		items: baseItems,
		labelKey: options.labelKey,
		valueKey: options.valueKey,
		itemChildren: options.itemChildren
	});
	const modelValues = computed<unknown[]>(() => {
		const value = unref(options.modelValue) as unknown;
		if (Array.isArray(value)) return value;
		return value === null || value === undefined ? [] : [value];
	});
	const modelFallbackItems = computed<readonly T[]>(() =>
		modelValues.value
			.filter((value) => !hasNormalizedMatch(value))
			.map(createRawItemFromValue)
	);
	const sourceItems = computed<readonly T[]>(() => [
		...baseItems.value,
		...modelFallbackItems.value
	]);
	const { items: normalizedSourceItems } = useItems<T, V>({
		items: sourceItems,
		labelKey: options.labelKey,
		valueKey: options.valueKey,
		itemChildren: options.itemChildren
	});

	function hasNormalizedMatch(value: unknown) {
		return flattenSelectItems(normalizedBaseItems.value).some((item) => {
			if (unref(options.returnObject)) {
				return Object.is(resolveValue(value as T), item.value);
			}

			return Object.is(value, item.value);
		});
	}

	function createRawItemFromValue(value: unknown): T {
		if (unref(options.returnObject)) return value as T;

		return createRawRecord(String(value), value);
	}

	function createRawRecord(label: string, value: unknown): T {
		const labelKey = unref(options.labelKey);
		const valueKey = unref(options.valueKey);
		const resolvedLabelKey =
			typeof labelKey === 'string' ? labelKey : 'label';
		const resolvedValueKey =
			typeof valueKey === 'string' ? valueKey : 'value';

		if (labelKey || valueKey) {
			return {
				[resolvedLabelKey]: label,
				[resolvedValueKey]: value
			} as T;
		}

		return value as T;
	}

	return {
		sourceItems,
		normalizedSourceItems,
		createRawRecord
	};
}
