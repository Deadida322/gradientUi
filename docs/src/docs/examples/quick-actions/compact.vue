<script setup lang="ts">
	defineOptions({ name: 'QuickActionsCompactExample' });
	import { GQuickActions } from '@/components';
	import type { GQuickActionsOption } from '@/components/ui/GQuickActions';

	const actions: GQuickActionsOption[] = [
		{ label: 'Duplicate', value: 'duplicate', icon: 'content-copy' },
		{ label: 'Archive', value: 'archive', icon: 'archive-outline' },
		{ label: 'Delete', value: 'delete', icon: 'delete-outline' }
	];
</script>

<template>
	<div class="docs-component-detail__quick-actions-stage">
		<g-quick-actions
			icon="dots-horizontal"
			active-icon="close"
			contained
			:offset="16"
			:options="actions" />
	</div>
</template>
