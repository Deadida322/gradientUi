<script setup lang="ts">
	import { GButton, useSnackbar } from '@/components';
	import type { GSnackbarLocation } from '@/components/ui/GSnackbar';

	defineOptions({ name: 'SnackbarLocationsExample' });

	const snackbar = useSnackbar();
	const locations: GSnackbarLocation[] = [
		'top-left',
		'top-center',
		'top-right',
		'bottom-left',
		'bottom-center',
		'bottom-right'
	];

	function showLocation(location: GSnackbarLocation) {
		snackbar.show({
			text: location,
			location
		});
	}
</script>

<template>
	<div class="docs-component-detail__fab-grid">
		<g-button
			v-for="location in locations"
			:key="location"
			:label="location"
			variant="tonal"
			@click="showLocation(location)" />
	</div>
</template>
