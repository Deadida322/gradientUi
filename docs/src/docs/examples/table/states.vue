<script setup lang="ts">
	defineOptions({ name: 'TableStatesExample' });
	import {
		GTable,
		type GTableRowAttrs,
		type GTableRowContext
	} from '@/components';

	const headers = [
		{ key: 'check', title: 'Check', minWidth: 180 },
		{ key: 'owner', title: 'Owner', minWidth: 160 },
		{ key: 'status', title: 'Status', align: 'end' as const, width: 140 }
	];

	const items = [
		{
			id: 1,
			check: 'Design tokens',
			owner: 'UI',
			status: 'Ready',
			state: 'success'
		},
		{
			id: 2,
			check: 'Release notes',
			owner: 'Docs',
			status: 'Review',
			state: 'warning'
		},
		{
			id: 3,
			check: 'Broken import',
			owner: 'Build',
			status: 'Blocked',
			state: 'error'
		}
	];

	const rowProps = ({ item }: GTableRowContext): GTableRowAttrs => ({
		state: item.state as GTableRowAttrs['state']
	});
</script>

<template>
	<g-table
		:headers="headers"
		:items="items"
		:row-props="rowProps"
		hover />
</template>
