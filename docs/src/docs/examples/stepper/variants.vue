<script setup lang="ts">
	defineOptions({ name: 'StepperVariantsExample' });
	import { ref } from 'vue';
	import { GStepper } from '@/components';
	import type { GStepperVariant } from '@/components';

	const variants: GStepperVariant[] = [
		'default',
		'tonal',
		'outlined',
		'glass',
		'text'
	];
	const models = ref<Record<GStepperVariant, string>>({
		default: 'details',
		tonal: 'details',
		outlined: 'details',
		glass: 'details',
		text: 'details'
	});
	const steps = [
		{ value: 'details', title: 'Details' },
		{ value: 'design', title: 'Design' },
		{ value: 'review', title: 'Review' }
	];
</script>

<template>
	<div class="stepper-variants">
		<g-stepper
			v-for="variant in variants"
			:key="variant"
			v-model="models[variant]"
			:items="steps"
			:variant="variant"
			hide-actions />
	</div>
</template>

<style scoped lang="scss">
	.stepper-variants {
		display: grid;
		gap: var(--g-token-space-4);
	}
</style>
