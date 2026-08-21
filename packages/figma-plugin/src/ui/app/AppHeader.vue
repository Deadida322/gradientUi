<script setup lang="ts">
	import { usePluginAppContext } from './context';

	const app = usePluginAppContext();
</script>

<template>
	<header class="header">
		<h1>Gradient UI Builder</h1>
		<div class="status">{{ app.statusText }}</div>
	</header>
</template>

<style scoped>
	.header {
		display: flex;
		gap: 10px;
		align-items: center;
		justify-content: space-between;
	}

	.header h1 {
		margin: 0;
		font-size: 14px;
	}

	.status {
		min-height: 18px;
		color: var(--figma-color-text-secondary);
	}
</style>
