<script setup lang="ts">
	defineOptions({ name: 'ButtonVariantsExample' });
	import { GButton } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-button label="Default" />
		<g-button
			label="Tonal"
			variant="tonal" />
		<g-button
			label="Outlined"
			variant="outlined" />
		<g-button
			label="Text"
			variant="text" />
		<g-button
			label="Glass"
			variant="glass"
			:backdrop-blur="6" />
	</div>
</template>
