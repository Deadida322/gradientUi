<script setup lang="ts">
	defineOptions({ name: 'ChipGradientExample' });
	import { GChip } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-chip
			label="Gradient"
			variant="gradient" />
		<g-chip
			label="Selected gradient"
			variant="gradient"
			active />
		<g-chip
			v-specular="{
				color: 'primary',
				strength: 0.5
			}"
			label="Selected gradient"
			gradient-recipe="orbitalConic"
			variant="glass"
			border-width="1"
			:morph-options="{
				preset: 'ripple',
				blobCount: 5,
				scale: 1,
				blur: 2
			}"
			:animation-options="{ preset: 'pulse' }"
			active />
	</div>
</template>
