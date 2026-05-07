<script setup lang="ts">
	defineOptions({ name: 'ProgressColorsExample' });
	import { GProgress } from '@/components';

	const colors = ['primary', 'pink', 'cyan', 'deep-purple'] as const;
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<g-progress
			v-for="(color, index) in colors"
			:key="color"
			:model-value="(index + 2) * 18"
			:color="color"
			:label="color"
			:view="index % 2 === 0 ? 'glow' : 'striped'"
			rounded />
	</div>
</template>
