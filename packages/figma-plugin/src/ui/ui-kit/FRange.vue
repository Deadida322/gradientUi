<script setup lang="ts">
	import FField from './FField.vue';

	defineProps<{
		label: string;
		max: number;
		min: number;
		step?: number;
	}>();

	const model = defineModel<number>({ required: true });
</script>

<template>
	<f-field :label="label">
		<input
			v-model.number="model"
			type="range"
			:min="min"
			:max="max"
			:step="step ?? 1" />
	</f-field>
</template>

<style scoped>
	input {
		width: 100%;
		padding: 7px;
		border: 1px solid var(--figma-color-border);
		border-radius: 6px;

		font: inherit;
		color: var(--figma-color-text);

		background: var(--figma-color-bg);
	}
</style>
