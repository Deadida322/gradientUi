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
			color="cyan"
			active
			animate-glow
			glow />
		<span class="button-effects-example__item">
			<g-button
				label="Noise"
				variant="tonal"
				color="cyan"
				texture="noise" />
			<span class="docs-component-detail__badge">0.5.0</span>
		</span>
	</div>
</template>

<style scoped lang="scss">
	.button-effects-example {
		&__item {
			display: inline-flex;
			gap: var(--g-token-space-2);
			align-items: center;
		}
	}
</style>
