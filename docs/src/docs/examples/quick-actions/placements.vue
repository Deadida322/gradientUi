<script setup lang="ts">
	defineOptions({ name: 'QuickActionsPlacementsExample' });
	import { GQuickActions } from '@/components';
	import type { GQuickActionsOption } from '@/components/ui/GQuickActions';

	const actions: GQuickActionsOption[] = [
		{ label: 'Edit', value: 'edit', icon: 'pencil-outline' },
		{ label: 'Share', value: 'share', icon: 'share-variant-outline' },
		{ label: 'Pin', value: 'pin', icon: 'pin-outline' }
	];
</script>

<template>
	<div class="docs-component-detail__quick-actions-stage">
		<g-quick-actions
			icon="plus"
			active-icon="close"
			contained
			location="bottom-left"
			label-placement="right"
			:offset="16"
			:options="actions" />
		<g-quick-actions
			icon="dots-horizontal"
			active-icon="close"
			contained
			location="top-right"
			label-placement="left"
			:offset="16"
			:options="actions" />
	</div>
</template>
