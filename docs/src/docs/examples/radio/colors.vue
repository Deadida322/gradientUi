<script setup lang="ts">
	defineOptions({ name: 'RadioColorsExample' });
	import { ref } from 'vue';
	import { GRadio } from '@/components';
	import type { GColor } from '@/use/color';

	const selected = ref('cyan');
	const colors = [
		'primary',
		'cyan',
		'deep-purple',
		'green',
		'pink'
	] as const satisfies readonly GColor[];
</script>

<template>
	<div class="docs-component-detail__field-grid">
		<g-radio
			v-for="color in colors"
			:key="color"
			v-model="selected"
			:label="color"
			:options="[color]"
			:color="color"
			indicator-view="blob" />
	</div>
</template>
