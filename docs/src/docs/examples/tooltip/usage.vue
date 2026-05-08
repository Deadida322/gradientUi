<script setup lang="ts">
	defineOptions({ name: 'TooltipUsageExample' });
	import { GButton, GTooltip } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-tooltip content="Gradient-aware action">
			<g-button
				label="Hover or focus"
				variant="tonal"
				prepend="information-outline" />
		</g-tooltip>
	</div>
</template>
