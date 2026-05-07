<script setup lang="ts">
	defineOptions({ name: 'SelectUsageExample' });
	import { ref } from 'vue';
	import { GSelect } from '@/components';

	const framework = ref('vue');
	const frameworks = [
		{ label: 'Vue', value: 'vue' },
		{ label: 'Nuxt', value: 'nuxt' },
		{ label: 'Vite', value: 'vite' }
	];
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-select
			v-model="framework"
			label="Framework"
			:items="frameworks"
			label-key="label"
			value-key="value"
			placeholder="Choose framework"
			clearable />
	</div>
</template>
