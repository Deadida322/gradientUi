<script setup lang="ts">
	defineOptions({ name: 'StepperDividersExample' });
	import { ref } from 'vue';
	import { GStepper } from '@/components';

	const solid = ref('design');
	const dashed = ref('design');
	const hidden = ref('design');
	const steps = [
		{ value: 'details', title: 'Details', completed: true },
		{ value: 'design', title: 'Design' },
		{ value: 'review', title: 'Review' }
	];
</script>

<template>
	<div class="stepper-dividers">
		<g-stepper
			v-model="solid"
			:items="steps"
			:divider-options="{
				variant: 'gradient',
				thickness: 4,
				color: 'warning',
				activeColor: 'success'
			}"
			hide-actions />

		<g-stepper
			v-model="dashed"
			:items="steps"
			:divider-options="{
				variant: 'dashed',
				thickness: 2,
				length: '72%',
				color: 'cyan'
			}"
			hide-actions />

		<g-stepper
			v-model="hidden"
			:items="steps"
			:divider="false"
			hide-actions />
	</div>
</template>

<style scoped lang="scss">
	.stepper-dividers {
		display: grid;
		gap: var(--g-token-space-4);
	}
</style>
