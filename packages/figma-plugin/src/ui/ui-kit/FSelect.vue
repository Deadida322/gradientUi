<script setup lang="ts" generic="T extends string | number">
	import FField from './FField.vue';

	defineProps<{
		label: string;
		options: readonly {
			label: string;
			value: T;
		}[];
	}>();

	const model = defineModel<T>({ required: true });
</script>

<template>
	<f-field :label="label">
		<select v-model="model">
			<option
				v-for="option in options"
				:key="String(option.value)"
				:value="option.value">
				{{ option.label }}
			</option>
		</select>
	</f-field>
</template>

<style scoped>
	select {
		width: 100%;
		padding: 7px;
		border: 1px solid var(--figma-color-border);
		border-radius: 6px;

		font: inherit;
		color: var(--figma-color-text);

		background: var(--figma-color-bg);
	}
</style>
