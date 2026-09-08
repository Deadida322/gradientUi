<script setup lang="ts">
	defineOptions({ name: 'StepperUsageExample' });
	import { ref } from 'vue';
	import { GStepper, GStepPanel } from '@/components';

	const step = ref('details');
	const steps = [
		{
			value: 'details',
			title: 'Project',
			subtitle: 'Name and stack'
		},
		{
			value: 'design',
			title: 'Design',
			subtitle: 'Theme pass'
		},
		{
			value: 'review',
			title: 'Review',
			subtitle: 'Ship checklist'
		}
	];
</script>

<template>
	<g-stepper
		v-model="step"
		:items="steps"
		variant="glass"
		color="primary">
		<g-step-panel value="details">Project name and stack.</g-step-panel>
		<g-step-panel value="design"
			>Theme pass and component states.</g-step-panel
		>
		<g-step-panel value="review">Final checklist and docs.</g-step-panel>
	</g-stepper>
</template>
