<script setup lang="ts">
	import { GButton, useSnackbar } from '@/components';

	defineOptions({ name: 'SnackbarUsageExample' });

	const snackbar = useSnackbar();

	function showSnackbar() {
		snackbar.show({
			text: 'Project settings saved',
			icon: 'check-circle-outline',
			action: 'Undo'
		});
	}
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<g-button
			label="Show snackbar"
			variant="filled"
			@click="showSnackbar" />
		<p class="docs-component-detail__note">
			Use GSnackbar directly for local positioned feedback, or call
			useSnackbar for the app-level stack.
		</p>
	</div>
</template>
