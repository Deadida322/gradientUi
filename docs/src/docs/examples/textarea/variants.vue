<script setup lang="ts">
	defineOptions({ name: 'TextareaVariantsExample' });
	import { ref } from 'vue';
	import { GTextarea } from '@/components';

	const notes = ref(
		'A field can now feel quieter, framed, glassy or accented.'
	);
</script>

<template>
	<div class="docs-component-detail__field-grid docs-field-variant-grid">
		<g-textarea
			v-model="notes"
			label="Tonal"
			variant="tonal"
			color="main" />
		<g-textarea
			v-model="notes"
			label="Outlined"
			variant="outlined"
			color="primary" />
		<g-textarea
			v-model="notes"
			label="Glass"
			variant="glass"
			color="success" />
		<g-textarea
			v-model="notes"
			label="Text"
			variant="text"
			color="warning" />
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
