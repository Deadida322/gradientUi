<script setup lang="ts">
	defineOptions({ name: 'DirectivesTooltipPlacementExample' });
	import { GButton } from '@/components';
</script>

<template>
	<div class="docs-directives-example docs-directives-example_row">
		<g-button
			v-tooltip="{ content: 'Opens above', placement: 'top' }"
			label="Top"
			variant="tonal" />

		<g-button
			v-tooltip="{ content: 'Opens on the right', placement: 'right' }"
			label="Right"
			variant="tonal" />

		<g-button
			v-tooltip="{
				content: 'Opens below with offset',
				placement: 'bottom',
				offset: 14
			}"
			label="Bottom"
			variant="tonal" />
	</div>
</template>
