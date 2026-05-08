<script setup lang="ts">
	defineOptions({ name: 'DirectivesTooltipExample' });
	import { GButton } from '@/components';
</script>

<template>
	<div class="docs-directives-example docs-directives-example_row">
		<g-button
			v-tooltip="'Small contextual hint'"
			label="Hover me"
			color="deep-purple" />

		<g-button
			v-tooltip="{
				content: 'Tooltip can choose placement',
				placement: 'bottom',
				offset: 10
			}"
			label="Bottom tooltip"
			variant="tonal" />
	</div>
</template>
