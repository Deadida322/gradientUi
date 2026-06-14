<script setup lang="ts">
	defineOptions({ name: 'TableVariantsExample' });
	import { GTable } from '@/components';

	const headers = [
		{ key: 'variant', title: 'Variant', minWidth: 150 },
		{ key: 'use', title: 'Best for', minWidth: 240 },
		{ key: 'tone', title: 'Tone', align: 'end' as const, width: 120 }
	];

	const items = [
		{
			id: 1,
			variant: 'Tonal',
			use: 'Default product tables with soft surface emphasis',
			tone: 'Soft'
		},
		{
			id: 2,
			variant: 'Outlined',
			use: 'Dense pages where table boundaries should be explicit',
			tone: 'Clear'
		},
		{
			id: 3,
			variant: 'Filled',
			use: 'Prominent dashboard blocks and compact summaries',
			tone: 'High'
		}
	];
</script>

<template>
	<div class="table-examples-stack">
		<g-table
			:headers="headers"
			:items="items"
			hover
			variant="tonal" />

		<g-table
			:headers="headers"
			:items="items"
			hover
			variant="outlined" />

		<g-table
			:headers="headers"
			:items="items"
			color="deep-purple"
			variant="filled" />

		<g-table
			:headers="headers"
			:items="items"
			variant="text" />
	</div>
</template>

<style scoped lang="scss">
	.table-examples-stack {
		display: grid;
		gap: var(--g-token-space-4);
		min-width: 0;
	}
</style>
