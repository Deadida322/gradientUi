<script setup lang="ts">
	defineOptions({ name: 'ChipPlacementExample' });
	import { GChip } from '@/components';

	const placements = ['top', 'right', 'bottom', 'left', 'center'] as const;
</script>

<template>
	<div class="docs-component-detail__placement-grid">
		<g-chip
			v-for="placement in placements"
			:key="placement"
			:label="placement"
			variant="outlined"
			color="deep-purple"
			:placement="placement"
			:border-width="2" />
	</div>
</template>
