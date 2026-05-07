<script setup lang="ts">
	import { GButton, useSnackbar } from '@/components';

	defineOptions({ name: 'SnackbarVariantsExample' });

	const snackbar = useSnackbar();

	function showVariant(variant: 'tonal' | 'filled' | 'outlined') {
		snackbar.show({
			text: `${variant} snackbar with action`,
			variant,
			action: 'View'
		});
	}
</script>

<template>
	<div class="docs-component-detail__fab-grid">
		<g-button
			label="Tonal"
			variant="tonal"
			@click="showVariant('tonal')" />
		<g-button
			label="Filled"
			variant="filled"
			@click="showVariant('filled')" />
		<g-button
			label="Outlined"
			variant="outlined"
			@click="showVariant('outlined')" />
	</div>
</template>
