<script setup lang="ts">
	defineOptions({ name: 'ComboboxUsageExample' });
	import { ref } from 'vue';
	import { GCombobox } from '@/components';

	const framework = ref('Vue');
	const frameworks = [
		{ label: 'Vue', value: 'Vue' },
		{ label: 'Nuxt', value: 'Nuxt' },
		{ label: 'Vite', value: 'Vite' },
		{ label: 'Astro', value: 'Astro' }
	];
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-combobox
			v-model="framework"
			label="Framework"
			:items="frameworks"
			label-key="label"
			value-key="value"
			placeholder="Pick or add framework"
			clearable />
	</div>
</template>
