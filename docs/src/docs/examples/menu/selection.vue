<script setup lang="ts">
	defineOptions({ name: 'MenuSelectionExample' });
	import { ref } from 'vue';
	import { GMenu } from '@/components';

	const selected = ref('tonal');
	const items = [
		{ id: 'gradient', label: 'gradient surfaces' },
		{ id: 'tonal', label: 'Tonal surfaces' },
		{ id: 'outlined', label: 'Outlined surfaces' },
		{ id: 'text', label: 'Text surfaces' }
	];
</script>

<template>
	<div class="docs-component-detail__stack">
		<p class="docs-component-detail__value-line">
			Selected: <code>{{ selected }}</code>
		</p>
		<div class="docs-component-detail__menu-surface">
			<g-menu
				:items="items"
				state="success"
				:is-selected="(item) => item.id === selected"
				@select="selected = String($event.id)" />
		</div>
	</div>
</template>
