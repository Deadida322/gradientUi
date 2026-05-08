<script setup lang="ts">
	defineOptions({ name: 'TooltipDirectiveExample' });
	import { GButton } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-button
			v-tooltip="'Saved to cloud'"
			label="String directive"
			variant="filled" />
		<g-button
			v-tooltip="{ content: 'Right placement', placement: 'right' }"
			label="Object directive"
			variant="tonal" />
	</div>
</template>
