<script setup lang="ts">
	defineOptions({ name: 'ChipVariantsExample' });
	import { GChip } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-chip label="Default" />
		<g-chip
			label="Filled"
			variant="filled" />
		<g-chip
			label="Tonal"
			variant="tonal" />
		<g-chip
			label="Outlined"
			variant="outlined" />
		<g-chip
			label="Text"
			variant="text" />
	</div>
</template>
