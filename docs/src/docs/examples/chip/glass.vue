<script setup lang="ts">
	defineOptions({ name: 'ChipGlassExample' });
	import { GChip } from '@/components';
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
	<div class="docs-component-detail__placement-grid chip-glass-example">
		<g-chip
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
			:backdrop-blur="4" />
	</div>
</template>

<style scoped lang="scss">
	.chip-glass-example {
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
