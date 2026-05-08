<script setup lang="ts">
	defineOptions({ name: 'FABColorsExample' });
	import { GFAB } from '@/components';

	const colors = ['primary', 'cyan', 'deep-purple', 'green', 'pink'];
</script>

<template>
	<div class="docs-component-detail__fab-grid">
		<g-f-a-b
			v-for="color in colors"
			:key="color"
			icon="plus"
			:label="color"
			:color="color" />
	</div>
</template>
