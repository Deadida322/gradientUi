<script setup lang="ts">
	defineOptions({ name: 'DividerMaterialExample' });
	import { GDivider } from '@/components';
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-divider
			label="noise"
			color="pink"
			variant="gradient"
			texture="noise"
			effect="glow"
			thickness="4" />
		<g-divider
			label="morph"
			color="cyan"
			variant="gradient"
			morph
			effect="fade"
			thickness="5" />
		<g-divider
			label="glass"
			color="teal"
			variant="glass"
			effect="pulse"
			:border-width="1"
			:backdrop-blur="12"
			thickness="3" />
	</div>
</template>
