<script
	setup
	lang="ts"
	generic="T = unknown, V extends GStepValue = GStepValue">
	import { computed } from 'vue';
	import GButton from '@/components/ui/GButton/GButton.vue';
	import { useStepperInject } from './context';
	import {
		makeStepperActionsProps,
		type GStepValue,
		type GStepperActionsSlotProps,
		type GStepperActionsSlots
	} from './types';

	const props = defineProps(makeStepperActionsProps());
	defineSlots<GStepperActionsSlots<T, V>>();
	const stepper = useStepperInject<T, V>();
	const slotProps = computed<GStepperActionsSlotProps<T, V>>(
		() =>
			stepper?.getSlotProps() ?? {
				modelValue: undefined,
				activeItem: undefined,
				activeIndex: -1,
				items: [],
				canPrev: false,
				canNext: false,
				isLast: false,
				select: () => undefined,
				next: () => undefined,
				prev: () => undefined,
				finish: () => undefined
			}
	);
	const prevText = computed(
		() => props.prevText ?? stepper?.prevText.value ?? 'Back'
	);
	const nextText = computed(() =>
		slotProps.value.isLast
			? (props.finishText ?? stepper?.finishText.value ?? 'Finish')
			: (props.nextText ?? stepper?.nextText.value ?? 'Next')
	);
	const onNext = (event: MouseEvent) => {
		if (slotProps.value.isLast) {
			slotProps.value.finish(event);
			return;
		}

		slotProps.value.next(event);
	};
</script>

<template>
	<div class="g-stepper-actions">
		<slot v-bind="slotProps">
			<slot
				name="prev"
				v-bind="slotProps">
				<g-button
					variant="text"
					:label="prevText"
					:disabled="!slotProps.canPrev"
					@click="slotProps.prev" />
			</slot>
			<slot
				name="next"
				v-bind="slotProps">
				<g-button
					:label="nextText"
					:disabled="!slotProps.canNext && !slotProps.isLast"
					@click="onNext" />
			</slot>
		</slot>
	</div>
</template>

<style scoped lang="scss">
	.g-stepper-actions {
		display: inline-flex;
		flex-wrap: wrap;
		gap: var(--g-token-space-2);
		align-items: center;
		justify-content: flex-end;

		min-width: 0;
	}
</style>
