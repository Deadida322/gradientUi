<script setup lang="ts">
	defineOptions({ name: 'QuickActionsCustomTransitionExample' });
	import { GQuickActions } from '@/components';
	import type { GQuickActionsOption } from '@/components/ui/GQuickActions';

	const actions: GQuickActionsOption[] = [
		{ label: 'Morning', value: 'morning', icon: 'weather-sunset-up' },
		{ label: 'Focus', value: 'focus', icon: 'bullseye-arrow' },
		{ label: 'Done', value: 'done', icon: 'check-circle-outline' }
	];
</script>

<template>
	<div class="docs-component-detail__quick-actions-stage">
		<g-quick-actions
			icon="creation-outline"
			active-icon="close"
			contained
			location="bottom-right"
			label-placement="left"
			:offset="16"
			:options="actions"
			:transition="{
				name: 'scale',
				duration: 420,
				scale: 0.9,
				origin: 'bottom right'
			}" />
	</div>
</template>
