<script setup lang="ts">
	import { useDocsSeo } from '@docs/use/docsSeo';

	useDocsSeo();
</script>

<template>
	<nuxt-layout>
		<nuxt-page />
	</nuxt-layout>
</template>

<style>
	html:root {
		--g-token-font-family-base: 'Manrope', sans-serif;
	}

	body,
	/* stylelint-disable-next-line selector-id-pattern -- Nuxt owns this root id. */
	#__nuxt {
		min-height: 100vh;

		font-family: var(--g-token-font-family-base);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: var(--g-token-color-on-surface);
	}
</style>
