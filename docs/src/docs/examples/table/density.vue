<script setup lang="ts">
	defineOptions({ name: 'TableDensityExample' });
	import { GTable } from '@/components';

	const headers = [
		{ key: 'name', title: 'Name', minWidth: 180 },
		{ key: 'team', title: 'Team', minWidth: 140 },
		{ key: 'tasks', title: 'Tasks', align: 'end' as const, width: 110 }
	];

	const items = [
		{ id: 1, name: 'David', team: 'Design system', tasks: 12 },
		{ id: 2, name: 'Mira', team: 'Foundation', tasks: 8 },
		{ id: 3, name: 'Alex', team: 'Docs', tasks: 16 }
	];
</script>

<template>
	<div class="table-examples-stack">
		<g-table
			:headers="headers"
			:items="items"
			density="compact"
			hover
			variant="outlined" />

		<g-table
			:headers="headers"
			:items="items"
			density="comfortable"
			hover
			variant="tonal" />

		<g-table
			:headers="headers"
			:items="items"
			density="spacious"
			hover
			variant="default" />
	</div>
</template>

<style scoped lang="scss">
	.table-examples-stack {
		display: grid;
		gap: var(--g-token-space-4);
		min-width: 0;
	}
</style>
