<script setup lang="ts">
	import { GButton, useSnackbar } from '@/components';

	defineOptions({ name: 'SnackbarStatesExample' });

	const snackbar = useSnackbar();

	function showState(state: 'success' | 'warning' | 'error') {
		const text = {
			success: 'Release published',
			warning: 'Storage almost full',
			error: 'Could not sync changes'
		}[state];

		snackbar.show({
			text,
			state,
			variant: 'filled'
		});
	}
</script>

<template>
	<div class="docs-component-detail__fab-grid">
		<g-button
			label="Success"
			state="success"
			variant="filled"
			@click="showState('success')" />
		<g-button
			label="Warning"
			state="warning"
			variant="filled"
			@click="showState('warning')" />
		<g-button
			label="Error"
			state="error"
			variant="filled"
			@click="showState('error')" />
	</div>
</template>
