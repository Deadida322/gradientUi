<script setup lang="ts">
	defineOptions({ name: 'ChipColorsExample' });
	import { GChip } from '@/components';
	import type { GColor } from '@/use/color';

	const colors = [
		'primary',
		'pink',
		'deep-purple',
		'cyan',
		'teal',
		'orange'
	] as const satisfies readonly GColor[];
</script>

<template>
	<div class="docs-component-detail__matrix">
		<g-chip
			v-for="color in colors"
			:key="color"
			:label="color"
			:color="color" />
		<g-chip
			v-for="color in colors"
			:key="`${color}-tonal`"
			:label="color"
			:color="color"
			variant="tonal" />
		<g-chip
			v-for="color in colors"
			:key="`${color}-outlined`"
			:label="color"
			:color="color"
			variant="outlined"
			:border-width="2" />
	</div>
</template>
