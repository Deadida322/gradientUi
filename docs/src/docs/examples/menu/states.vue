<script setup lang="ts">
	defineOptions({ name: 'MenuStatesExample' });
	import { GMenu } from '@/components';

	const items = [
		{ id: 'ready', label: 'Ready state' },
		{ id: 'review', label: 'Needs review' },
		{ id: 'blocked', label: 'Blocked item', disabled: true }
	];
</script>

<template>
	<div class="docs-component-detail__card-grid">
		<div class="docs-component-detail__menu-surface">
			<g-menu
				:items="items"
				state="success"
				:is-selected="(item) => item.id === 'ready'" />
		</div>
		<div class="docs-component-detail__menu-surface">
			<g-menu
				:items="items"
				state="warning"
				:is-selected="(item) => item.id === 'review'" />
		</div>
		<div class="docs-component-detail__menu-surface">
			<g-menu
				:items="items"
				state="error"
				:is-selected="(item) => item.id === 'blocked'" />
		</div>
	</div>
</template>
