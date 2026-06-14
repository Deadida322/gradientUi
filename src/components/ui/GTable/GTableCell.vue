<script setup generic="T extends Record<string, unknown>" lang="ts">
	import { computed } from 'vue';
	import { useTableContext } from './context';
	import type { GTableHeader } from './types';

	defineOptions({ name: 'GTableCell' });

	const props = defineProps<{
		item: T;
		header: GTableHeader<T>;
		rowIndex: number;
		columnIndex: number;
	}>();

	const table = useTableContext<T>();
	const cellContext = computed(() =>
		table.getCellContext(
			props.item,
			props.header,
			props.rowIndex,
			props.columnIndex
		)
	);
	const cellAttrs = computed(() => table.getCellAttrs(cellContext.value));
	const fixedAttrs = computed(() =>
		table.getColumnFixedAttrs(props.header, props.columnIndex)
	);
</script>

<template>
	<td
		v-if="!cellAttrs.hidden"
		class="g-table__cell"
		:class="[
			`g-table__cell_align-${table.getAlign(header)}`,
			{
				'g-table__cell_nowrap': header.nowrap,
				'g-table__cell_shrink': header.shrink,
				[`g-table__cell_state-${cellAttrs.state}`]: cellAttrs.state
			},
			fixedAttrs.class,
			header.cellClass,
			cellAttrs.class
		]"
		:style="[fixedAttrs.style, cellAttrs.style]"
		:colspan="cellAttrs.colspan"
		:rowspan="cellAttrs.rowspan"
		@click="table.onCellClick(cellContext, $event)">
		<div class="g-table__cell-content">
			<slot
				:name="table.getItemSlotName(header)"
				v-bind="cellContext">
				<slot
					name="item"
					v-bind="cellContext">
					{{ cellContext.value }}
				</slot>
			</slot>
		</div>
	</td>
</template>
