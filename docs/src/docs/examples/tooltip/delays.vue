<script setup lang="ts">
	defineOptions({ name: 'TooltipDelaysExample' });
	import { GButton, GTooltip } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-tooltip
			content="Opens after 500ms"
			:open-delay="500">
			<g-button
				label="Open delay"
				variant="outlined" />
		</g-tooltip>
		<g-tooltip
			content="Closes after 500ms"
			:close-delay="500">
			<g-button
				label="Close delay"
				variant="outlined" />
		</g-tooltip>
	</div>
</template>
