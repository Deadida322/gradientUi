<script setup generic="T" lang="ts">
	import { computed } from 'vue';
	import GGradient from '@/components/ui/GGradient/GGradient.vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import TransitionExpansion from '@/components/transitions/TransitionExpansion.vue';
	import { useExpansionGroupInject } from '@/use/expansion';
	import { useRounded } from '@/use/rounded';
	import { useSelected } from '@/use/selected';
	import { useSize } from '@/use/size';
	import { useVariant } from '@/use/variant';
	import { createComponentId } from '@/utils/createComponentId';
	import {
		makeExpansionProps,
		type GExpansionEmits,
		type GExpansionSlotProps,
		type GExpansionSlots
	} from './types';

	const props = defineProps(
		makeExpansionProps({
			disabled: false,
			rounded: false,
			size: 'm',
			modelValue: false,
			readonly: false,
			hideActions: false,
			openedIcon: 'chevron-up',
			closedIcon: 'chevron-down',
			eager: false,
			borderWidth: 0,
			glow: false,
			animateGlow: false,
			shadow: false,
			placement: 'center',
			activeBorderWidth: undefined,
			activeGlow: undefined,
			activeAnimateGlow: undefined,
			activeShadow: undefined,
			activeState: undefined,
			activePlacement: undefined
		})
	);

	const slots = defineSlots<GExpansionSlots<T>>();
	const emit = defineEmits<GExpansionEmits>();

	const group = useExpansionGroupInject<T>();
	const isInGroup = computed(
		() => group !== null && props.value !== undefined
	);
	const expanded = computed(() =>
		isInGroup.value ? group!.isSelected(props.value as T) : props.modelValue
	);
	const resolvedDisabled = computed(
		() =>
			props.disabled ||
			(isInGroup.value && group ? group.disabled : false)
	);
	const resolvedReadonly = computed(
		() =>
			props.readonly ||
			(isInGroup.value && group ? group.readonly : false)
	);
	const contentMounted = computed(() => props.eager || expanded.value);
	const sizeClass = useSize(props, 'g-expansion');
	const variantClass = useVariant(props, 'g-expansion');
	const disabledClass = computed(() =>
		resolvedDisabled.value ? 'g-expansion_disabled' : ''
	);
	const roundedClass = useRounded(props, 'g-expansion');
	const selectedClass = useSelected(
		{ selected: () => expanded.value },
		'g-expansion'
	);
	const resolvedVisualState = computed(() =>
		expanded.value && props.activeState !== undefined
			? props.activeState
			: props.state
	);
	const stateClass = computed(() =>
		resolvedVisualState.value
			? `g-expansion_state-${resolvedVisualState.value}`
			: ''
	);
	const gradientBorderRadius = computed(() => (props.rounded ? 20 : 10));
	const headerId = createComponentId('g-expansion-header');
	const contentId = createComponentId('g-expansion-content');
	const resolvedGradientBorderWidth = computed(() =>
		expanded.value && props.activeBorderWidth !== undefined
			? props.activeBorderWidth
			: props.borderWidth
	);
	const resolvedGradientGlow = computed(() =>
		expanded.value && props.activeGlow !== undefined
			? props.activeGlow
			: props.glow
	);
	const resolvedGradientAnimateGlow = computed(() =>
		expanded.value && props.activeAnimateGlow !== undefined
			? props.activeAnimateGlow
			: props.animateGlow
	);
	const resolvedGradientShadow = computed(() =>
		expanded.value && props.activeShadow !== undefined
			? props.activeShadow
			: props.shadow
	);
	const resolvedGradientState = computed(() =>
		expanded.value && props.activeState !== undefined
			? props.activeState
			: props.state
	);
	const resolvedGradientPlacement = computed(() =>
		expanded.value && props.activePlacement !== undefined
			? props.activePlacement
			: props.placement
	);
	const hasGradientSurface = computed(() => {
		const borderWidth = resolvedGradientBorderWidth.value;
		const hasBorder =
			borderWidth !== undefined &&
			borderWidth !== null &&
			borderWidth !== '' &&
			borderWidth !== 0 &&
			borderWidth !== '0';

		return Boolean(
			hasBorder ||
			resolvedGradientGlow.value ||
			resolvedGradientShadow.value ||
			resolvedGradientState.value ||
			props.animateGlow ||
			props.activeAnimateGlow
		);
	});
	const gradientSurfaceProps = computed(() =>
		hasGradientSurface.value
			? {
					active: expanded.value,
					disabled: resolvedDisabled.value,
					rounded: props.rounded,
					borderWidth: resolvedGradientBorderWidth.value,
					borderRadius: gradientBorderRadius.value,
					glow: resolvedGradientGlow.value,
					animateGlow: resolvedGradientAnimateGlow.value,
					shadow: resolvedGradientShadow.value,
					state: resolvedGradientState.value,
					placement: resolvedGradientPlacement.value,
					inheritWidth: true
				}
			: {}
	);

	const slotProps = computed<GExpansionSlotProps<T>>(() => ({
		expanded: expanded.value,
		disabled: resolvedDisabled.value,
		readonly: resolvedReadonly.value,
		value: props.value as T | undefined,
		toggle
	}));

	function toggle() {
		if (resolvedDisabled.value || resolvedReadonly.value) {
			return;
		}

		if (isInGroup.value) {
			group!.toggle(props.value as T);
			return;
		}

		emit('update:modelValue', !props.modelValue);
	}

	function onHeaderClick(event: MouseEvent) {
		toggle();
		emit('click', event);
	}
</script>

<template>
	<component
		:is="hasGradientSurface ? GGradient : 'div'"
		class="g-expansion__surface"
		v-bind="gradientSurfaceProps">
		<article
			class="g-expansion"
			:class="[
				sizeClass,
				variantClass,
				stateClass,
				disabledClass,
				roundedClass,
				selectedClass,
				{
					'g-expansion_gradient': hasGradientSurface
				}
			]">
			<button
				:id="headerId"
				:aria-controls="contentId"
				:aria-expanded="expanded"
				:disabled="resolvedDisabled"
				class="g-expansion__header"
				type="button"
				@click="onHeaderClick">
				<span class="g-expansion__heading">
					<span
						v-if="slots.title || props.title"
						class="g-expansion__title">
						<slot
							name="title"
							v-bind="slotProps">
							{{ props.title }}
						</slot>
					</span>

					<span
						v-if="slots.text || props.text"
						class="g-expansion__text">
						<slot
							name="text"
							v-bind="slotProps">
							{{ props.text }}
						</slot>
					</span>
				</span>

				<span
					v-if="!props.hideActions"
					class="g-expansion__actions"
					:class="{ 'g-expansion__actions_expanded': expanded }">
					<slot
						name="actions"
						v-bind="slotProps">
						<g-icon
							:icon="
								expanded ? props.openedIcon : props.closedIcon
							" />
					</slot>
				</span>
			</button>

			<transition-expansion :duration="0.24">
				<div
					v-if="contentMounted"
					v-show="expanded"
					:id="contentId"
					:aria-labelledby="headerId"
					class="g-expansion__body"
					role="region">
					<div class="g-expansion__content">
						<slot v-bind="slotProps" />
					</div>
				</div>
			</transition-expansion>
		</article>
	</component>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/focus-ring' as focusRing;

	.g-expansion {
		display: flex;
		flex-direction: column;

		width: 100%;
		border-radius: var(--g-token-expansion-radius);

		color: var(--g-token-expansion-color);

		background: var(--g-token-expansion-surface);
		box-shadow: var(--g-token-expansion-shadow);

		transition:
			background-color var(--g-token-duration-base)
				var(--g-token-easing-standard),
			box-shadow var(--g-token-duration-base)
				var(--g-token-easing-standard);

		&_gradient {
			box-shadow: none;
		}

		&__header {
			cursor: pointer;

			display: flex;
			gap: var(--g-token-expansion-header-gap);
			align-items: flex-start;
			justify-content: space-between;

			width: 100%;
			padding: var(--g-token-expansion-padding-y-m)
				var(--g-token-expansion-padding-x-m);
			border: none;
			border-radius: inherit;

			font: inherit;
			color: inherit;
			text-align: left;

			background: transparent;

			transition:
				background-color var(--g-token-duration-hover)
					var(--g-token-easing-standard),
				color var(--g-token-duration-base)
					var(--g-token-easing-standard);

			&:focus-visible {
				@include focusRing.focus-ring;
			}

			&:disabled {
				cursor: not-allowed;
			}
		}

		&__heading {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;
			gap: var(--g-token-expansion-heading-gap);

			min-width: 0;
		}

		&__title {
			font-size: var(--g-token-expansion-title-font-size-m);
			font-weight: var(--g-token-expansion-title-font-weight);
			line-height: var(--g-token-expansion-title-line-height);
		}

		&__text {
			font-size: var(--g-token-expansion-text-font-size);
			line-height: var(--g-token-expansion-text-line-height);
			color: var(--g-token-expansion-text-color);
		}

		&__actions {
			display: inline-flex;
			flex: 0 0 auto;
			align-items: center;
			justify-content: center;

			height: var(--g-token-expansion-icon-size);

			color: var(--g-token-expansion-actions-color);
		}

		&__body {
			overflow: hidden;
		}

		&__content {
			padding: 0 var(--g-token-expansion-padding-x-m)
				var(--g-token-expansion-content-padding-bottom-m);
			font-size: var(--g-token-expansion-content-font-size);
			line-height: var(--g-token-expansion-content-line-height);
			color: var(--g-token-expansion-content-color);
		}

		&_default {
			background: var(--g-token-expansion-surface);
			box-shadow: var(--g-token-expansion-shadow);
		}

		&_default#{&}_selected {
			background: var(--g-token-expansion-surface-active);
			box-shadow: var(--g-token-expansion-shadow-active);
		}

		&_tonal {
			background: var(--g-token-expansion-tonal-surface);
			box-shadow: none;
		}

		&_tonal .g-expansion__text,
		&_tonal .g-expansion__content {
			color: var(--g-token-expansion-tonal-content-color);
		}

		&_tonal .g-expansion__actions {
			color: var(--g-token-expansion-tonal-actions-color);
		}

		&_tonal#{&}_selected {
			background: var(--g-token-expansion-tonal-surface-active);
			box-shadow: none;
		}

		&_outlined {
			background: var(--g-token-expansion-outlined-surface);
			outline: 1px solid var(--g-token-expansion-outlined-border-color);
			outline-offset: -1px;
			box-shadow: none;
		}

		&_outlined .g-expansion__actions {
			color: var(--g-token-expansion-outlined-actions-color);
		}

		&_outlined#{&}_selected {
			background: var(--g-token-expansion-outlined-surface-active);
			outline-color: var(
				--g-token-expansion-outlined-border-color-active
			);
			box-shadow: none;
		}

		&_text {
			background: transparent;
			box-shadow: none;
		}

		&_text .g-expansion__actions {
			color: var(--g-token-expansion-text-actions-color);
		}

		&_text .g-expansion__content {
			padding-top: var(--g-token-space-1);
		}

		&_text#{&}_selected {
			background: var(--g-token-expansion-text-surface-active);
			box-shadow: none;
		}

		&_selected {
			color: var(--g-token-expansion-color-active);
		}

		&_selected &__header {
			color: var(--g-token-expansion-color-active);
		}

		&_selected &__actions {
			color: var(--g-token-expansion-actions-color-active);
		}

		&_state-warning {
			&.g-expansion_default {
				background: var(--g-token-expansion-state-warning-surface);
			}

			&.g-expansion_default.g-expansion_selected {
				background: var(
					--g-token-expansion-state-warning-surface-active
				);
			}

			&.g-expansion_tonal {
				background: var(
					--g-token-expansion-state-warning-tonal-surface
				);
			}

			&.g-expansion_tonal.g-expansion_selected {
				background: var(
					--g-token-expansion-state-warning-tonal-surface-active
				);
			}

			&.g-expansion_outlined {
				outline-color: var(--g-token-expansion-state-warning-border);
			}

			.g-expansion__title,
			.g-expansion__actions {
				color: var(--g-token-expansion-state-warning-color);
			}
		}

		&_state-error {
			&.g-expansion_default {
				background: var(--g-token-expansion-state-error-surface);
			}

			&.g-expansion_default.g-expansion_selected {
				background: var(--g-token-expansion-state-error-surface-active);
			}

			&.g-expansion_tonal {
				background: var(--g-token-expansion-state-error-tonal-surface);
			}

			&.g-expansion_tonal.g-expansion_selected {
				background: var(
					--g-token-expansion-state-error-tonal-surface-active
				);
			}

			&.g-expansion_outlined {
				outline-color: var(--g-token-expansion-state-error-border);
			}

			.g-expansion__title,
			.g-expansion__actions {
				color: var(--g-token-expansion-state-error-color);
			}
		}

		&_state-success {
			&.g-expansion_default {
				background: var(--g-token-expansion-state-success-surface);
			}

			&.g-expansion_default.g-expansion_selected {
				background: var(
					--g-token-expansion-state-success-surface-active
				);
			}

			&.g-expansion_tonal {
				background: var(
					--g-token-expansion-state-success-tonal-surface
				);
			}

			&.g-expansion_tonal.g-expansion_selected {
				background: var(
					--g-token-expansion-state-success-tonal-surface-active
				);
			}

			&.g-expansion_outlined {
				outline-color: var(--g-token-expansion-state-success-border);
			}

			.g-expansion__title,
			.g-expansion__actions {
				color: var(--g-token-expansion-state-success-color);
			}
		}

		&_disabled {
			opacity: var(--g-token-opacity-disabled);
		}

		&_rounded {
			border-radius: var(--g-token-expansion-radius-rounded);
		}

		&_s {
			.g-expansion__header {
				padding: var(--g-token-expansion-padding-y-s)
					var(--g-token-expansion-padding-x-s);
			}

			.g-expansion__title {
				font-size: var(--g-token-expansion-title-font-size-s);
			}

			.g-expansion__content {
				padding: 0 var(--g-token-expansion-padding-x-s)
					var(--g-token-expansion-content-padding-bottom-s);
			}
		}

		&_l {
			.g-expansion__header {
				padding: var(--g-token-expansion-padding-y-l)
					var(--g-token-expansion-padding-x-l);
			}

			.g-expansion__title {
				font-size: var(--g-token-expansion-title-font-size-l);
			}

			.g-expansion__content {
				padding: 0 var(--g-token-expansion-padding-x-l)
					var(--g-token-expansion-content-padding-bottom-l);
			}
		}

		&_xl {
			.g-expansion__header {
				padding: var(--g-token-expansion-padding-y-xl)
					var(--g-token-expansion-padding-x-xl);
			}

			.g-expansion__title {
				font-size: var(--g-token-expansion-title-font-size-xl);
			}

			.g-expansion__content {
				padding: 0 var(--g-token-expansion-padding-x-xl)
					var(--g-token-expansion-content-padding-bottom-xl);
			}
		}

		&_text &__header:hover {
			background: var(--g-token-expansion-text-hover-surface);
		}
	}

	.g-expansion__surface {
		width: 100%;
	}
</style>
