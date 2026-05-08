<script setup lang="ts">
	defineOptions({ name: 'ProgressStatesExample' });
	import { GProgress } from '@/components';
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<g-progress
			:model-value="86"
			state="success"
			label="Success"
			view="default" />
		<g-progress
			:model-value="48"
			state="warning"
			label="Warning"
			view="striped" />
		<g-progress
			:model-value="22"
			state="error"
			label="Error"
			view="segmented"
			:segments="8" />
	</div>
</template>
