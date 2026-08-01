<script setup lang="ts">
	import { GButton, useSnackbar } from '@/components';

	defineOptions({ name: 'SnackbarGradientExample' });

	const snackbar = useSnackbar();

	function showGradient() {
		snackbar.show({
			text: 'Gradient snackbar with action',
			variant: 'gradient',
			action: 'View'
		});
	}
</script>

<template>
	<div class="docs-component-detail__fab-grid">
		<g-button
			label="Gradient"
			variant="gradient"
			@click="showGradient" />
	</div>
</template>
