<script setup lang="ts">
	defineOptions({ name: 'FABSlotsExample' });
	import { GFAB, GIcon } from '@/components';
</script>

<template>
	<div class="docs-component-detail__fab-stage">
		<g-f-a-b
			label="Custom"
			extended
			color="pink">
			<span class="fab-slot-label">Magic action</span>
			<template #icon>
				<g-icon
					icon="star-four-points"
					size="24" />
			</template>
		</g-f-a-b>
		<g-f-a-b
			label="Deploy"
			extended
			label-placement="left"
			variant="tonal"
			color="cyan">
			<span class="fab-slot-label fab-slot-label_accent">
				Deploy now
			</span>
			<template #icon>
				<span class="fab-slot-icon">GO</span>
			</template>
		</g-f-a-b>
	</div>
</template>

<style scoped lang="scss">
	.fab-slot-label {
		color: var(--g-token-color-on-surface);
	}

	.fab-slot-label_accent {
		color: var(--g-token-color-primary);
	}

	.fab-slot-icon {
		font-size: var(--g-token-font-size-xs);
		font-weight: var(--g-token-font-weight-bold);
		letter-spacing: 0;
	}
</style>
