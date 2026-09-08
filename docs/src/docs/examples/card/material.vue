<script setup lang="ts">
	defineOptions({ name: 'CardMaterialExample' });
	import { GCard } from '@/components';
</script>

<template>
	<div class="docs-component-detail__card-grid">
		<g-card
			title="Tonal warning"
			subtitle="Semantic state"
			text="State switches the resolved material color while keeping the card API stable."
			state="warning"
			variant="tonal"
			texture="noise" />
		<g-card
			title="Gradient material"
			subtitle="Morph + glow"
			text="Gradient cards can use recipe-backed fill, morph layers and SVG glow."
			variant="gradient"
			placement="bottom"
			glow
			animate-glow
			morph
			shadow />
		<g-card
			title="Glass layer"
			subtitle="Backdrop blur"
			text="Glass uses the shared translucent material props and keeps the same slots."
			variant="glass"
			color="cyan"
			:backdrop-blur="10"
			:border-width="1"
			hover />
	</div>
</template>
