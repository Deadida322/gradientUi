<script setup lang="ts">
	defineOptions({ name: 'LoadingDarkExample' });
	import { GLoading } from '@/components';
</script>

<template>
	<div class="docs-component-detail__loading-stage">
		<g-loading
			show
			dark
			text="Processing"
			color="cyan"
			:opacity="0.72"
			blur="8px" />
	</div>
</template>
