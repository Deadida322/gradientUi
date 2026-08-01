<script setup lang="ts">
	defineOptions({ name: 'ButtonCustomRecipeExample' });
	import { GButton } from '@/components';
</script>

<template>
	<div class="docs-page__preview docs-button-custom-recipe">
		<g-button
			label="Analogous liquid"
			variant="gradient"
			gradient-recipe="analogous"
			:animation-options="{ preset: 'shift' }"
			:morph="true"
			:morph-options="{ preset: 'liquid', opacity: 0.9 }" />
		<g-button
			color="deep-purple"
			label="Triadic ripple"
			variant="gradient"
			gradient-recipe="triadic"
			:animation-options="{ preset: 'pulse' }"
			:morph="true"
			:morph-options="{ preset: 'ripple', opacity: 0.9 }" />
		<g-button
			color="cyan"
			label="Split soft"
			variant="gradient"
			gradient-recipe="split-complementary"
			:animation-options="{ preset: 'hue-rotate' }"
			:morph="true"
			:morph-options="{ preset: 'soft', blobCount: 7, opacity: 0.92 }" />
		<g-button
			color="pink"
			label="Duotone border"
			gradient-recipe="duotone"
			variant="outlined"
			:border-width="1"
			:morph="true"
			:morph-options="{ preset: 'soft', opacity: 0.88 }" />
	</div>
</template>

<style lang="scss" scoped>
	.docs-button-custom-recipe {
		gap: var(--g-token-space-6);
		padding-block: var(--g-token-space-5);
	}
</style>
