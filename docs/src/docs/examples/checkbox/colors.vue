<script setup lang="ts">
	defineOptions({ name: 'CheckboxColorsExample' });
	import { ref } from 'vue';
	import { GCheckbox } from '@/components';

	const checked = ref(true);
	const colors = ['primary', 'cyan', 'deep-purple', 'green', 'pink'];
</script>

<template>
	<div class="docs-component-detail__field-grid">
		<g-checkbox
			v-for="color in colors"
			:key="color"
			v-model="checked"
			:label="color"
			:color="color"
			indicator-view="squircle" />
	</div>
</template>
