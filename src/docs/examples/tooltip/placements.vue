<script setup lang="ts">
	defineOptions({ name: 'TooltipPlacementsExample' });
	import { GButton, GTooltip } from '@/components';

	const placements = [
		'top',
		'top-start',
		'top-end',
		'right',
		'bottom',
		'left'
	] as const;
</script>

<template>
	<div class="docs-component-detail__matrix">
		<g-tooltip
			v-for="placement in placements"
			:key="placement"
			:content="placement"
			:placement="placement">
			<g-button
				:label="placement"
				variant="tonal" />
		</g-tooltip>
	</div>
</template>
