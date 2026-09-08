<script setup lang="ts">
	defineOptions({ name: 'ChipGradientExample' });
	import { GChip } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-chip
			label="Gradient"
			gradient-recipe="mesh"
			variant="gradient" />

		<g-chip
			v-specular="{
				color: 'primary',
				strength: 0.5
			}"
			label="Gradient"
			gradient-recipe="orbitalConic"
			variant="glass"
			color="blue-800"
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
