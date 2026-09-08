<script setup lang="ts">
	defineOptions({ name: 'DividerEffectsExample' });
	import { GDivider } from '@/components';

	const effects = [
		'solid',
		'dashed',
		'dotted',
		'fade',
		'glow',
		'pulse'
	] as const;
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-divider
			v-for="effect in effects"
			:key="effect"
			:label="effect"
			:effect="effect"
			color="teal"
			variant="gradient"
			thickness="2" />
	</div>
</template>
