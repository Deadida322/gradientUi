<script setup lang="ts">
	defineOptions({ name: 'ProgressIndeterminateExample' });
	import { GProgress } from '@/components';
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<g-progress
			indeterminate
			no-label
			view="glow"
			color="deep-purple"
			:model-value="100" />
	</div>
</template>
