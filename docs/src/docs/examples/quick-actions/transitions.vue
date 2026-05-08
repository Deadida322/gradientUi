<script setup lang="ts">
	defineOptions({ name: 'QuickActionsTransitionsExample' });
	import { GQuickActions } from '@/components';
	import type { GQuickActionsOption } from '@/components/ui/GQuickActions';

	const actions: GQuickActionsOption[] = [
		{ label: 'Copy', value: 'copy', icon: 'content-copy' },
		{ label: 'Move', value: 'move', icon: 'folder-move-outline' },
		{ label: 'Remove', value: 'remove', icon: 'delete-outline' }
	];
</script>

<template>
	<div class="docs-component-detail__quick-actions-stage">
		<g-quick-actions
			icon="auto-fix"
			active-icon="close"
			contained
			location="bottom-left"
			label-placement="right"
			:offset="16"
			:options="actions" />
		<g-quick-actions
			icon="arrow-up-bold-box-outline"
			active-icon="close"
			contained
			location="bottom-center"
			direction="top"
			transition="slide-y-reverse"
			:offset="16"
			:options="actions" />
		<g-quick-actions
			icon="circle-expand"
			active-icon="close"
			contained
			location="top-right"
			direction="bottom"
			transition="scale"
			:offset="16"
			:options="actions" />
	</div>
</template>
