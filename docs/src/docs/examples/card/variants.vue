<script setup lang="ts">
	defineOptions({ name: 'CardVariantsExample' });
	import { GCard } from '@/components';
</script>

<template>
	<div class="docs-component-detail__card-grid">
		<g-card
			title="Tonal"
			subtitle="Soft material fill"
			variant="tonal" />
		<g-card
			title="Default"
			subtitle="Filled accent surface"
			variant="default" />
		<g-card
			title="Outlined"
			subtitle="Quiet frame"
			variant="outlined" />
		<g-card
			title="Glass"
			subtitle="Blurred translucent layer"
			variant="glass"
			color="cyan"
			:backdrop-blur="8" />
		<g-card
			title="Gradient"
			subtitle="Material recipe fill"
			variant="gradient"
			shadow
			morph />
	</div>
</template>
