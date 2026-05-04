<script setup generic="T" lang="ts">
	import { computed, ref, watch } from 'vue';
	import GGradient from '@/components/ui/GGradient/GGradient.vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import { GExpandTransition } from '@/components/transitions';
	import { useExpansionGroupInject } from '@/use/expansion';
	import { useRounded } from '@/use/rounded';
	import { useSelected } from '@/use/selected';
	import { useSize } from '@/use/size';
	import { useSurfaceLayers } from '@/use/surface';
	import { useSurfaceColor } from '@/use/surfaceColor';
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
			defaultOpen: false,
			readonly: false,
			hideActions: false,
			openedIcon: 'chevron-down',
			closedIcon: 'chevron-down',
			eager: false,
			borderWidth: 0,
			glow: false,
			animateGlow: false,
			shadow: false,
			placement: 'center',
			variant: 'text',
			color: undefined,
			activeBorderWidth: undefined,
			activeGlow: undefined,
			activeAnimateGlow: undefined,
			activeShadow: undefined,
			activeState: undefined,
			activePlacement: undefined,
			transition: 'expand'
		})
	);

	const slots = defineSlots<GExpansionSlots<T>>();
	const emit = defineEmits<GExpansionEmits>();

	const group = useExpansionGroupInject<T>();
	const isInGroup = computed(
		() => group !== null && props.value !== undefined
	);
	const standaloneExpanded = ref(props.defaultOpen);
	const isControlled = computed(
		() => !isInGroup.value && props.modelValue !== undefined
	);
	const expanded = computed(() =>
		isInGroup.value
			? group!.isSelected(props.value as T)
			: isControlled.value
				? props.modelValue === true
				: standaloneExpanded.value
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
	const contentMounted = ref(props.eager || expanded.value);
	const shouldRenderContent = computed(
		() => props.eager || contentMounted.value
	);
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
	const {
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceContentClasses
	} = useSurfaceLayers('g-expansion');
	const expansionColor = computed(() => {
		if (props.color !== undefined) {
			return props.color;
		}

		return props.variant === 'text' ? 'on-surface' : undefined;
	});
	const { resolvedColor, resolvedState, colorStyles } = useSurfaceColor({
		color: () => expansionColor.value,
		state: () => props.state,
		active: () => expanded.value,
		activeState: () => props.activeState
	});
	const stateClass = computed(() =>
		resolvedState.value ? `g-expansion_state-${resolvedState.value}` : ''
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
	const resolvedGradientPlacement = computed(() =>
		expanded.value && props.activePlacement !== undefined
			? props.activePlacement
			: props.placement
	);
	const actionIcon = computed(() =>
		expanded.value ? props.openedIcon : props.closedIcon
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
			resolvedState.value ||
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
					color: resolvedColor.value,
					state: resolvedState.value,
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

		const nextValue = !expanded.value;

		if (!isControlled.value) {
			standaloneExpanded.value = nextValue;
		}

		emit('update:modelValue', nextValue);
	}

	function onHeaderClick(event: MouseEvent) {
		toggle();
		emit('click', event);
	}

	function onContentAfterLeave() {
		if (props.eager) return;
		contentMounted.value = false;
	}

	watch(
		expanded,
		(value) => {
			if (value) {
				contentMounted.value = true;
			}
		},
		{ immediate: true }
	);
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
			]"
			:style="colorStyles">
			<div :class="surfaceUnderlayClasses"></div>
			<div :class="surfaceOverlayClasses"></div>
			<div
				class="g-expansion__surface-content"
				:class="surfaceContentClasses">
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
							<g-icon :icon="actionIcon" />
						</slot>
					</span>
				</button>

				<g-expand-transition
					:transition="props.transition"
					:duration="240"
					@after-leave="onContentAfterLeave">
					<div
						v-if="shouldRenderContent"
						v-show="expanded"
						:id="contentId"
						:aria-labelledby="headerId"
						class="g-expansion__body"
						role="region">
						<div class="g-expansion__content">
							<slot v-bind="slotProps" />
						</div>
					</div>
				</g-expand-transition>
			</div>
		</article>
	</component>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/action-surface' as actionSurface;
	@use '@/styles/mixins/focus-ring' as focusRing;
	@use '@/styles/mixins/variants' as variants;

	.g-expansion {
		display: flex;
		flex-direction: column;

		width: 100%;
		border-radius: var(--g-token-expansion-radius);

		color: var(--g-surface-content-color, var(--g-token-expansion-color));

		background: transparent;
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

			transition:
				color var(--g-token-duration-base)
					var(--g-token-easing-standard),
				transform var(--g-token-duration-base)
					var(--g-token-easing-standard);

			&_expanded {
				transform: rotate(180deg);
			}
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

		&_filled .g-expansion__text,
		&_filled .g-expansion__content,
		&_default .g-expansion__text,
		&_default .g-expansion__content {
			color: color-mix(in srgb, currentcolor 82%, transparent);
		}

		&_filled .g-expansion__actions,
		&_default .g-expansion__actions {
			color: currentcolor;
		}

		&_tonal .g-expansion__text,
		&_tonal .g-expansion__content,
		&_outlined .g-expansion__text,
		&_outlined .g-expansion__content,
		&_text .g-expansion__text,
		&_text .g-expansion__content {
			color: color-mix(in srgb, currentcolor 72%, transparent);
		}

		&_tonal .g-expansion__actions,
		&_outlined .g-expansion__actions,
		&_text .g-expansion__actions {
			color: currentcolor;
		}

		&_tonal#{&}_selected {
			--g-surface-overlay-opacity: var(
				--g-token-state-tonal-hover-opacity
			);

			box-shadow: none;
		}

		&_outlined#{&}_selected {
			--g-surface-overlay-opacity: var(--g-token-state-hover-opacity);

			box-shadow: none;
		}

		&_text .g-expansion__content {
			padding-top: var(--g-token-space-1);
		}

		&_text#{&}_selected {
			--g-surface-overlay-opacity: var(--g-token-state-hover-opacity);

			box-shadow: none;
		}

		&_selected {
			color: var(
				--g-surface-content-color,
				var(--g-token-expansion-color-active)
			);
		}

		&_selected &__header {
			color: inherit;
		}

		&_selected &__actions {
			color: inherit;
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
			background: transparent;
		}
	}

	.g-expansion__surface {
		width: 100%;
	}

	@include actionSurface.action-surface-layers('g-expansion', true);
	@include actionSurface.action-state-overrides('g-expansion');
	@include variants.variant-filled('g-expansion');
	@include variants.variant-tonal('g-expansion', none);
	@include variants.variant-outlined('g-expansion', outline, none);
	@include variants.variant-text('g-expansion', none);
</style>
