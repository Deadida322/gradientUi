<script setup lang="ts">
	defineOptions({ name: 'FABGradientExample' });
	import { GFAB } from '@/components';
</script>

<template>
	<div class="docs-component-detail__fab-grid">
		<g-f-a-b
			icon="plus"
			label="Gradient"
			variant="gradient"
			gradient-recipe="analogous"
			glow />
		<g-f-a-b
			icon="plus"
			label="Outlined gradient border"
			variant="outlined"
			gradient-recipe="neonDuo"
			glow />
	</div>
</template>
