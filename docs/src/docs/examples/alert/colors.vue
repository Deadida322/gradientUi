<script setup lang="ts">
	defineOptions({ name: 'AlertColorsExample' });
	import { GAlert } from '@/components';

	const colors = ['primary', 'pink', 'cyan', 'deep-purple'] as const;
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<g-alert
			v-for="color in colors"
			:key="color"
			:color="color"
			:variant="color === 'pink' || color === 'cyan' ? 'filled' : 'tonal'"
			icon="information-outline"
			:title="color"
			text="Color can work in tonal and filled feedback surfaces." />
	</div>
</template>
