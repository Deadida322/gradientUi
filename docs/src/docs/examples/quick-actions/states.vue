<script setup lang="ts">
	defineOptions({ name: 'QuickActionsStatesExample' });
	import { GQuickActions } from '@/components';
	import type { GQuickActionsOption } from '@/components/ui/GQuickActions';

	const actions: GQuickActionsOption[] = [
		{ label: 'Approve', value: 'approve', icon: 'check' },
		{ label: 'Review', value: 'review', icon: 'eye-outline' },
		{ label: 'Reject', value: 'reject', icon: 'close' }
	];
</script>

<template>
	<div class="docs-component-detail__quick-actions-stage">
		<g-quick-actions
			icon="clipboard-check-outline"
			active-icon="close"
			contained
			location="bottom-left"
			label-placement="right"
			:offset="16"
			:options="actions" />
		<g-quick-actions
			icon="alert-outline"
			active-icon="close"
			contained
			location="top-right"
			label-placement="left"
			transition="slide-y"
			:offset="16"
			:options="actions" />
	</div>
</template>
