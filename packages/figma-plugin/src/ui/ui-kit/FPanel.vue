<script setup lang="ts">
defineProps<{
	title: string;
}>();
</script>

<template>
	<section class="panel">
		<h2>{{ title }}</h2>
		<div class="panel__body">
			<slot />
		</div>
	</section>
</template>

<style scoped>
.panel {
	overflow: hidden;
	border: 1px solid var(--figma-color-border);
	border-radius: 8px;
	background: var(--figma-color-bg-secondary);
}

.panel__body {
	display: grid;
	gap: 10px;
	padding: 10px;
}

.panel h2 {
	margin: 0;
	padding: 9px 10px;
	border-bottom: 1px solid var(--figma-color-border);

	font-size: 11px;
	color: var(--figma-color-text-secondary);
	text-transform: uppercase;
	letter-spacing: 0;
}
</style>
