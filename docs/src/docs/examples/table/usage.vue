<script setup lang="ts">
	defineOptions({ name: 'TableUsageExample' });
	import { GChip, GTable } from '@/components';

	const headers = [
		{ key: 'project', title: 'Project', minWidth: 180 },
		{ key: 'owner', title: 'Owner', minWidth: 140 },
		{
			key: 'status',
			title: 'Status',
			align: 'center' as const,
			width: 140
		},
		{ key: 'budget', title: 'Budget', align: 'end' as const, width: 130 }
	];

	const items = [
		{
			id: 1,
			project: 'Gradient docs',
			owner: 'Design',
			status: 'Active',
			budget: '$12,400'
		},
		{
			id: 2,
			project: 'Billing portal',
			owner: 'Product',
			status: 'Review',
			budget: '$8,900'
		},
		{
			id: 3,
			project: 'Mobile shell',
			owner: 'Platform',
			status: 'Paused',
			budget: '$4,120'
		}
	];
</script>

<template>
	<g-table
		:headers="headers"
		:items="items"
		hover
		rounded>
		<template #[`item.status`]="{ value }">
			<g-chip
				:color="value === 'Active' ? 'success' : 'warning'"
				size="s"
				variant="tonal">
				{{ value }}
			</g-chip>
		</template>
	</g-table>
</template>
