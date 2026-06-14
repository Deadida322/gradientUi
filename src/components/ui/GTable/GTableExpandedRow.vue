<script setup generic="T extends Record<string, unknown>" lang="ts">
	import { GExpandTransition } from '@/components/transitions';
	import { useTableContext } from './context';

	defineOptions({ name: 'GTableExpandedRow' });

	defineProps<{
		item: T;
		rowIndex: number;
	}>();

	const table = useTableContext<T>();
</script>

<template>
	<tr class="g-table__row g-table__row_expanded-content">
		<td
			class="g-table__cell g-table__cell_expanded"
			:colspan="table.columnCount.value">
			<g-expand-transition
				:duration="240"
				@after-leave="table.onExpandedAfterLeave(item, rowIndex)">
				<div
					v-if="table.shouldRenderExpandedRow(item, rowIndex)"
					v-show="table.isRowExpanded(item, rowIndex)"
					class="g-table__expanded-body">
					<div class="g-table__expanded-content">
						<slot
							name="expanded-row"
							v-bind="{
								...table.getRowContext(item, rowIndex),
								headers: table.headers.value
							}"></slot>
					</div>
				</div>
			</g-expand-transition>
		</td>
	</tr>
</template>
