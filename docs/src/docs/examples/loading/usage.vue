<script setup lang="ts">
	defineOptions({ name: 'LoadingUsageExample' });
	import { GLoading } from '@/components';
</script>

<template>
	<div class="docs-component-detail__loading-stage">
		<g-loading
			show
			text="Syncing data"
			color="cyan" />
	</div>
</template>
