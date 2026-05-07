<script setup lang="ts">
	import { GButton, useSnackbar } from '@/components';
	import type { GSnackbarTransition } from '@/services/useSnackbar';

	defineOptions({ name: 'SnackbarTransitionsExample' });

	const snackbar = useSnackbar();
	const transitions: GSnackbarTransition[] = [
		'slide-y',
		'slide-x',
		'scale',
		'fade'
	];

	function showTransition(transition: GSnackbarTransition) {
		snackbar.show({
			title: transition,
			text: 'Transition can be selected per snackbar call.',
			icon: 'animation-play-outline',
			transition,
			location:
				transition === 'slide-x' ? 'bottom-right' : 'bottom-center'
		});
	}
</script>

<template>
	<div class="docs-component-detail__fab-grid">
		<g-button
			v-for="transition in transitions"
			:key="transition"
			:label="transition"
			variant="tonal"
			@click="showTransition(transition)" />
	</div>
</template>
