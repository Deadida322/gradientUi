<script setup lang="ts">
	defineOptions({ name: 'ChipVariantsExample' });
	import { GChip } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-chip label="Default" />
		<g-chip
			label="Tonal"
			variant="tonal" />
		<g-chip
			label="Outlined"
			variant="outlined" />
		<g-chip
			label="Text"
			variant="text" />
		<g-chip
			label="Glass"
			variant="glass"
			color="cyan"
			:backdrop-blur="6" />
	</div>
</template>
