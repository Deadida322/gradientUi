<script setup lang="ts">
	defineOptions({ name: 'ButtonRadiusExample' });
	import { GButton } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-button
			label="4px"
			:border-radius="4" />
		<g-button
			label="12px"
			:border-radius="12" />
		<g-button
			label="Rounded"
			rounded />
		<g-button
			label="Soft outline"
			variant="outlined"
			:border-radius="18" />
	</div>
</template>
