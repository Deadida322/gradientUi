<script setup lang="ts">
	import { ref } from 'vue';
	import { GButton, GSnackbar } from '@/components';

	defineOptions({ name: 'SnackbarComponentExample' });

	const open = ref(false);

	function showSnackbar() {
		open.value = true;
	}
</script>

<template>
	<div class="docs-snackbar-component-example">
		<g-button
			label="Show local snackbar"
			variant="tonal"
			@click="showSnackbar" />

		<g-snackbar
			v-model="open"
			position="absolute"
			location="bottom-right"
			title="Local layer"
			text="The component can position itself inside any relative surface."
			icon="map-marker-radius-outline"
			action-text="Got it"
			:timeout="0"
			@action="open = false" />
	</div>
</template>

<style scoped lang="scss">
	.docs-snackbar-component-example {
		position: relative;

		min-height: 260px;
		padding: var(--g-token-space-4);
		border: 1px dashed
			color-mix(in srgb, var(--g-color-primary) 28%, transparent);
		border-radius: var(--g-token-radius-lg);

		background:
			linear-gradient(
				color-mix(in srgb, var(--g-color-primary) 8%, transparent) 1px,
				transparent 1px
			),
			linear-gradient(
				90deg,
				color-mix(in srgb, var(--g-color-primary) 8%, transparent) 1px,
				transparent 1px
			);
		background-size: 32px 32px;
	}
</style>
