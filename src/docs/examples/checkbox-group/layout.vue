<script setup lang="ts">
	defineOptions({ name: 'CheckboxGroupLayoutExample' });
	import { ref } from 'vue';
	import { GCheckboxGroup } from '@/components';

	const selected = ref(['Email']);
	const options = ['Email', 'Product updates', 'Security alerts'];
</script>

<template>
	<div class="docs-component-detail__field-grid">
		<g-checkbox-group
			v-model="selected"
			label="Inline"
			:options="options" />
		<g-checkbox-group
			v-model="selected"
			vertical
			label="Vertical"
			:options="options" />
	</div>
</template>
