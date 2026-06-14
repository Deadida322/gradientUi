<script setup generic="T extends Record<string, unknown>" lang="ts">
	import { computed } from 'vue';
	import type { GTableCellAttrs, GTableHeader } from './types';

	defineOptions({ name: 'GTableHead' });

	const props = defineProps<{
		headers: GTableHeader<T>[];
		showExpand?: boolean;
		getHeaderStyle: (
			header: GTableHeader<T>
		) => Record<string, string | undefined>;
		getHeaderAlign: (header: GTableHeader<T>) => string;
		getHeaderAttrs: (
			header: GTableHeader<T>,
			index: number
		) => GTableCellAttrs;
		getColumnFixedAttrs: (
			header: GTableHeader<T>,
			index: number
		) => GTableCellAttrs;
		getHeaderSlotName: (header: GTableHeader<T>) => string;
	}>();

	const headerCells = computed(() =>
		props.headers.map((header, index) => ({
			header,
			index,
			attrs: props.getHeaderAttrs(header, index),
			fixedAttrs: props.getColumnFixedAttrs(header, index)
		}))
	);
</script>

<template>
	<thead class="g-table__head">
		<tr class="g-table__row g-table__row_header">
			<th
				v-if="showExpand"
				class="g-table__header g-table__header_expand"
				scope="col"></th>

			<template
				v-for="cell in headerCells"
				:key="String(cell.header.key)">
				<th
					v-if="!cell.attrs.hidden"
					class="g-table__header"
					:class="[
						`g-table__header_align-${getHeaderAlign(cell.header)}`,
						{
							'g-table__header_nowrap': cell.header.nowrap,
							'g-table__header_shrink': cell.header.shrink,
							[`g-table__header_state-${cell.attrs.state}`]:
								cell.attrs.state
						},
						cell.fixedAttrs.class,
						cell.header.headerClass,
						cell.attrs.class
					]"
					:style="[
						getHeaderStyle(cell.header),
						cell.fixedAttrs.style,
						cell.attrs.style
					]"
					:colspan="cell.attrs.colspan"
					:rowspan="cell.attrs.rowspan"
					scope="col">
					<div class="g-table__header-content">
						<slot
							:name="getHeaderSlotName(cell.header)"
							:header="cell.header"
							:index="cell.index">
							<slot
								name="header"
								:header="cell.header"
								:index="cell.index">
								{{ cell.header.title }}
							</slot>
						</slot>
					</div>
				</th>
			</template>
		</tr>
	</thead>
</template>
