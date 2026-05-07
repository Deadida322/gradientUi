<script setup lang="ts">
	defineOptions({ name: 'CheckboxIndicatorViewsExample' });
	import { ref } from 'vue';
	import { GCheckbox } from '@/components';
	import type { CheckIndicatorView } from '@/use/check';

	const checked = ref(true);
	const views: CheckIndicatorView[] = [
		'default',
		'squircle',
		'diamond',
		'soft',
		'blob',
		'cut-corner'
	];
</script>

<template>
	<div class="docs-component-detail__field-grid">
		<g-checkbox
			v-for="view in views"
			:key="view"
			v-model="checked"
			:label="view"
			:indicator-view="view" />
	</div>
</template>
