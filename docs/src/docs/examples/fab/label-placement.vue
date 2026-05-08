<script setup lang="ts">
	defineOptions({ name: 'FABLabelPlacementExample' });
	import { GFAB } from '@/components';
</script>

<template>
	<div class="docs-component-detail__fab-stage">
		<g-f-a-b
			icon="plus"
			label="Create"
			extended
			label-placement="right"
			color="deep-purple" />
		<g-f-a-b
			icon="content-save-outline"
			label="Save draft"
			extended
			label-placement="left"
			variant="tonal"
			color="blue-grey" />
	</div>
</template>
