<script setup lang="ts">
	defineOptions({ name: 'CardSlotsExample' });
	import { GButton, GCard, GChip, GIcon } from '@/components';
</script>

<template>
	<div class="docs-component-detail__card-grid">
		<g-card
			title="Release health"
			subtitle="Workspace overview"
			variant="outlined">
			<template #prepend>
				<g-icon icon="rocket-launch-outline" />
			</template>
			<template #append>
				<g-chip
					label="Beta"
					size="s"
					variant="tonal" />
			</template>
			<div class="card-slot-content">
				<span>Builds</span>
				<strong>128</strong>
				<span>Coverage</span>
				<strong>94%</strong>
			</div>
			<template #actions>
				<g-button
					label="Details"
					size="s"
					variant="outlined" />
				<g-button
					label="Export"
					size="s"
					variant="text" />
			</template>
			<template #footer>
				<span>Synced today</span>
				<span>3 reviewers</span>
			</template>
		</g-card>
	</div>
</template>

<style scoped lang="scss">
	.card-slot-content {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--g-token-space-2) var(--g-token-space-4);

		span {
			font-size: var(--g-token-font-size-xs);
			color: var(--g-token-text-soft);
		}

		strong {
			font-size: var(--g-token-font-size-xl);
			color: var(--g-token-color-on-surface);
		}
	}
</style>
