<script setup lang="ts">
	defineOptions({ name: 'ButtonEffectsExample' });
	import { GButton } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-button
			label="Glow"
			variant="outlined"
			color="deep-purple"
			glow
			:border-width="2" />
		<g-button
			label="Shadow"
			variant="tonal"
			color="pink"
			shadow />
		<g-button
			label="Animated"
			variant="filled"
			color="cyan"
			active
			animate-glow
			glow />
	</div>
</template>
