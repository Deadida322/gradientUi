<script setup lang="ts">
	defineOptions({ name: 'AlertTextureExample' });
	import { GAlert } from '@/components';
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<g-alert
			variant="gradient"
			color="deep-purple"
			texture="noise"
			icon="creation"
			title="Noisy material"
			text="The noise texture is easiest to inspect on larger gradient surfaces." />
	</div>
</template>
