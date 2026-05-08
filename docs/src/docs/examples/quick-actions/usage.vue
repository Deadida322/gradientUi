<script setup lang="ts">
	defineOptions({ name: 'QuickActionsUsageExample' });
	import { GQuickActions } from '@/components';
	import type { GQuickActionsOption } from '@/components/ui/GQuickActions';

	const actions: GQuickActionsOption[] = [
		{ label: 'New note', value: 'note', icon: 'note-plus-outline' },
		{ label: 'Upload asset', value: 'upload', icon: 'upload' },
		{ label: 'Invite user', value: 'invite', icon: 'account-plus-outline' }
	];
</script>

<template>
	<div class="docs-component-detail__quick-actions-stage">
		<g-quick-actions
			icon="plus"
			active-icon="close"
			contained
			:offset="16"
			:options="actions" />
	</div>
</template>
