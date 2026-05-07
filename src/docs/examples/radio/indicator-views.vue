<script setup lang="ts">
	defineOptions({ name: 'RadioIndicatorViewsExample' });
	import { GRadio } from '@/components';

	const views = [
		'default',
		'squircle',
		'diamond',
		'soft',
		'blob',
		'cut-corner'
	] as const;
</script>

<template>
	<div class="docs-component-detail__field-grid">
		<g-radio
			v-for="view in views"
			:key="view"
			model-value="selected"
			:label="view"
			:options="['selected']"
			:indicator-view="view" />
	</div>
</template>
