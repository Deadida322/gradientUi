<script setup lang="ts">
	defineOptions({ name: 'LoadingCustomizationExample' });
	import { GLoading } from '@/components';
</script>

<template>
	<div class="docs-component-detail__loading-grid">
		<div class="docs-component-detail__loading-stage">
			<g-loading
				show
				no-text
				color="pink"
				progress-view="striped"
				:opacity="0.58"
				blur="2px" />
		</div>
		<div class="docs-component-detail__loading-stage">
			<g-loading
				show
				text="Preparing export"
				color="deep-purple"
				progress-view="segmented"
				:opacity="0.82"
				blur="10px"
				:transition="{
					name: 'scale',
					duration: 360,
					scale: 0.94
				}" />
		</div>
	</div>
</template>
