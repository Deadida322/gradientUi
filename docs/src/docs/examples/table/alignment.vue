<script setup lang="ts">
	defineOptions({ name: 'TableAlignmentExample' });
	import { GTable } from '@/components';

	const headers = [
		{ key: 'metric', title: 'Metric', minWidth: 180 },
		{
			key: 'current',
			title: 'Current',
			align: 'end' as const,
			headerAlign: 'center' as const,
			width: 140
		},
		{
			key: 'target',
			title: 'Target',
			align: 'end' as const,
			headerAlign: 'center' as const,
			width: 140
		},
		{ key: 'trend', title: 'Trend', align: 'center' as const, width: 110 }
	];

	const items = [
		{
			id: 1,
			metric: 'Activation',
			current: '68%',
			target: '74%',
			trend: '+6%'
		},
		{
			id: 2,
			metric: 'Retention',
			current: '41%',
			target: '45%',
			trend: '+4%'
		},
		{
			id: 3,
			metric: 'Revenue',
			current: '$21k',
			target: '$24k',
			trend: '+14%'
		}
	];
</script>

<template>
	<g-table
		:headers="headers"
		:items="items"
		bordered
		density="compact"
		variant="outlined" />
</template>
