<script setup lang="ts">
	defineOptions({ name: 'ButtonIconsExample' });
	import { GButton } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-button
			label="Create"
			prepend="plus"
			variant="filled" />
		<g-button
			label="Continue"
			append="arrow-right"
			variant="tonal" />
		<g-button
			icon-button="heart"
			variant="outlined"
			aria-label="Like" />
	</div>
</template>
