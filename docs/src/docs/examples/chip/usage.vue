<script setup lang="ts">
	defineOptions({ name: 'ChipUsageExample' });
	import { GChip } from '@/components';
</script>

<template>
	<div class="docs-component-detail__intro">
		<g-chip
			label="Design tokens"
			variant="tonal"
			color="deep-purple"
			prepend-icon="palette-outline" />
		<g-chip
			label="Selected"
			color="teal"
			active
			append-icon="check" />
		<g-chip
			label="Removable"
			variant="outlined"
			color="pink"
			removable />
	</div>
</template>
