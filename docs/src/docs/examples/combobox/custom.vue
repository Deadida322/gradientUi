<script setup lang="ts">
	defineOptions({ name: 'ComboboxCustomExample' });
	import { ref } from 'vue';
	import { GCombobox } from '@/components';

	interface LabelOption {
		label: string;
		value: string;
	}

	const labels = ref(['urgent', 'design']);
	const options: LabelOption[] = [
		{ label: 'Urgent', value: 'urgent' },
		{ label: 'Design', value: 'design' },
		{ label: 'Docs', value: 'docs' },
		{ label: 'Blocked', value: 'blocked' }
	];
	const labelFromQuery = (query: string): LabelOption => ({
		label: query,
		value: query.toLocaleLowerCase().replace(/\s+/g, '-')
	});
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-combobox
			v-model="labels"
			multiple
			label="Labels"
			:items="options"
			:item-from-query="labelFromQuery"
			label-key="label"
			value-key="value"
			placeholder="Search or add label"
			color="pink"
			clearable />
	</div>
</template>
