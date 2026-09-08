<script setup lang="ts">
	defineOptions({ name: 'CardUsageExample' });
	import { GButton, GCard, GChip } from '@/components';
</script>

<template>
	<div class="docs-component-detail__card-grid">
		<g-card
			title="Gradient report"
			subtitle="Updated 12 min ago"
			text="A calm content surface for previews, dashboards and grouped actions."
			prepend-icon="chart-line"
			variant="tonal">
			<template #actions>
				<g-button
					label="Open"
					size="s"
					placement="bottom" />
				<g-chip
					label="Live"
					size="s"
					state="success"
					variant="tonal" />
			</template>
		</g-card>
	</div>
</template>
