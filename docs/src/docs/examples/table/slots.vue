<script setup lang="ts">
	defineOptions({ name: 'TableSlotsExample' });
	import { GButton, GTable } from '@/components';

	const headers = [
		{ key: 'name', title: 'Name', minWidth: 180 },
		{ key: 'email', title: 'Email', minWidth: 220 },
		{ key: 'actions', title: '', align: 'end' as const, width: 80 }
	];

	const items = [
		{ id: 1, name: 'David', email: 'david@gradient.dev' },
		{ id: 2, name: 'Mira', email: 'mira@gradient.dev' }
	];
</script>

<template>
	<g-table
		:headers="headers"
		:items="items"
		variant="outlined">
		<template #top>
			<strong>Workspace members</strong>
		</template>

		<template #[`item.email`]="{ value }">
			<a :href="`mailto:${value}`">{{ value }}</a>
		</template>

		<template #[`item.actions`]>
			<g-button
				icon="dots-vertical"
				size="s"
				variant="text" />
		</template>

		<template #bottom> 2 members </template>
	</g-table>
</template>
