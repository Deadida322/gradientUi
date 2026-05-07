<script setup lang="ts">
	defineOptions({ name: 'MenuNestedExample' });
	import { ref } from 'vue';
	import { GMenu } from '@/components';

	const selected = ref('palette');
	const items = [
		{
			id: 'foundation',
			label: 'Foundation',
			children: [
				{ id: 'palette', label: 'Palette' },
				{ id: 'gradients', label: 'Gradients' },
				{ id: 'typography', label: 'Typography' }
			]
		},
		{
			id: 'components',
			label: 'Components',
			children: [
				{ id: 'buttons', label: 'Buttons' },
				{ id: 'menus', label: 'Menus' },
				{ id: 'overlays', label: 'Overlays' }
			]
		},
		{ id: 'migration', label: 'Migration guide' }
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
