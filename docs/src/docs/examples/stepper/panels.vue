<script setup lang="ts">
	defineOptions({ name: 'StepperPanelsExample' });
	import { ref } from 'vue';
	import { GStepper, GStepPanel } from '@/components';

	const step = ref('details');
	const steps = [
		{ value: 'details', title: 'Details' },
		{ value: 'theme', title: 'Theme' },
		{ value: 'review', title: 'Review' }
	];
</script>

<template>
	<g-stepper
		v-model="step"
		:items="steps"
		variant="tonal">
		<g-step-panel
			value="details"
			variant="default">
			Project basics and team ownership.
		</g-step-panel>
		<g-step-panel
			value="theme"
			variant="glass"
			:backdrop-blur="12"
			border-width="1">
			Theme tokens, color states and surface behavior.
		</g-step-panel>
		<g-step-panel
			value="review"
			variant="gradient"
			color="success">
			Final review checklist before shipping.
		</g-step-panel>
	</g-stepper>
</template>
