<script setup lang="ts">
	import AppActionBar from './app/AppActionBar.vue';
	import AppHeader from './app/AppHeader.vue';
	import AppTabs from './app/AppTabs.vue';
	import { providePluginApp } from './app/context';
	import { usePluginApp } from './app/usePluginApp';
	import GeneratorTab from './features/generator/GeneratorTab.vue';
	import MorphTab from './features/morph/MorphTab.vue';
	import TokensTab from './features/tokens/TokensTab.vue';

	const app = usePluginApp();

	providePluginApp(app);
</script>

<template>
	<main class="builder">
		<app-header />
		<app-tabs />
		<generator-tab v-if="app.activeTab.value === 'generator'" />
		<morph-tab v-else-if="app.activeTab.value === 'morph'" />
		<tokens-tab v-else />
		<app-action-bar />
	</main>
</template>

<style scoped>
	:global(*) {
		box-sizing: border-box;
	}

	:global(html),
	:global(body),
	:global(#app) {
		overflow: hidden;
		width: 100%;
		height: 100%;
		margin: 0;
	}

	.builder {
		overflow-x: hidden;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 12px;

		height: 100vh;
		min-height: 0;
		padding: 12px 12px 76px;

		color: var(--figma-color-text);

		background: var(--figma-color-bg);
		scrollbar-color: var(--figma-color-border) transparent;
		scrollbar-width: thin;
	}

	.builder::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}

	.builder::-webkit-scrollbar-track {
		background: transparent;
	}

	.builder::-webkit-scrollbar-thumb {
		border: 2px solid var(--figma-color-bg);
		border-radius: 999px;
		background: var(--figma-color-border);
	}

	.builder::-webkit-scrollbar-thumb:hover {
		background: var(--figma-color-text-secondary);
	}
</style>
