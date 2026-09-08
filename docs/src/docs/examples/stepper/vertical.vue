<script setup lang="ts">
	defineOptions({ name: 'StepperVerticalExample' });
	import { ref } from 'vue';
	import { GStepper, GStepPanel } from '@/components';

	const step = ref('plan');
	const steps = [
		{ value: 'plan', title: 'Plan', subtitle: 'Scope the release' },
		{ value: 'build', title: 'Build', subtitle: 'Implement pieces' },
		{ value: 'verify', title: 'Verify', subtitle: 'Run checks' }
	];
</script>

<template>
	<g-stepper
		v-model="step"
		:items="steps"
		orientation="vertical"
		variant="outlined">
		<g-step-panel value="plan">
			Confirm scope, states and naming.
		</g-step-panel>
		<g-step-panel value="build">
			Compose the stepper from navigation primitives.
		</g-step-panel>
		<g-step-panel value="verify">
			Type-check, lint and review examples.
		</g-step-panel>
	</g-stepper>
</template>
