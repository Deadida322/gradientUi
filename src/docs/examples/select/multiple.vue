<script setup lang="ts">
	defineOptions({ name: 'SelectMultipleExample' });
	import { ref } from 'vue';
	import { GSelect } from '@/components';

	const values = ref(['docs', 'tokens']);
	const areas = [
		{ label: 'Docs', value: 'docs' },
		{ label: 'Design tokens', value: 'tokens' },
		{ label: 'Components', value: 'components' },
		{ label: 'Validation', value: 'validation' }
	];
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-select
			v-model="values"
			multiple
			label="Focus areas"
			:items="areas"
			label-key="label"
			value-key="value" />
	</div>
</template>
