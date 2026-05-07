<script setup lang="ts">
	defineOptions({ name: 'CheckboxSizesExample' });
	import { ref } from 'vue';
	import { GCheckbox } from '@/components';
	import type { Sizes } from '@/types/CommonTypes';

	const checked = ref(true);
	const sizes: Sizes[] = ['s', 'm', 'l', 'xl'];
</script>

<template>
	<div class="docs-component-detail__field-grid">
		<g-checkbox
			v-for="size in sizes"
			:key="size"
			v-model="checked"
			:label="`Size ${size}`"
			:size="size"
			indicator-view="blob" />
	</div>
</template>
