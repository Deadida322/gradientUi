<script setup lang="ts">
	defineOptions({ name: 'ButtonUsageExample' });
	import { GButton } from '@/components';
</script>

<template>
	<div class="docs-component-detail__intro">
		<g-button
			label="Create project"
			color="primary"
			prepend="plus" />
		<g-button
			label="Open settings"
			variant="tonal"
			color="deep-purple"
			append="cog" />
		<g-button
			icon-button="heart"
			variant="outlined"
			color="pink"
			aria-label="Like" />
	</div>
</template>
