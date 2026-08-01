<script setup lang="ts">
	defineOptions({ name: 'ButtonPlacementExample' });
	import { GButton } from '@/components';

	const placements = ['top', 'right', 'bottom', 'left', 'center'] as const;
</script>

<template>
	<div class="docs-component-detail__placement-grid button-placement-example">
		<g-button
			v-for="placement in placements"
			:key="placement"
			:label="placement"
			variant="text"
			:placement="placement"
			:border-width="2" />
	</div>
</template>

<style scoped lang="scss">
	.button-placement-example {
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
