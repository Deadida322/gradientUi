<script setup lang="ts">
	defineOptions({ name: 'CheckboxStatesExample' });
	import { ref } from 'vue';
	import { GCheckbox } from '@/components';

	const checked = ref(true);
</script>

<template>
	<div class="docs-component-detail__field-grid">
		<g-checkbox
			v-model="checked"
			label="Success"
			state="success" />
		<g-checkbox
			v-model="checked"
			label="Warning"
			state="warning" />
		<g-checkbox
			v-model="checked"
			label="Error"
			state="error" />
		<g-checkbox
			model-value
			label="Disabled"
			disabled />
	</div>
</template>
