<script setup lang="ts">
	defineOptions({ name: 'SwitchColorsExample' });
	import { ref } from 'vue';
	import { GSwitch } from '@/components';
	import type { GColor } from '@/use/color';

	const enabled = ref(true);
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
		<g-switch
			v-for="color in colors"
			:key="color"
			v-model="enabled"
			:label="color"
			:color="color" />
	</div>
</template>
