<script setup lang="ts">
	defineOptions({ name: 'FABStatesExample' });
	import { GFAB } from '@/components';
</script>

<template>
	<div class="docs-component-detail__fab-grid">
		<g-f-a-b
			icon="check"
			label="Success"
			state="success" />
		<g-f-a-b
			icon="alert-outline"
			label="Warning"
			state="warning" />
		<g-f-a-b
			icon="close"
			label="Disabled"
			disabled />
	</div>
</template>
