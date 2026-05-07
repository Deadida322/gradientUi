<script setup lang="ts">
	defineOptions({ name: 'FABExtendedExample' });
	import { GFAB } from '@/components';
</script>

<template>
	<div class="docs-component-detail__fab-stage">
		<g-f-a-b
			icon="pencil"
			label="New note"
			extended
			color="cyan" />
		<g-f-a-b
			icon="upload"
			label="Upload asset"
			extended
			label-placement="left"
			variant="tonal"
			color="deep-purple" />
	</div>
</template>
