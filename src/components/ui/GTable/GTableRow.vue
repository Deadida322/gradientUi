<script setup generic="T extends Record<string, unknown>" lang="ts">
	import { computed } from 'vue';
	import GButton from '@/components/ui/GButton/GButton.vue';
	import GTableCell from './GTableCell.vue';
	import { useTableContext } from './context';

	defineOptions({ name: 'GTableRow' });

	const props = defineProps<{
		item: T;
		rowIndex: number;
		showExpand?: boolean;
	}>();

	const table = useTableContext<T>();
	const rowContext = computed(() =>
		table.getRowContext(props.item, props.rowIndex)
	);
	const rowAttrs = computed(() =>
		table.getRowAttrs(props.item, props.rowIndex)
	);

	const onKeydown = (event: KeyboardEvent) => {
		if (!table.rowInteractive.value) return;
		if (event.key !== 'Enter' && event.key !== ' ') return;

		event.preventDefault();

		if (event.key === ' ' && event.repeat) return;
		table.onRowClick(props.item, props.rowIndex, event);
	};
</script>

<template>
	<tr
		class="g-table__row"
		:class="[
			{
				'g-table__row_expanded': rowContext.expanded,
				'g-table__row_interactive': table.rowInteractive.value,
				[`g-table__row_state-${rowAttrs.state}`]: rowAttrs.state
			},
			rowAttrs.class
		]"
		:style="rowAttrs.style"
		:tabindex="table.rowInteractive.value ? 0 : undefined"
		@click="table.onRowClick(item, rowIndex, $event)"
		@keydown="onKeydown">
		<td
			v-if="showExpand"
			class="g-table__cell g-table__cell_expand">
			<slot
				name="expand"
				v-bind="table.getRowContext(item, rowIndex)">
				<g-button
					:aria-expanded="table.isRowExpanded(item, rowIndex)"
					:icon-button="
						table.isRowExpanded(item, rowIndex)
							? 'chevron-up'
							: 'chevron-down'
					"
					class="g-table__expand-button"
					:ripple="false"
					size="s"
					variant="text"
					@click.stop="table.toggleExpanded(item, rowIndex)" />
			</slot>
		</td>

		<g-table-cell
			v-for="(header, columnIndex) in table.headers.value"
			:key="String(header.key)"
			:column-index="columnIndex"
			:header="header"
			:item="item"
			:row-index="rowIndex">
			<template #item="slotProps">
				<slot
					name="item"
					v-bind="slotProps">
					{{ slotProps.value }}
				</slot>
			</template>
			<template
				v-for="headerSlot in table.headers.value"
				:key="String(headerSlot.key)"
				#[table.getItemSlotName(headerSlot)]="slotProps">
				<slot
					:name="table.getItemSlotName(headerSlot)"
					v-bind="slotProps"></slot>
			</template>
		</g-table-cell>
	</tr>
</template>
