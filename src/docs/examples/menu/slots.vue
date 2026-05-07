<script setup lang="ts">
	defineOptions({ name: 'MenuSlotsExample' });
	import { ref } from 'vue';
	import { GMenu } from '@/components';

	const selected = ref('buttons');
	const items = [
		{ id: 'buttons', label: 'Buttons', value: 'Stable' },
		{ id: 'chips', label: 'Chips', value: 'Compact' },
		{ id: 'drawers', label: 'Drawers', value: 'Overlay' }
	];
</script>

<template>
	<div class="docs-component-detail__menu-surface">
		<g-menu
			:items="items"
			:is-selected="(item) => item.id === selected"
			@select="selected = String($event.id)">
			<template #item="{ item, selected: active }">
				<span class="docs-component-detail__menu-item">
					<span>{{ item.label }}</span>
					<span
						class="docs-component-detail__badge"
						:data-active="active">
						{{ item.value }}
					</span>
				</span>
			</template>
		</g-menu>
	</div>
</template>
