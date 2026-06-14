<script setup generic="T extends Record<string, unknown>" lang="ts">
	import { useSlots } from 'vue';
	import GTableRow from './GTableRow.vue';
	import GTableExpandedRow from './GTableExpandedRow.vue';
	import { useTableContext } from './context';

	defineOptions({ name: 'GTableBody' });

	defineProps<{
		hasRows: boolean;
		loading?: boolean;
		loadingRows?: number;
		emptyText?: string;
		showExpand?: boolean;
		hasExpandedRowSlot?: boolean;
	}>();

	const slots = useSlots();
	const table = useTableContext<T>();
</script>

<template>
	<tbody class="g-table__body">
		<slot
			v-if="slots.body"
			name="body"
			:column-count="table.columnCount.value"
			:classes="table.bodySlotClasses"
			:get-cell-context="table.getCellContext"
			:get-row-context="table.getRowContext"
			:headers="table.headers.value"
			:items="table.items.value"></slot>

		<tr
			v-else-if="loading"
			class="g-table__row g-table__row_state">
			<td
				class="g-table__cell g-table__cell_state"
				:colspan="table.columnCount.value">
				<slot name="loading">
					<div
						aria-hidden="true"
						class="g-table__skeleton">
						<span
							v-for="row in loadingRows"
							:key="row"
							class="g-table__skeleton-row"></span>
					</div>
				</slot>
			</td>
		</tr>

		<tr
			v-else-if="!hasRows"
			class="g-table__row g-table__row_state">
			<td
				class="g-table__cell g-table__cell_state"
				:colspan="table.columnCount.value">
				<div class="g-table__empty">
					<slot name="empty">
						<span class="g-table__empty-text">
							{{ emptyText }}
						</span>
					</slot>
				</div>
			</td>
		</tr>

		<template v-else>
			<template
				v-for="(item, rowIndex) in table.items.value"
				:key="table.getItemKey(item, rowIndex)">
				<slot
					v-if="slots.row"
					name="row"
					v-bind="{
						...table.getRowContext(item, rowIndex),
						headers: table.headers.value
					}"></slot>

				<g-table-row
					v-else
					:item="item"
					:row-index="rowIndex"
					:show-expand="showExpand">
					<template
						v-if="slots.expand"
						#expand="slotProps">
						<slot
							name="expand"
							v-bind="slotProps"></slot>
					</template>
					<template #item="slotProps">
						<slot
							name="item"
							v-bind="slotProps">
							{{ slotProps.value }}
						</slot>
					</template>
					<template
						v-for="header in table.headers.value"
						:key="String(header.key)"
						#[table.getItemSlotName(header)]="slotProps">
						<slot
							:name="table.getItemSlotName(header)"
							v-bind="slotProps"></slot>
					</template>
				</g-table-row>

				<g-table-expanded-row
					v-if="showExpand && hasExpandedRowSlot"
					:item="item"
					:row-index="rowIndex">
					<template #expanded-row="slotProps">
						<slot
							name="expanded-row"
							v-bind="slotProps"></slot>
					</template>
				</g-table-expanded-row>
			</template>
		</template>
	</tbody>
</template>
