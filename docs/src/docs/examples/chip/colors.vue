<script setup lang="ts">
	defineOptions({ name: 'ChipColorsExample' });
	import { GChip } from '@/components';

	const colors = ['primary', 'pink', 'deep-purple', 'cyan', 'teal', 'orange'];
</script>

<template>
	<div class="docs-component-detail__matrix">
		<g-chip
			v-for="color in colors"
			:key="color"
			:label="color"
			:color="color"
			variant="filled"
			prepend-icon="palette" />
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
