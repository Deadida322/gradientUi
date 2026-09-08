<script setup lang="ts">
	defineOptions({ name: 'ComboboxMultipleExample' });
	import { ref } from 'vue';
	import { GCombobox } from '@/components';

	const stack = ref(['vue', 'typescript']);
	const tools = [
		{ label: 'Vue', value: 'vue' },
		{ label: 'TypeScript', value: 'typescript' },
		{ label: 'Vite', value: 'vite' },
		{ label: 'Vitest', value: 'vitest' },
		{ label: 'Playwright', value: 'playwright' }
	];
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-combobox
			v-model="stack"
			multiple
			label="Project stack"
			:items="tools"
			label-key="label"
			value-key="value"
			placeholder="Add technology"
			clearable />
	</div>
</template>
