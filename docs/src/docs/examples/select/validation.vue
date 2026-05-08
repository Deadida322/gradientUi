<script setup lang="ts">
	defineOptions({ name: 'SelectValidationExample' });
	import { ref } from 'vue';
	import { GSelect } from '@/components';

	const framework = ref<string | null>(null);
	const frameworks = [
		{ label: 'Vue', value: 'vue' },
		{ label: 'Nuxt', value: 'nuxt' },
		{ label: 'Vite', value: 'vite' }
	];
	const frameworkRules = [
		(value: string | null) => Boolean(value) || 'Framework is required'
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
			message="Validation runs when the field loses focus."
			:rules="frameworkRules"
			clearable />
	</div>
</template>
