<script
	setup
	lang="ts"
	generic="T = unknown, V extends GStepValue = GStepValue">
	import { computed, useAttrs } from 'vue';
	import GGradient from '@/components/ui/GGradient/GGradient.vue';
	import { useDensity } from '@/use/density';
	import { useMaterialSurface } from '@/use/materialSurface';
	import usePx from '@/use/px';
	import { useStepperInject } from './context';
	import {
		makeStepPanelProps,
		type GStepPanelSlotProps,
		type GStepPanelSlots,
		type GStepValue
	} from './types';

	defineOptions({ inheritAttrs: false });

	const attrs = useAttrs();
	const props = defineProps(makeStepPanelProps());
	defineSlots<GStepPanelSlots<T, V>>();
	const stepper = useStepperInject<T, V>();
	const selected = computed(() =>
		stepper ? stepper.isSelected(props.value as V | undefined) : false
	);
	const item = computed(() =>
		stepper?.items.value.find((step) =>
			Object.is(step.value, props.value as V | undefined)
		)
	);
	const shouldRender = computed(() => props.eager || selected.value);
	const slotProps = computed<GStepPanelSlotProps<T, V>>(() => ({
		selected: selected.value,
		value: props.value as V | undefined,
		modelValue: stepper?.modelValue.value,
		item: item.value,
		index: item.value?.index ?? -1
	}));
	const densityClass = useDensity(props, 'g-step-panel');
	const resolvedColor = computed(() => props.color ?? stepper?.color.value);
	const panelRadius = usePx(computed(() => props.borderRadius ?? 12));
	const frameStyles = computed(() => ({
		'--g-step-panel-radius': panelRadius.value
	}));
	const {
		getMorphBlobStyle,
		morphBlobs,
		morphEnabled,
		materialFrameProps,
		surfaceStyles,
		surfaceMaterialMorphBlobClasses,
		surfaceMaterialMorphClasses,
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceTextureClasses,
		surfaceContentClasses
	} = useMaterialSurface(
		{
			get animateGlow() {
				return props.animateGlow;
			},
			get animationOptions() {
				return props.animationOptions;
			},
			get backdropBlur() {
				return props.backdropBlur;
			},
			get borderRadius() {
				return props.borderRadius;
			},
			get borderWidth() {
				return props.borderWidth;
			},
			get color() {
				return resolvedColor.value;
			},
			get dropShadow() {
				return props.dropShadow;
			},
			get dropShadowOptions() {
				return props.dropShadowOptions;
			},
			get glow() {
				return props.glow;
			},
			get gradientRecipe() {
				return props.gradientRecipe;
			},
			get morph() {
				return props.morph;
			},
			get morphOptions() {
				return props.morphOptions;
			},
			get placement() {
				return props.placement;
			},
			get shadow() {
				return props.shadow;
			},
			get shadowOptions() {
				return props.shadowOptions;
			},
			get state() {
				return props.state;
			},
			get variant() {
				return props.variant;
			}
		},
		'g-step-panel'
	);
</script>

<template>
	<g-gradient
		v-if="shouldRender"
		v-show="selected"
		class="g-step-panel__frame"
		:style="frameStyles"
		v-bind="materialFrameProps">
		<section
			:id="stepper?.getPanelId(props.value as V | undefined)"
			class="g-step-panel"
			:class="[
				densityClass,
				`g-step-panel_${props.variant}`,
				{
					[`g-step-panel_texture-${props.texture}`]:
						props.texture !== 'none'
				}
			]"
			:style="surfaceStyles"
			role="tabpanel"
			:tabindex="0"
			:aria-labelledby="stepper?.getStepId(props.value as V | undefined)"
			v-bind="attrs">
			<span :class="surfaceUnderlayClasses"></span>
			<span
				v-if="morphEnabled"
				:class="surfaceMaterialMorphClasses"
				aria-hidden="true">
				<span
					v-for="(blob, index) in morphBlobs"
					:key="index"
					:class="surfaceMaterialMorphBlobClasses"
					:style="getMorphBlobStyle(blob)"></span>
			</span>
			<span :class="surfaceOverlayClasses"></span>
			<span :class="surfaceTextureClasses"></span>
			<div
				class="g-step-panel__content"
				:class="surfaceContentClasses">
				<slot v-bind="slotProps" />
			</div>
		</section>
	</g-gradient>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/action-surface' as actionSurface;

	.g-step-panel__frame {
		width: 100%;
		min-width: 0;
	}

	.g-step-panel {
		--g-step-panel-padding: var(--g-token-space-5);
		--g-step-panel-density-padding-delta: 0px;
		--g-step-panel-resolved-padding: calc(
			var(--g-step-panel-padding) +
				var(--g-step-panel-density-padding-delta)
		);
		--g-surface-underlay-color: var(--g-surface-color);
		--g-surface-underlay-opacity: 1;
		--g-surface-overlay-color: var(--g-color);
		--g-surface-overlay-opacity: var(--g-token-state-tonal-opacity);
		--g-surface-content-color: var(--g-token-color-on-surface);

		position: relative;

		overflow: hidden;

		box-sizing: border-box;
		width: 100%;
		min-width: 0;
		border-radius: var(--g-step-panel-radius);

		color: var(--g-surface-content-color);

		background: transparent;

		&_density-compact {
			--g-step-panel-density-padding-delta: calc(
				var(--g-token-space-2) * -1
			);
		}

		&_density-spacious {
			--g-step-panel-density-padding-delta: var(--g-token-space-2);
		}

		&__content {
			position: relative;
			z-index: 4;
			min-width: 0;
			padding: var(--g-step-panel-resolved-padding);
		}

		&_default {
			--g-surface-underlay-opacity: 0;
			--g-surface-overlay-opacity: 0;

			box-shadow: inset 0 0 0 1px rgba(var(--g-theme-on-surface), 0.1);
		}

		&_tonal {
			--g-surface-underlay-opacity: 1;
			--g-surface-overlay-opacity: var(--g-token-state-tonal-opacity);
		}

		&_gradient {
			--g-surface-underlay-color: var(--g-gradient-current);
			--g-surface-overlay-color: rgb(255 255 255 / 16%);
			--g-surface-overlay-opacity: 1;
			--g-surface-content-color: var(--g-on-color);
		}

		&_outlined {
			--g-surface-underlay-opacity: 0;
			--g-surface-overlay-opacity: 0;
		}

		&_glass {
			--g-surface-underlay-color: rgba(var(--g-theme-surface), 0.54);
			--g-surface-underlay-opacity: 1;
			--g-surface-overlay-opacity: 0.08;

			backdrop-filter: blur(var(--g-glass-backdrop-blur)) saturate(140%);
		}

		&:focus-visible {
			outline: var(--g-token-state-focus-ring-width) solid
				var(--g-token-focus-ring);
			outline-offset: 2px;
		}
	}

	@include actionSurface.action-surface-layers('g-step-panel', true);
</style>
