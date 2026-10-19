<script setup lang="ts">
	/* global useGradientTheme:readonly */

	const theme = useGradientTheme();

	const toggleTheme = () => theme?.toggleMode();
</script>

<template>
	<main>
		<p data-testid="theme-mode">{{ theme?.mode }}</p>
		<button
			type="button"
			data-testid="toggle-theme"
			@click="toggleTheme">
			Toggle theme
		</button>
	</main>
</template>
