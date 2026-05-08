<script setup lang="ts">
	defineOptions({ name: 'ButtonStatesExample' });
	import { GButton } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-button
			label="Success"
			variant="filled"
			state="success" />
		<g-button
			label="Warning"
			variant="tonal"
			state="warning" />
		<g-button
			label="Error"
			variant="outlined"
			state="error" />
		<g-button
			label="Active"
			variant="tonal"
			active
			active-color="pink" />
		<g-button
			label="Disabled"
			variant="filled"
			disabled />
	</div>
</template>
