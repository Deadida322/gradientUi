<script
	setup
	lang="ts"
	generic="T = unknown, V extends GStepValue = GStepValue">
	import { computed } from 'vue';
	import { useDisabled } from '@/use/disabled';
	import { useRounded } from '@/use/rounded';
	import { useSize } from '@/use/size';
	import { useStepperController } from '@/use/stepper';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import {
		resolveColorValue,
		useResolveGradientValue
	} from '@/use/colorResolver';
	import usePx from '@/use/px';
	import { createComponentId } from '@/utils/createComponentId';
	import { provideStepper } from './context';
	import GStepItem from './GStepItem.vue';
	import GStepperActions from './GStepperActions.vue';
	import {
		makeStepperProps,
		type GStepValue,
		type GStepperEmits,
		type GStepperItem,
		type GStepperItemSlotProps,
		type GStepperSlots,
		type GStepperSlotProps
	} from './types';

	const props = defineProps(makeStepperProps({ color: 'primary' }));
	const slots = defineSlots<GStepperSlots<T, V>>();
	const emit = defineEmits<GStepperEmits<T, V>>();

	const rootId = createComponentId('g-stepper');
	const stepper = useStepperController<T, V>({
		items: () => props.items as readonly GStepperItem<T, V>[],
		modelValue: () => props.modelValue as V | undefined,
		defaultValue: () => props.defaultValue as V | undefined,
		disabled: () => props.disabled,
		mandatory: () => props.mandatory,
		linear: () => props.linear,
		editable: () => props.editable,
		activation: () => props.activation,
		orientation: () => props.orientation,
		idPrefix: rootId,
		onUpdateModelValue: (value) => emit('update:modelValue', value),
		onSelect: (value, item, event) => emit('select', value, item, event),
		onNext: (value, item, event) => emit('next', value, item, event),
		onPrev: (value, item, event) => emit('prev', value, item, event),
		onFinish: (value, item, event) => emit('finish', value, item, event)
	});
	const resolvedActiveColor = computed(
		() => props.activeColor ?? props.color
	);
	const { colorStyles, resolvedGradient } = useSurfaceColor({
		color: () => resolvedActiveColor.value
	});
	const resolvedDividerOptions = computed(() => ({
		variant: props.dividerOptions?.variant ?? 'solid',
		thickness: props.dividerOptions?.thickness ?? 2,
		length: props.dividerOptions?.length,
		color: props.dividerOptions?.color ?? props.color,
		activeColor:
			props.dividerOptions?.activeColor ??
			props.activeColor ??
			props.color
	}));
	const dividerColor = computed(() =>
		resolveColorValue(resolvedDividerOptions.value.color)
	);
	const dividerActiveColor = computed(() =>
		resolveColorValue(resolvedDividerOptions.value.activeColor)
	);
	const resolvedDividerGradient = useResolveGradientValue(
		() => resolvedDividerOptions.value.color
	);
	const resolvedDividerActiveGradient = useResolveGradientValue(
		() => resolvedDividerOptions.value.activeColor
	);
	const dividerThickness = usePx(
		computed(() => resolvedDividerOptions.value.thickness ?? 2)
	);
	const dividerLength = usePx(
		computed(() => resolvedDividerOptions.value.length ?? '')
	);
	const rootStyles = computed(() => [
		colorStyles.value,
		{
			'--g-stepper-active-gradient': resolvedGradient.value,
			'--g-stepper-divider-color': dividerColor.value,
			'--g-stepper-divider-active-color': dividerActiveColor.value,
			'--g-stepper-divider-gradient': resolvedDividerGradient.value,
			'--g-stepper-divider-active-gradient':
				resolvedDividerActiveGradient.value,
			'--g-stepper-divider-length': dividerLength.value || undefined,
			'--g-stepper-divider-thickness': dividerThickness.value
		}
	]);
	const disabledClass = useDisabled(props, 'g-stepper');
	const roundedClass = useRounded(props, 'g-stepper');
	const sizeClass = useSize(props, 'g-stepper');
	const rootClasses = computed(() => ({
		[`g-stepper_${props.orientation}`]: true,
		[`g-stepper_${props.variant}`]: true,
		'g-stepper_alt-labels': props.altLabels,
		[disabledClass.value]: true,
		[roundedClass.value]: true,
		[sizeClass.value]: true
	}));
	const getSlotProps = (): GStepperSlotProps<T, V> => ({
		modelValue: stepper.model.value,
		activeItem: stepper.activeItem.value,
		activeIndex: stepper.activeIndex.value,
		items: stepper.items.value,
		canPrev: stepper.canPrev.value,
		canNext: stepper.canNext.value,
		isLast: stepper.isLast.value,
		select: stepper.select,
		next: stepper.next,
		prev: stepper.prev,
		finish: stepper.finish
	});
	const getItemSlotProps = (
		item: (typeof stepper.items.value)[number]
	): GStepperItemSlotProps<T, V> => ({
		item,
		index: item.index,
		selected: stepper.isSelected(item.value),
		disabled: !stepper.isStepAvailable(item),
		completed: stepper.isStepCompleted(item),
		state: stepper.getItemState(item),
		semanticState: stepper.getItemSemanticState(item),
		select: stepper.select
	});
	const slotProps = computed(getSlotProps);

	provideStepper<T, V>({
		modelValue: stepper.model,
		items: stepper.items,
		activeItem: stepper.activeItem,
		activeIndex: stepper.activeIndex,
		color: computed(() => props.color),
		activeColor: resolvedActiveColor,
		activation: computed(() => props.activation),
		orientation: computed(() => props.orientation),
		variant: computed(() => props.variant),
		size: computed(() => props.size),
		disabled: computed(() => props.disabled),
		canPrev: stepper.canPrev,
		canNext: stepper.canNext,
		isLast: stepper.isLast,
		prevText: computed(() => props.prevText),
		nextText: computed(() => props.nextText),
		finishText: computed(() => props.finishText),
		isSelected: stepper.isSelected,
		isStepAvailable: stepper.isStepAvailable,
		isStepCompleted: stepper.isStepCompleted,
		getItemState: stepper.getItemState,
		getItemSemanticState: stepper.getItemSemanticState,
		select: stepper.select,
		next: stepper.next,
		prev: stepper.prev,
		finish: stepper.finish,
		registerStep: stepper.registerStep,
		unregisterStep: stepper.unregisterItem,
		onStepKeydown: stepper.onItemKeydown,
		getStepId: stepper.getItemId,
		getPanelId: stepper.getPanelId,
		getItemSlotProps,
		getSlotProps
	});
</script>

<template>
	<div
		class="g-stepper"
		:class="rootClasses"
		:style="rootStyles">
		<div
			class="g-stepper__list"
			role="tablist"
			:aria-orientation="props.orientation">
			<template
				v-for="(item, index) in stepper.items.value"
				:key="String(item.value)">
				<g-step-item :item="item">
					<template
						v-if="slots.item"
						#item>
						<slot
							name="item"
							v-bind="getItemSlotProps(item)" />
					</template>
					<template
						v-if="slots.indicator"
						#indicator>
						<slot
							name="indicator"
							v-bind="getItemSlotProps(item)" />
					</template>
					<template
						v-if="slots.title"
						#title>
						<slot
							name="title"
							v-bind="getItemSlotProps(item)" />
					</template>
					<template
						v-if="slots.subtitle"
						#subtitle>
						<slot
							name="subtitle"
							v-bind="getItemSlotProps(item)" />
					</template>
				</g-step-item>
				<span
					v-if="
						props.divider && index < stepper.items.value.length - 1
					"
					class="g-stepper__connector"
					:class="{
						'g-stepper__connector_active':
							index < stepper.activeIndex.value,
						[`g-stepper__connector_${resolvedDividerOptions.variant}`]: true
					}"
					aria-hidden="true"></span>
			</template>
		</div>

		<div class="g-stepper__content">
			<slot v-bind="slotProps">
				<section
					v-if="slots.panel"
					:id="stepper.getPanelId(stepper.model.value)"
					class="g-stepper__panel"
					role="tabpanel"
					:tabindex="0"
					:aria-labelledby="stepper.getItemId(stepper.model.value)">
					<slot
						name="panel"
						v-bind="slotProps" />
				</section>
			</slot>
		</div>

		<div
			v-if="!props.hideActions"
			class="g-stepper__actions">
			<slot
				name="actions"
				v-bind="slotProps">
				<g-stepper-actions />
			</slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/disabled' as disabled;
	@use '@/styles/mixins/rounded' as rounded;

	.g-stepper {
		--g-stepper-list-gap: var(--g-token-space-2);
		--g-stepper-divider-thickness: 2px;
		--g-stepper-surface: transparent;

		display: grid;
		gap: var(--g-token-space-4);
		min-width: 0;
		color: var(--g-token-color-on-surface);

		&_vertical {
			grid-template-columns: minmax(220px, max-content) minmax(0, 1fr);
			align-items: start;
		}

		&__list {
			display: grid;
			grid-auto-columns: minmax(0, 1fr);
			grid-auto-flow: column;
			gap: var(--g-stepper-list-gap);
			align-items: center;

			min-width: 0;
			padding: var(--g-token-space-1);
			border-radius: var(--g-token-radius-md);

			background: var(--g-stepper-surface);
		}

		&_vertical &__list {
			grid-auto-flow: row;
			grid-auto-rows: auto;
			grid-template-columns: 1fr;
			align-items: stretch;
		}

		&_tonal &__list {
			background: rgba(var(--g-theme-on-surface), 0.04);
		}

		&_glass &__list {
			background: rgba(var(--g-theme-surface), 0.5);
			backdrop-filter: blur(12px) saturate(140%);
			box-shadow: inset 0 0 0 1px rgba(var(--g-theme-on-surface), 0.08);
		}

		&_outlined &__list {
			background: transparent;
			box-shadow: inset 0 0 0 1px rgba(var(--g-theme-on-surface), 0.16);
		}

		&_text &__list {
			padding: 0;
			background: transparent;
		}

		&__connector {
			display: block;
			align-self: center;

			width: var(--g-stepper-divider-length, 100%);
			height: var(--g-stepper-divider-thickness);
			border-radius: var(--g-token-radius-pill);

			background: color-mix(
				in srgb,
				var(--g-stepper-divider-color) 24%,
				transparent
			);

			transition:
				background var(--g-token-duration-hover)
					var(--g-token-easing-standard),
				border-color var(--g-token-duration-hover)
					var(--g-token-easing-standard);
		}

		&_vertical &__connector {
			justify-self: center;
			width: var(--g-stepper-divider-thickness);
			height: var(--g-stepper-divider-length, var(--g-token-space-5));
		}

		&__connector_active {
			background: var(
				--g-stepper-divider-active-gradient,
				var(--g-stepper-active-gradient, var(--g-color))
			);
		}

		&__connector_gradient {
			background: var(--g-stepper-divider-gradient, var(--g-color));
		}

		&__connector_gradient.g-stepper__connector_active {
			background: var(
				--g-stepper-divider-active-gradient,
				var(--g-stepper-active-gradient, var(--g-color))
			);
		}

		&__connector_dashed,
		&__connector_dotted {
			height: 0;
			border-top: var(--g-stepper-divider-thickness) dashed
				color-mix(
					in srgb,
					var(--g-stepper-divider-color) 32%,
					transparent
				);
			background: transparent;
		}

		&__connector_dotted {
			border-top-style: dotted;
		}

		&_vertical &__connector_dashed,
		&_vertical &__connector_dotted {
			width: 0;
			height: var(--g-stepper-divider-length, var(--g-token-space-5));
			border-top: 0;
			border-left: var(--g-stepper-divider-thickness) dashed
				color-mix(
					in srgb,
					var(--g-stepper-divider-color) 32%,
					transparent
				);
		}

		&_vertical &__connector_dotted {
			border-left-style: dotted;
		}

		&__connector_dashed.g-stepper__connector_active,
		&__connector_dotted.g-stepper__connector_active {
			border-color: var(--g-stepper-divider-active-color, var(--g-color));
			background: transparent;
		}

		&__content,
		&__panel {
			min-width: 0;
		}

		&__panel {
			&:focus-visible {
				outline: var(--g-token-state-focus-ring-width) solid
					var(--g-token-focus-ring);
				outline-offset: 2px;
			}
		}

		&__actions {
			display: flex;
			justify-content: flex-end;
			min-width: 0;
		}

		&_vertical &__actions {
			grid-column: 2;
		}

		&_alt-labels &__list {
			align-items: start;
		}
	}

	@include disabled.disabled('g-stepper');
	@include rounded.rounded('g-stepper');
</style>
