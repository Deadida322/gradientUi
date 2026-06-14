<script setup lang="ts">
	defineOptions({ name: 'TableStickyFixedExample' });
	import { GTable } from '@/components';

	const headers = [
		{
			key: 'project',
			title: 'Project',
			fixed: 'start' as const,
			width: 180
		},
		{ key: 'owner', title: 'Owner', width: 140 },
		{ key: 'phase', title: 'Phase', width: 150 },
		{ key: 'risk', title: 'Risk', align: 'center' as const, width: 110 },
		{ key: 'scope', title: 'Scope', width: 160 },
		{ key: 'region', title: 'Region', width: 140 },
		{ key: 'updated', title: 'Updated', width: 140 },
		{
			key: 'budget',
			title: 'Budget',
			align: 'end' as const,
			fixed: 'end' as const,
			width: 140
		}
	];

	const items = [
		{
			id: 1,
			project: 'Gradient docs',
			owner: 'Design',
			phase: 'Polish',
			risk: 'Low',
			scope: 'Components',
			region: 'EU',
			updated: 'Today',
			budget: '$12,400'
		},
		{
			id: 2,
			project: 'Billing portal',
			owner: 'Product',
			phase: 'Review',
			risk: 'Medium',
			scope: 'Payments',
			region: 'US',
			updated: 'Yesterday',
			budget: '$8,900'
		},
		{
			id: 3,
			project: 'Mobile shell',
			owner: 'Platform',
			phase: 'Build',
			risk: 'Low',
			scope: 'Navigation',
			region: 'Global',
			updated: 'May 28',
			budget: '$4,120'
		},
		{
			id: 4,
			project: 'Analytics sync',
			owner: 'Data',
			phase: 'Discovery',
			risk: 'High',
			scope: 'Events',
			region: 'APAC',
			updated: 'May 26',
			budget: '$16,700'
		},
		{
			id: 5,
			project: 'Checkout QA',
			owner: 'Quality',
			phase: 'Testing',
			risk: 'Medium',
			scope: 'Flows',
			region: 'US',
			updated: 'May 22',
			budget: '$6,300'
		},
		{
			id: 6,
			project: 'Theme tokens',
			owner: 'Design',
			phase: 'Ship',
			risk: 'Low',
			scope: 'Styles',
			region: 'Global',
			updated: 'May 20',
			budget: '$3,800'
		},
		{
			id: 7,
			project: 'Access audit',
			owner: 'Security',
			phase: 'Review',
			risk: 'High',
			scope: 'Roles',
			region: 'EU',
			updated: 'May 18',
			budget: '$10,200'
		}
	];
</script>

<template>
	<div class="table-sticky-fixed-example">
		<g-table
			:headers="headers"
			:items="items"
			aria-label="Sticky header and fixed column example"
			bordered
			fixed-layout
			hover
			sticky-header
			variant="outlined" />
	</div>
</template>

<style scoped lang="scss">
	.table-sticky-fixed-example {
		:deep(.g-table__scroller) {
			max-height: 320px;
		}

		:deep(.g-table__table) {
			min-width: 1150px;
		}
	}
</style>
