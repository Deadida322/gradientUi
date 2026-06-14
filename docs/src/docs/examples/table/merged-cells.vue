<script setup lang="ts">
	defineOptions({ name: 'TableMergedCellsExample' });
	import {
		GTable,
		type GTableCellSpan,
		type GTableRowAttrs,
		type GTableRowContext
	} from '@/components';

	const headers = [
		{ key: 'name', title: 'Name', minWidth: 180 },
		{ key: 'role', title: 'Role', width: 160 },
		{ key: 'team', title: 'Team', width: 140 },
		{ key: 'load', title: 'Load', align: 'end' as const, width: 100 }
	];

	const items = [
		{ id: 'core', type: 'group', name: 'Core team' },
		{ id: 1, name: 'Mira', role: 'Designer', team: 'Core', load: '80%' },
		{
			id: 'core-note',
			type: 'note',
			role: 'Shared focus',
			team: 'Design + engineering'
		},
		{ id: 2, name: 'Alex', role: 'Engineer', team: 'Core', load: '64%' },
		{ id: 'growth', type: 'group', name: 'Growth team' },
		{ id: 3, name: 'Nika', role: 'PM', team: 'Growth', load: '72%' }
	];

	const spans: GTableCellSpan[] = [
		{
			row: 'core',
			column: 'name',
			colspan: headers.length,
			class: 'g-table__cell_group'
		},
		{
			row: 'growth',
			column: 'name',
			colspan: headers.length,
			class: 'g-table__cell_group'
		},
		{
			row: 'core-note',
			column: 'role',
			colspan: 2,
			state: 'success'
		}
	];

	const rowProps = ({ item }: GTableRowContext): GTableRowAttrs =>
		item.type === 'note' ? { state: 'success' as const } : {};
</script>

<template>
	<div class="table-examples-stack">
		<g-table
			:headers="headers"
			:items="items"
			:row-props="rowProps"
			:spans="spans"
			striped />

		<g-table
			:headers="headers"
			:items="items"
			bordered
			variant="outlined">
			<template #body="{ items: rows, headers: columns, classes }">
				<tr
					v-for="item in rows"
					:key="String(item.id)"
					:class="classes.nativeRow">
					<td
						v-if="item.type === 'group'"
						:class="classes.groupCell"
						:colspan="columns.length">
						{{ item.name }}
					</td>

					<template v-else>
						<td :class="classes.nativeCell">{{ item.name }}</td>
						<td
							v-if="item.type === 'note'"
							:class="classes.groupCell"
							colspan="2">
							{{ item.role }} — {{ item.team }}
						</td>
						<template v-else>
							<td :class="classes.nativeCell">{{ item.role }}</td>
							<td :class="classes.nativeCell">{{ item.team }}</td>
						</template>
						<td :class="classes.nativeCellEnd">
							{{ item.load }}
						</td>
					</template>
				</tr>
			</template>
		</g-table>
	</div>
</template>

<style scoped lang="scss">
	.table-examples-stack {
		display: grid;
		gap: var(--g-token-space-5);
		min-width: 0;
	}
</style>
