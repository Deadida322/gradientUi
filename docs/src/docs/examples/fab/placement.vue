<script setup lang="ts">
	defineOptions({ name: 'FABPlacementExample' });
	import { GFAB } from '@/components';
</script>

<template>
	<div class="docs-component-detail__fab-placement">
		<g-f-a-b
			icon="plus"
			label="Fixed create action"
			extended
			position="absolute"
			location="bottom-right"
			:offset="16" />
	</div>
</template>
