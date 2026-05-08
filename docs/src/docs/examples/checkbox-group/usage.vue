<script setup lang="ts">
	defineOptions({ name: 'CheckboxGroupUsageExample' });
	import { ref } from 'vue';
	import { GCheckboxGroup } from '@/components';

	const selected = ref(['Design tokens']);
	const options = ['Design tokens', 'Components', 'Docs'];
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-checkbox-group
			v-model="selected"
			label="Workstreams"
			:options="options"
			message="Choose every area that applies." />
	</div>
</template>
