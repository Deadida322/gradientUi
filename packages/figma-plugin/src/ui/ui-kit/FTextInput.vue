<script setup lang="ts">
import FField from './FField.vue';

defineProps<{
	label: string;
}>();

const model = defineModel<string>({ required: true });
</script>

<template>
	<FField :label="label">
		<input
			v-model="model"
			type="text" />
	</FField>
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
