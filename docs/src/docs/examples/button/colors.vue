<script setup lang="ts">
	defineOptions({ name: 'ButtonColorsExample' });
	import { GButton } from '@/components';
	import type { GColor } from '@/use/color';

	const colors = [
		'primary',
		'pink',
		'deep-purple',
		'cyan',
		'teal',
		'orange'
	] as const satisfies readonly GColor[];
</script>

<template>
	<div class="docs-component-detail__matrix">
		<g-button
			v-for="color in colors"
			:key="color"
			:label="color"
			:color="color" />
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
			variant="outlined" />
		<g-button
			v-for="color in colors"
			:key="`${color}-text`"
			:label="color"
			:color="color"
			variant="text" />
		<g-button
			v-for="color in colors"
			:key="`${color}-text`"
			:label="color"
			:color="color"
			border-width="1"
			variant="glass" />
	</div>
</template>
