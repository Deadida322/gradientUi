<script setup lang="ts">
	defineOptions({ name: 'RadioUsageExample' });
	import { ref } from 'vue';
	import { GRadio } from '@/components';

	const billing = ref('monthly');
	const options = ['monthly', 'yearly'];
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-radio
			v-model="billing"
			label="Billing"
			:options="options"
			message="Only one value can be selected." />
	</div>
</template>
