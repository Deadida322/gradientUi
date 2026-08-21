<script setup lang="ts">
	import { usePluginAppContext } from './context';

	const app = usePluginAppContext();
</script>

<template>
	<nav
		class="tabs"
		aria-label="Plugin sections">
		<button
			type="button"
			class="tab"
			:class="{ tab_active: app.activeTab.value === 'generator' }"
			@click="app.activeTab.value = 'generator'">
			Generator
		</button>
		<button
			type="button"
			class="tab"
			:class="{ tab_active: app.activeTab.value === 'tokens' }"
			@click="app.activeTab.value = 'tokens'">
			Tokens
		</button>
		<button
			type="button"
			class="tab"
			:class="{ tab_active: app.activeTab.value === 'morph' }"
			@click="app.activeTab.value = 'morph'">
			Morph
		</button>
	</nav>
</template>

<style scoped>
	.tabs {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 6px;

		padding: 4px;
		border: 1px solid var(--figma-color-border);
		border-radius: 8px;

		background: var(--figma-color-bg-secondary);
	}

	.tab {
		cursor: pointer;

		width: 100%;
		min-height: 30px;
		padding: 6px 8px;
		border: 0;
		border-radius: 6px;

		font: inherit;
		font-weight: 700;
		color: var(--figma-color-text-secondary);

		background: transparent;
	}

	.tab_active {
		color: var(--figma-color-text);
		background: var(--figma-color-bg);
		box-shadow: inset 0 0 0 1px var(--figma-color-border);
	}
</style>
