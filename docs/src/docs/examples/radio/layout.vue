<script setup lang="ts">
	defineOptions({ name: 'RadioLayoutExample' });
	import { ref } from 'vue';
	import { GRadio } from '@/components';

	const density = ref('comfortable');
	const options = ['compact', 'comfortable', 'roomy'];
</script>

<template>
	<div class="docs-component-detail__field-grid">
		<g-radio
			v-model="density"
			label="Inline"
			:options="options" />
		<g-radio
			v-model="density"
			vertical
			label="Vertical"
			:options="options" />
	</div>
</template>
