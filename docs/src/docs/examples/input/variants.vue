<script setup lang="ts">
	defineOptions({ name: 'InputVariantsExample' });
	import { ref } from 'vue';
	import { GInput } from '@/components';

	const value = ref('gradient-ui.dev');
</script>

<template>
	<div class="docs-component-detail__field-grid docs-field-variant-grid">
		<g-input
			v-model="value"
			label="Default"
			placeholder="Domain" />
		<g-input
			v-model="value"
			label="Tonal"
			variant="tonal"
			color="main"
			placeholder="Domain" />
		<g-input
			v-model="value"
			label="Outlined"
			variant="outlined"
			color="primary"
			placeholder="Domain" />
		<g-input
			v-model="value"
			label="Glass"
			variant="glass"
			color="success"
			placeholder="Domain" />
		<g-input
			v-model="value"
			label="Text"
			variant="text"
			color="warning"
			placeholder="Domain" />
		<g-input
			v-model="value"
			label="Gradient frame"
			variant="tonal"
			color="primary"
			border-width="1"
			placeholder="Domain" />
	</div>
</template>

<style scoped>
	.docs-field-variant-grid {
		background:
			linear-gradient(
				rgba(var(--g-theme-surface), 0.72),
				rgba(var(--g-theme-surface), 0.72)
			),
			linear-gradient(
				90deg,
				rgba(var(--g-theme-on-surface), 0.08) 1px,
				transparent 1px
			),
			linear-gradient(
				rgba(var(--g-theme-on-surface), 0.08) 1px,
				transparent 1px
			);
		background-size:
			auto,
			22px 22px,
			22px 22px;
	}
</style>
