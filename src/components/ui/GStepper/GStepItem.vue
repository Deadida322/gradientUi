<script
	setup
	lang="ts"
	generic="T = unknown, V extends GStepValue = GStepValue">
	import { computed, ref } from 'vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import { useDisabled } from '@/use/disabled';
	import { useNavigationItem } from '@/use/navigation';
	import { resolveStateIcon } from '@/use/stateIcon';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { useStepperInject } from './context';
	import type {
		GStepValue,
		GStepperIconMap,
		GStepperItemSlotProps,
		GStepperResolvedItem,
		GStepperStepIconState,
		GStepperSlots
	} from './types';

	const props = defineProps<{
		item: GStepperResolvedItem<T, V>;
	}>();
	const slots =
		defineSlots<
			Pick<
				GStepperSlots<T, V>,
				'item' | 'indicator' | 'title' | 'subtitle'
			>
		>();

	const stepper = useStepperInject<T, V>();
	const rootRef = ref<HTMLElement | null>(null);
	const itemState = computed(
		() => stepper?.getItemState(props.item) ?? 'pending'
	);
	const itemAvailable = computed(
		() => stepper?.isStepAvailable(props.item) ?? false
	);
	const { value, selected, disabled, select, onClick, onKeydown } =
		useNavigationItem<V>({
			value: () => props.item.value,
			rootRef,
			disabled: () => !itemAvailable.value,
			parentDisabled: () => stepper?.disabled.value,
			isSelected: stepper?.isSelected,
			select: stepper?.select,
			registerItem: stepper?.registerStep,
			unregisterItem: stepper?.unregisterStep,
			onItemKeydown: stepper?.onStepKeydown
		});
	const completed = computed(
		() => stepper?.isStepCompleted(props.item) ?? false
	);
	const semanticState = computed(
		() => stepper?.getItemSemanticState(props.item) ?? props.item.state
	);
	const resolvedColor = computed(() => {
		if (semanticState.value) return semanticState.value;
		if (selected.value || completed.value)
			return stepper?.activeColor.value;

		return stepper?.color.value;
	});
	const { colorStyles } = useSurfaceColor({
		color: () => resolvedColor.value
	});
	const disabledClass = useDisabled(
		{
			get disabled() {
				return Boolean(disabled.value);
			}
		},
		'g-stepper-step'
	);
	const stepClasses = computed(() => ({
		'g-stepper-step_selected': selected.value,
		'g-stepper-step_completed': completed.value,
		'g-stepper-step_error': itemState.value === 'error',
		'g-stepper-step_optional': props.item.optional,
		'g-stepper-step_loading': props.item.loading,
		[disabledClass.value]: true,
		[`g-stepper-step_${itemState.value}`]: true,
		[`g-stepper-step_${stepper?.variant.value ?? 'default'}`]: true,
		[`g-stepper-step_${stepper?.size.value ?? 'm'}`]: true
	}));
	const slotProps = computed<GStepperItemSlotProps<T, V>>(
		() =>
			stepper?.getItemSlotProps(props.item) ?? {
				item: props.item,
				index: props.item.index,
				selected: selected.value,
				disabled: Boolean(disabled.value),
				completed: completed.value,
				state: itemState.value,
				semanticState: semanticState.value,
				select
			}
	);
	const stepIconState = computed<GStepperStepIconState>(() =>
		props.item.loading
			? 'loading'
			: itemState.value === 'completed'
				? 'completed'
				: (semanticState.value ?? itemState.value)
	);
	const defaultIcons: GStepperIconMap = {
		completed: 'check',
		error: 'alert-circle',
		loading: 'loading',
		success: 'check',
		warning: 'alert-outline'
	};
	const indicatorIcon = computed(() =>
		resolveStateIcon({
			state: stepIconState.value,
			icon: props.item.icon,
			icons: props.item.icons,
			defaultIcons
		})
	);
</script>

<template>
	<button
		:id="stepper?.getStepId(value)"
		ref="rootRef"
		v-ripple="!disabled"
		class="g-stepper-step"
		:class="stepClasses"
		:style="colorStyles"
		type="button"
		role="tab"
		:disabled="disabled"
		:tabindex="selected ? 0 : -1"
		:aria-selected="selected"
		:aria-current="selected ? 'step' : undefined"
		:aria-controls="stepper?.getPanelId(value)"
		@click="onClick"
		@keydown="onKeydown">
		<slot
			name="item"
			v-bind="slotProps">
			<span class="g-stepper-step__indicator">
				<slot
					name="indicator"
					v-bind="slotProps">
					<g-icon
						v-if="indicatorIcon"
						:icon="indicatorIcon" />
					<span v-else>{{ props.item.index + 1 }}</span>
				</slot>
			</span>
			<span class="g-stepper-step__body">
				<span class="g-stepper-step__title">
					<slot
						name="title"
						v-bind="slotProps">
						{{ props.item.title }}
					</slot>
				</span>
				<span
					v-if="
						props.item.subtitle ||
						props.item.optional ||
						slots.subtitle
					"
					class="g-stepper-step__subtitle">
					<slot
						name="subtitle"
						v-bind="slotProps">
						{{ props.item.subtitle ?? 'Optional' }}
					</slot>
				</span>
			</span>
		</slot>
	</button>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/base' as base;
	@use '@/styles/mixins/disabled' as disabled;

	.g-stepper-step {
		@include base.base-component('g-stepper-step');

		--g-stepper-step-size: 32px;
		--g-stepper-step-padding-y: var(--g-token-space-2);
		--g-stepper-step-padding-x: var(--g-token-space-2);

		cursor: pointer;

		position: relative;

		grid-template-columns: auto minmax(0, 1fr);
		gap: var(--g-token-space-2);
		justify-content: start;

		width: 100%;
		min-width: 0;
		padding: var(--g-stepper-step-padding-y) var(--g-stepper-step-padding-x);
		border-radius: var(--g-token-radius-sm);

		color: var(--g-token-text-soft);
		text-align: left;

		background: transparent;

		transition:
			color var(--g-token-duration-hover) var(--g-token-easing-standard),
			background-color var(--g-token-duration-hover)
				var(--g-token-easing-standard),
			box-shadow var(--g-token-duration-hover)
				var(--g-token-easing-standard);

		&:hover {
			color: var(--g-color);
			background: color-mix(in srgb, var(--g-color) 8%, transparent);
		}

		&:focus-visible {
			outline: var(--g-token-state-focus-ring-width) solid
				color-mix(in srgb, var(--g-color) 42%, transparent);
			outline-offset: 2px;
		}

		&_selected,
		&_completed {
			color: var(--g-color);
		}

		&_tonal.g-stepper-step_selected,
		&_glass.g-stepper-step_selected {
			background: color-mix(in srgb, var(--g-color) 12%, transparent);
		}

		&_default.g-stepper-step_selected {
			background: transparent;
		}

		&_outlined.g-stepper-step_selected {
			box-shadow: inset 0 0 0 1px
				color-mix(in srgb, var(--g-color) 42%, transparent);
		}

		&_glass.g-stepper-step_selected {
			backdrop-filter: blur(10px) saturate(140%);
			box-shadow:
				inset 0 1px 0 rgb(255 255 255 / 16%),
				inset 0 0 0 1px
					color-mix(in srgb, var(--g-color) 18%, transparent);
		}

		&_text.g-stepper-step_selected::after {
			content: '';

			position: absolute;
			right: var(--g-token-space-2);
			bottom: 0;
			left: var(--g-token-space-2);

			height: 2px;
			border-radius: var(--g-token-radius-pill);

			background: var(--g-color-gradient, var(--g-color));
		}

		&_error {
			color: var(--g-color);
		}

		&__indicator {
			display: inline-grid;
			flex: 0 0 auto;
			place-items: center;

			width: var(--g-stepper-step-size);
			height: var(--g-stepper-step-size);
			border-radius: var(--g-token-radius-pill);

			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-semibold);

			background: rgba(var(--g-theme-on-surface), 0.08);
		}

		&_selected &__indicator,
		&_completed &__indicator {
			color: var(--g-on-color);
			background: var(--g-color-gradient, var(--g-color));
		}

		&_error &__indicator {
			color: var(--g-on-color);
			background: var(--g-color-gradient, var(--g-color));
		}

		&__body {
			display: grid;
			gap: 2px;
			min-width: 0;
		}

		&__title,
		&__subtitle {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&__title {
			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-semibold);
			line-height: var(--g-token-line-height-sm);
		}

		&__subtitle {
			font-size: var(--g-token-font-size-xs);
			line-height: var(--g-token-line-height-xs);
			color: var(--g-token-text-muted);
		}

		&_s {
			--g-stepper-step-size: 28px;
		}

		&_l,
		&_xl {
			--g-stepper-step-size: 36px;
		}
	}

	@include disabled.disabled('g-stepper-step');
</style>
