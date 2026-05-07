<script setup lang="ts">
	defineOptions({ name: 'ProgressViewsExample' });
	import { GProgress } from '@/components';

	const views = ['default', 'striped', 'segmented', 'glow'] as const;
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<g-progress
			v-for="view in views"
			:key="view"
			:model-value="72"
			:view="view"
			:label="view"
			rounded />
	</div>
</template>
