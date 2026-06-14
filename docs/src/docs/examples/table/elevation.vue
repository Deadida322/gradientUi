<script setup lang="ts">
	defineOptions({ name: 'TableElevationExample' });
	import { GTable } from '@/components';

	const headers = [
		{ key: 'surface', title: 'Surface', minWidth: 170 },
		{ key: 'description', title: 'Description', minWidth: 260 },
		{
			key: 'priority',
			title: 'Priority',
			align: 'end' as const,
			width: 120
		}
	];

	const items = [
		{
			id: 1,
			surface: 'Default elevation',
			description: 'A raised table for dashboard panels and summaries',
			priority: 'Medium'
		},
		{
			id: 2,
			surface: 'Outlined elevation',
			description:
				'A bordered table that still reads as a separate surface',
			priority: 'High'
		}
	];
</script>

<template>
	<div class="table-examples-stack">
		<g-table
			:headers="headers"
			:items="items"
			elevation
			hover
			variant="default" />

		<g-table
			:headers="headers"
			:items="items"
			bordered
			color="deep-purple"
			elevation
			hover
			variant="outlined" />
	</div>
</template>

<style scoped lang="scss">
	.table-examples-stack {
		display: grid;
		gap: var(--g-token-space-5);
		min-width: 0;
		padding: var(--g-token-space-2);
	}
</style>
