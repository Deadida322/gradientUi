<script setup lang="ts">
	defineOptions({ name: 'QuickActionsDirectionsExample' });
	import { GQuickActions } from '@/components';
	import type { GQuickActionsOption } from '@/components/ui/GQuickActions';

	const actions: GQuickActionsOption[] = [
		{ label: 'Brush', value: 'brush', icon: 'brush-outline' },
		{ label: 'Palette', value: 'palette-outline', icon: 'palette-outline' },
		{ label: 'Crop', value: 'crop', icon: 'crop' }
	];
</script>

<template>
	<div class="docs-component-detail__quick-actions-stage">
		<g-quick-actions
			icon="image-edit-outline"
			active-icon="close"
			contained
			location="bottom-left"
			direction="right"
			label-placement="right"
			transition="slide-x-reverse"
			:offset="16"
			:options="actions" />
		<g-quick-actions
			icon="tune"
			active-icon="close"
			contained
			location="bottom-right"
			direction="left"
			label-placement="left"
			transition="slide-x"
			:offset="16"
			:options="actions" />
	</div>
</template>
