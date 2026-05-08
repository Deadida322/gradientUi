<script setup lang="ts">
	defineOptions({ name: 'LoadingViewsExample' });
	import { GLoading } from '@/components';
</script>

<template>
	<div class="docs-component-detail__loading-grid">
		<div class="docs-component-detail__loading-stage">
			<g-loading
				show
				text="Glow"
				progress-view="glow" />
		</div>
		<div class="docs-component-detail__loading-stage">
			<g-loading
				show
				text="Striped"
				progress-view="striped"
				color="pink" />
		</div>
	</div>
</template>
