<script setup lang="ts">
	defineOptions({ name: 'TooltipFloatingExample' });
	import { GButton, GTooltip } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-tooltip
			content="Offset 16"
			:offset="16"
			placement="top">
			<g-button
				label="Offset"
				variant="tonal" />
		</g-tooltip>
		<g-tooltip
			content="Flip disabled"
			:flip="false"
			placement="top">
			<g-button
				label="No flip"
				variant="tonal" />
		</g-tooltip>
		<g-tooltip
			content="Shift disabled"
			:shift="false"
			placement="right">
			<g-button
				label="No shift"
				variant="tonal" />
		</g-tooltip>
	</div>
</template>
