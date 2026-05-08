<script setup lang="ts">
	defineOptions({ name: 'MenuUsageExample' });
	import { ref } from 'vue';
	import { GMenu } from '@/components';

	const selected = ref('tokens');
	const items = [
		{ id: 'tokens', label: 'Design tokens' },
		{ id: 'components', label: 'Components' },
		{ id: 'services', label: 'Services' },
		{ id: 'disabled', label: 'Disabled action', disabled: true }
	];
</script>

<template>
	<div class="docs-component-detail__menu-surface">
		<g-menu
			:items="items"
			:is-selected="(item) => item.id === selected"
			@select="selected = String($event.id)" />
	</div>
</template>
