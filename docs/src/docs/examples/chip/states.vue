<script setup lang="ts">
	defineOptions({ name: 'ChipStatesExample' });
	import { GChip } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-chip
			label="Success"
			state="success" />
		<g-chip
			label="Warning"
			variant="tonal"
			state="warning" />
		<g-chip
			label="Error"
			variant="outlined"
			state="error" />
		<g-chip
			label="Selected"
			variant="tonal"
			active
			active-color="pink" />
		<g-chip
			label="Disabled"
			disabled />
	</div>
</template>
