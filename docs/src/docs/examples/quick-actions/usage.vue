<script setup lang="ts">
	defineOptions({ name: 'QuickActionsUsageExample' });
	import { GQuickActions } from '@/components';
	import { ref } from 'vue';
	import type { GQuickActionsOption } from '@/components/ui/GQuickActions';

	const actions: GQuickActionsOption[] = [
		{ label: 'New note', value: 'note', icon: 'note-plus-outline' },
		{ label: 'Upload asset', value: 'upload', icon: 'upload' },
		{ label: 'Invite user', value: 'invite', icon: 'account-plus-outline' }
	];
	const selectedAction = ref('');
	const onSelect = (option: GQuickActionsOption) => {
		selectedAction.value = option.label;
	};
</script>

<template>
	<div class="docs-component-detail__quick-actions-stage">
		<g-quick-actions
			icon="plus"
			active-icon="close"
			contained
			close-on-select
			variant="outlined"
			:offset="16"
			:options="actions"
			@select="onSelect" />
		<p role="status">{{ selectedAction }}</p>
	</div>
</template>
