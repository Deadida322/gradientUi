import { computed, ref, watch, type Ref } from 'vue';
import type { GTableKey, GTableProps } from './types';

interface UseTableExpansionOptions<T extends Record<string, unknown>> {
	props: GTableProps<T>;
	hasExpandedRowSlot: Ref<boolean>;
	getItemKey: (item: T, index: number) => GTableKey;
	emitUpdateExpanded: (value: GTableKey[]) => void;
	emitExpand: (item: T, expanded: boolean) => void;
}

export const useTableExpansion = <T extends Record<string, unknown>>({
	props,
	hasExpandedRowSlot,
	getItemKey,
	emitUpdateExpanded,
	emitExpand
}: UseTableExpansionOptions<T>) => {
	const expandedSet = computed(() => new Set(props.expanded ?? []));
	const mountedExpandedRows = ref<Set<GTableKey>>(
		new Set(props.expanded ?? [])
	);

	const toggleExpanded = (item: T, index: number) => {
		if (!props.showExpand) return;

		const key = getItemKey(item, index);
		const next = new Set(props.singleExpand ? [] : props.expanded);
		const isExpanded = expandedSet.value.has(key);

		if (isExpanded) {
			next.delete(key);
		} else {
			next.add(key);
		}

		const nextValue = Array.from(next);
		emitUpdateExpanded(nextValue);
		emitExpand(item, !isExpanded);
	};

	const isRowExpanded = (item: T, index: number) =>
		expandedSet.value.has(getItemKey(item, index));

	const isExpandedRowMounted = (item: T, index: number) =>
		mountedExpandedRows.value.has(getItemKey(item, index));

	const shouldRenderExpandedRow = (item: T, index: number) =>
		Boolean(
			props.showExpand &&
			hasExpandedRowSlot.value &&
			isExpandedRowMounted(item, index)
		);

	const onExpandedAfterLeave = (item: T, index: number) => {
		const next = new Set(mountedExpandedRows.value);
		next.delete(getItemKey(item, index));
		mountedExpandedRows.value = next;
	};

	watch(
		() => props.expanded ?? [],
		(value) => {
			mountedExpandedRows.value = new Set([
				...mountedExpandedRows.value,
				...value
			]);
		},
		{ immediate: true }
	);

	return {
		expandedSet,
		toggleExpanded,
		isRowExpanded,
		shouldRenderExpandedRow,
		onExpandedAfterLeave
	};
};
