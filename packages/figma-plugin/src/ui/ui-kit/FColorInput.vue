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
			type="color" />
	</FField>
</template>

<style scoped>
input {
	width: 100%;
	height: 32px;
	padding: 2px;
	border: 1px solid var(--figma-color-border);
	border-radius: 6px;

	font: inherit;
	color: var(--figma-color-text);

	background: var(--figma-color-bg);
}
</style>
