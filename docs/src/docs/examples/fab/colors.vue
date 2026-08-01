<script setup lang="ts">
	defineOptions({ name: 'FABColorsExample' });
	import { GFAB } from '@/components';
	import type { GColor } from '@/use/color';

	const colors = [
		'primary',
		'cyan',
		'deep-purple',
		'green',
		'pink'
	] as const satisfies readonly GColor[];
</script>

<template>
	<div class="docs-component-detail__fab-grid">
		<g-f-a-b
			v-for="color in colors"
			:key="color"
			icon="plus"
			:label="color"
			:color="color" />
		<g-f-a-b
			v-for="color in colors"
			:key="color"
			icon="plus"
			:label="color"
			variant="outlined"
			:color="color" />
		<g-f-a-b
			v-for="color in colors"
			:key="color"
			icon="plus"
			:label="color"
			variant="tonal"
			:color="color" />
	</div>
</template>
