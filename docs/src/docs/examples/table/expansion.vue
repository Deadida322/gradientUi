<script setup lang="ts">
	import { ref } from 'vue';
	defineOptions({ name: 'TableExpansionExample' });
	import { GTable } from '@/components';

	const expanded = ref([1]);
	const headers = [
		{ key: 'name', title: 'Release', minWidth: 180 },
		{ key: 'channel', title: 'Channel', width: 140 },
		{ key: 'date', title: 'Date', align: 'end' as const, width: 140 }
	];
	const items = [
		{
			id: 1,
			name: '0.2.0',
			channel: 'latest',
			date: 'May 14',
			notes: 'Adds GTable foundation with slots, alignment and expansion.'
		},
		{
			id: 2,
			name: '0.1.1',
			channel: 'patch',
			date: 'May 12',
			notes: 'Docs and package metadata updates.'
		}
	];
</script>

<template>
	<g-table
		v-model:expanded="expanded"
		:headers="headers"
		:items="items"
		expand-on-row-click
		hover
		show-expand>
		<template #expanded-row="{ item }">
			{{ item.notes }}
		</template>
	</g-table>
</template>
