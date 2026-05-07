<script setup lang="ts">
	defineOptions({ name: 'ChipIconsExample' });
	import { GChip } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-chip
			label="Vue 3"
			prepend-icon="vuejs"
			variant="tonal" />
		<g-chip
			label="Details"
			append-icon="chevron-right"
			variant="outlined" />
		<g-chip
			label="Gradient UI"
			prepend-icon="palette-outline"
			append-icon="star-outline"
			variant="filled" />
	</div>
</template>
