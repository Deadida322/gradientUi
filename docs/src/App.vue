<template>
	<router-view />
</template>

<style>
	:root {
		--g-token-font-family-base: 'Manrope', sans-serif;
	}

	body,
	#app {
		min-height: 100vh;

		font-family: var(--g-token-font-family-base);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: var(--g-token-color-on-surface);
	}
</style>
