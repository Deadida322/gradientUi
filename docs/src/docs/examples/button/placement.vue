<script setup lang="ts">
	defineOptions({ name: 'ButtonPlacementExample' });
	import { GButton } from '@/components';

	const placements = ['top', 'right', 'bottom', 'left', 'center'] as const;
</script>

<template>
	<div class="docs-component-detail__placement-grid">
		<g-button
			v-for="placement in placements"
			:key="placement"
			:label="placement"
			variant="outlined"
			color="deep-purple"
			:placement="placement"
			:border-width="2" />
	</div>
</template>
