<script setup lang="ts">
	import { GButton, useSnackbar } from '@/components';

	defineOptions({ name: 'SnackbarServiceExample' });

	const snackbar = useSnackbar();

	function showSaved() {
		snackbar.show({
			text: 'Changes saved',
			icon: 'check-circle-outline',
			state: 'success',
			variant: 'filled',
			action: 'Undo'
		});
	}
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<g-button
			label="Show from service"
			variant="filled"
			@click="showSaved" />
		<p class="docs-component-detail__note">
			The service mounts a snackbar on document.body and removes it after
			the leave transition.
		</p>
	</div>
</template>
