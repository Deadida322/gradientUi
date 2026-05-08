<script setup lang="ts">
	defineOptions({ name: 'AlertStatesExample' });
	import { GAlert } from '@/components';
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<g-alert
			state="success"
			variant="tonal"
			icon="check-circle-outline"
			title="Success"
			text="The operation completed without issues." />
		<g-alert
			state="warning"
			variant="filled"
			icon="alert-outline"
			title="Warning"
			text="Review this before continuing." />
		<g-alert
			state="error"
			variant="outlined"
			icon="close-circle-outline"
			title="Error"
			text="Something needs attention before the flow can continue." />
	</div>
</template>
