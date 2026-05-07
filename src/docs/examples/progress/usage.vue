<script setup lang="ts">
	defineOptions({ name: 'ProgressUsageExample' });
	import { GProgress } from '@/components';
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<g-progress
			:model-value="64"
			label="Uploading 64%"
			color="cyan"
			rounded />
	</div>
</template>
