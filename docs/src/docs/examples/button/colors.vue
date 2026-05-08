<script setup lang="ts">
	defineOptions({ name: 'ButtonColorsExample' });
	import { GButton } from '@/components';

	const colors = ['primary', 'pink', 'deep-purple', 'cyan', 'teal', 'orange'];
</script>

<template>
	<div class="docs-component-detail__matrix">
		<g-button
			v-for="color in colors"
			:key="color"
			:label="color"
			:color="color"
			variant="filled"
			prepend="palette" />
		<g-button
			v-for="color in colors"
			:key="`${color}-tonal`"
			:label="color"
			:color="color"
			variant="tonal" />
		<g-button
			v-for="color in colors"
			:key="`${color}-outlined`"
			:label="color"
			:color="color"
			variant="outlined"
			:border-width="2" />
	</div>
</template>
