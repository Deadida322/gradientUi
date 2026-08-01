<script setup lang="ts">
	import { GButton, useSnackbar } from '@/components';

	defineOptions({ name: 'SnackbarSlotsExample' });

	const snackbar = useSnackbar();

	function showCustomAction() {
		snackbar.show({
			title: 'Upload queued',
			text: 'Assets will continue uploading in the background.',
			icon: 'cloud-upload-outline',
			variant: 'outlined',
			multiline: true,
			action: {
				label: 'Dismiss',
				closeOnClick: true
			}
		});
	}
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<g-button
			label="Show composed snackbar"
			variant="gradient"
			@click="showCustomAction" />
	</div>
</template>
