<script setup lang="ts">
	defineOptions({ name: 'StepperStatesExample' });
	import { ref } from 'vue';
	import { GStepper } from '@/components';
	import type { GStepperItem } from '@/components';

	const step = ref('review');
	const steps: GStepperItem[] = [
		{ value: 'draft', title: 'Draft', completed: true },
		{ value: 'review', title: 'Review', state: 'warning' },
		{ value: 'publish', title: 'Publish', state: 'error' }
	];
</script>

<template>
	<g-stepper
		v-model="step"
		:items="steps"
		variant="tonal"
		editable
		hide-actions />
</template>
