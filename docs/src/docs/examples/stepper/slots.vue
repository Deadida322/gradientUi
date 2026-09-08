<script setup lang="ts">
	defineOptions({ name: 'StepperSlotsExample' });
	import { ref } from 'vue';
	import { GButton, GStepper } from '@/components';
	import type { GStepperItem } from '@/components';

	const step = ref('account');
	const steps: GStepperItem[] = [
		{ value: 'account', title: 'Account', icon: 'account' },
		{
			value: 'billing',
			title: 'Billing',
			icon: 'credit-card',
			completed: true,
			icons: { completed: 'credit-card-check-outline' }
		},
		{
			value: 'done',
			title: 'Done',
			icon: 'check-circle-outline',
			icons: { active: 'rocket-launch-outline' }
		}
	];
</script>

<template>
	<g-stepper
		v-model="step"
		:items="steps"
		variant="text"
		editable>
		<template #panel="{ activeItem }">
			{{ activeItem?.title }}
		</template>

		<template #actions="{ canPrev, canNext, isLast, prev, next, finish }">
			<div class="d-flex gap-1">
				<g-button
					variant="text"
					label="Previous"
					:disabled="!canPrev"
					@click="prev" />
				<g-button
					variant="glass"
					:label="isLast ? 'Done' : 'Continue'"
					:disabled="!canNext && !isLast"
					@click="isLast ? finish($event) : next($event)" />
			</div>
		</template>
	</g-stepper>
</template>
