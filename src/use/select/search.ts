import { computed, shallowRef, toValue, watch } from 'vue';
import type { ComputedRef, MaybeRefOrGetter } from 'vue';

export interface UseSelectSearchOptions {
	search?: MaybeRefOrGetter<string | undefined>;
	selectionText?: ComputedRef<string>;
	isMultiple?: MaybeRefOrGetter<boolean>;
	onSearch: (value: string) => void;
}

export const normalizeSelectSearch = (value: string) =>
	value.trim().toLocaleLowerCase();

export function useSelectSearch(options: UseSelectSearchOptions) {
	const internalSearch = shallowRef(toValue(options.search) ?? '');
	const searchValue = computed(
		() => toValue(options.search) ?? internalSearch.value
	);
	const normalizedQuery = computed(() =>
		normalizeSelectSearch(searchValue.value)
	);

	watch(
		() => toValue(options.search),
		(value) => {
			if (value !== undefined) {
				internalSearch.value = value;
			}
		}
	);

	if (options.selectionText && options.isMultiple !== undefined) {
		syncSelectionText(options.selectionText, options.isMultiple);
	}

	function syncSelectionText(
		selectionText: ComputedRef<string>,
		isMultiple: MaybeRefOrGetter<boolean>
	) {
		watch(
			selectionText,
			(value) => {
				if (
					!toValue(isMultiple) &&
					toValue(options.search) === undefined
				) {
					internalSearch.value = value;
				}
			},
			{ immediate: true }
		);
	}

	function setSearch(value: string) {
		internalSearch.value = value;
		options.onSearch(value);
	}

	return {
		searchValue,
		normalizedQuery,
		setSearch,
		syncSelectionText
	};
}
