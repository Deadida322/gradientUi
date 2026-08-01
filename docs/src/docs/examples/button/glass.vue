<script setup lang="ts">
	defineOptions({ name: 'ButtonGlassExample' });
	import { GButton } from '@/components';
	import type { GColor } from '@/use/color';

	const colors = [
		'primary',
		'deep-purple',
		'cyan',
		'pink',
		'warning',
		'success'
	] as const satisfies readonly GColor[];
</script>

<template>
	<div class="docs-component-detail__placement-grid button-glass-example">
		<g-button
			v-for="color in colors"
			:key="color"
			v-specular="{
				size: 70,
				opacity: 0.5,
				blur: 20,
				color
			}"
			:label="color"
			variant="glass"
			size="l"
			:color="color"
			border-width="1"
			:backdrop-blur="4" />
	</div>
</template>

<style scoped lang="scss">
	.button-glass-example {
		padding: var(--g-token-space-5);
		border-radius: var(--g-token-radius-lg);

		background-color: var(--g-token-color-surface);
		background-image:
			linear-gradient(
				45deg,
				color-mix(
						in srgb,
						var(--g-token-color-primary) 18%,
						transparent
					)
					25%,
				transparent 25%
			),
			linear-gradient(
				-45deg,
				color-mix(
						in srgb,
						var(--g-token-color-primary) 18%,
						transparent
					)
					25%,
				transparent 25%
			),
			linear-gradient(
				45deg,
				transparent 75%,
				color-mix(
						in srgb,
						var(--g-token-color-primary) 18%,
						transparent
					)
					75%
			),
			linear-gradient(
				-45deg,
				transparent 75%,
				color-mix(
						in srgb,
						var(--g-token-color-primary) 18%,
						transparent
					)
					75%
			);
		background-position:
			0 0,
			0 12px,
			12px -12px,
			-12px 0;
		background-size: 24px 24px;
	}
</style>
