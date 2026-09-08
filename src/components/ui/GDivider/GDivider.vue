<script setup lang="ts">
	import { computed, useAttrs } from 'vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import { useDensity } from '@/use/density';
	import { useResolveGradientValue } from '@/use/colorResolver';
	import { useMaterialSurface } from '@/use/materialSurface';
	import { useTagName } from '@/use/tagName';
	import { makeDividerProps } from './types';

	defineOptions({ inheritAttrs: false });

	const slots = defineSlots<{
		default?: () => unknown;
		prepend?: () => unknown;
		append?: () => unknown;
	}>();

	const attrs = useAttrs();
	const props = defineProps(makeDividerProps());
	const densityClass = useDensity(props, 'g-divider');
	const { tagName, tagAttrs } = useTagName(props, 'div');
	const toCssLength = (value: boolean | number | string | undefined) => {
		if (value === true) return 'var(--g-token-space-6)';
		if (value === false || value === undefined || value === '')
			return '0px';
		if (typeof value === 'number') return `${value}px`;

		return /^\d+(\.\d+)?$/.test(value) ? `${value}px` : value;
	};
	const thickness = computed(() => toCssLength(props.thickness));
	const length = computed(() => toCssLength(props.length));
	const hasContent = computed(() =>
		Boolean(
			slots.default ||
			slots.prepend ||
			slots.append ||
			props.label ||
			props.icon
		)
	);
	const insetValue = computed(() => {
		return toCssLength(props.inset);
	});
	const dividerStyles = computed(() => ({
		'--g-divider-thickness': thickness.value,
		'--g-divider-length': length.value,
		'--g-divider-inset': insetValue.value
	}));
	const resolvedGradient = useResolveGradientValue(
		() => props.color ?? props.state
	);
	const dividerGradientStyles = computed(() => ({
		'--g-divider-gradient': resolvedGradient.value
	}));
	const segmentClasses = computed(() => [
		'g-divider__segment',
		`g-divider__segment_${props.variant}`,
		{
			[`g-divider__segment_texture-${props.texture}`]:
				props.texture !== 'none'
		}
	]);
	const semanticAttrs = computed(() => {
		if (props.decorative) {
			return {
				'aria-hidden': 'true'
			};
		}

		return {
			role: 'separator',
			'aria-orientation': props.orientation
		};
	});
	const {
		getMorphBlobStyle,
		morphBlobs,
		morphEnabled,
		surfaceStyles,
		surfaceMaterialMorphBlobClasses,
		surfaceMaterialMorphClasses,
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceTextureClasses
	} = useMaterialSurface(props, 'g-divider__segment', { kind: 'surface' });
</script>

<template>
	<component
		:is="tagName"
		class="g-divider"
		:class="[
			densityClass,
			`g-divider_${props.variant}`,
			`g-divider_orientation-${props.orientation}`,
			`g-divider_effect-${props.effect}`,
			`g-divider_align-${props.align}`,
			{
				'g-divider_with-content': hasContent,
				[`g-divider_texture-${props.texture}`]: props.texture !== 'none'
			}
		]"
		:style="[surfaceStyles, dividerGradientStyles, dividerStyles]"
		v-bind="{ ...tagAttrs, ...semanticAttrs, ...attrs }">
		<span
			:class="[segmentClasses, 'g-divider__segment_start']"
			aria-hidden="true">
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
		</span>

		<span
			v-if="hasContent"
			class="g-divider__content">
			<span
				v-if="slots.prepend || props.icon"
				class="g-divider__icon">
				<slot name="prepend">
					<g-icon
						v-if="props.icon"
						:icon="props.icon" />
				</slot>
			</span>
			<span class="g-divider__label">
				<slot>{{ props.label }}</slot>
			</span>
			<span
				v-if="slots.append"
				class="g-divider__append">
				<slot name="append"></slot>
			</span>
		</span>

		<span
			v-if="hasContent"
			:class="[segmentClasses, 'g-divider__segment_end']"
			aria-hidden="true">
			<span :class="surfaceUnderlayClasses"></span>
			<span
				v-if="morphEnabled"
				:class="surfaceMaterialMorphClasses"
				aria-hidden="true">
				<span
					v-for="(blob, index) in morphBlobs"
					:key="`end-${index}`"
					:class="surfaceMaterialMorphBlobClasses"
					:style="getMorphBlobStyle(blob)"></span>
			</span>
			<span :class="surfaceOverlayClasses"></span>
			<span :class="surfaceTextureClasses"></span>
		</span>
	</component>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/action-surface' as actionSurface;
	@use '@/styles/mixins/variants' as variants;

	.g-divider {
		--g-divider-thickness: 1px;
		--g-divider-length: 100%;
		--g-divider-inset: 0px;
		--g-divider-gap: var(--g-token-space-3);
		--g-divider-content-padding: var(--g-token-space-1)
			var(--g-token-space-2);
		--g-divider-content-radius: var(--g-token-radius-pill);
		--g-divider-segment-opacity: 0.72;
		--g-divider-segment-color: var(--g-color);
		--g-surface-underlay-color: var(--g-color);
		--g-surface-underlay-opacity: 0.42;
		--g-surface-overlay-color: var(--g-on-color);
		--g-surface-overlay-opacity: 0;
		--g-surface-content-color: var(--g-color);

		display: flex;
		flex: 0 0 auto;
		align-items: center;

		box-sizing: border-box;
		max-width: 100%;
		margin: 0;
		border: 0;

		color: var(--g-surface-content-color);

		&_orientation-horizontal {
			width: var(--g-divider-length);
			min-width: 0;
			padding-inline: var(--g-divider-inset);
		}

		&_orientation-vertical {
			flex-direction: column;

			width: max(var(--g-divider-thickness), 1px);
			height: var(--g-divider-length);
			min-height: 0;
			padding-block: var(--g-divider-inset);
		}

		&_density-compact {
			--g-divider-gap: var(--g-token-space-2);
			--g-divider-content-padding: 0 var(--g-token-space-2);
		}

		&_density-spacious {
			--g-divider-gap: var(--g-token-space-4);
			--g-divider-content-padding: var(--g-token-space-2)
				var(--g-token-space-3);
		}

		&_align-start {
			.g-divider__segment_start {
				flex: 0 1 10%;
			}
		}

		&_align-end {
			.g-divider__segment_end {
				flex: 0 1 10%;
			}
		}

		&__segment {
			isolation: isolate;
			position: relative;

			overflow: hidden;
			flex: 1 1 auto;

			min-width: 0;
			border-radius: 999px;

			color: var(--g-divider-segment-color);

			opacity: var(--g-divider-segment-opacity);
		}

		&_orientation-horizontal &__segment {
			height: var(--g-divider-thickness);
		}

		&_orientation-vertical &__segment {
			width: var(--g-divider-thickness);
			min-height: 0;
		}

		&__content {
			position: relative;
			z-index: 2;

			display: inline-flex;
			flex: 0 0 auto;
			gap: var(--g-token-space-1);
			align-items: center;
			justify-content: center;

			max-width: min(70%, 360px);
			padding: var(--g-divider-content-padding);
			border-radius: var(--g-divider-content-radius);

			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-medium);
			line-height: var(--g-token-line-height-sm);
			white-space: nowrap;

			background: rgba(var(--g-theme-surface), 0.78);
		}

		&__label {
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&__icon,
		&__append {
			display: inline-flex;
			flex: 0 0 auto;
			align-items: center;
		}

		&_orientation-horizontal.g-divider_with-content {
			gap: var(--g-divider-gap);
		}

		&_orientation-vertical.g-divider_with-content {
			gap: var(--g-divider-gap);
			width: max-content;

			.g-divider__content {
				writing-mode: sideways-lr;
			}
		}

		&__segment_outlined {
			--g-surface-underlay-opacity: 0;
			--g-divider-segment-opacity: 1;

			outline: var(--g-divider-thickness) solid currentcolor;
			outline-offset: calc(var(--g-divider-thickness) * -1);
		}

		&_effect-dashed &__segment {
			background: repeating-linear-gradient(
				90deg,
				currentcolor 0 12px,
				transparent 12px 20px
			);

			.g-divider__segment__surface-underlay,
			.g-divider__segment__surface-overlay,
			.g-divider__segment__surface-texture,
			.g-divider__segment__surface-material-morph {
				display: none;
			}
		}

		&_effect-dotted &__segment {
			background: radial-gradient(
					circle,
					currentcolor 0 45%,
					transparent 47%
				)
				0 50% / calc(var(--g-divider-thickness) * 4)
				calc(var(--g-divider-thickness) * 4) repeat-x;

			.g-divider__segment__surface-underlay,
			.g-divider__segment__surface-overlay,
			.g-divider__segment__surface-texture,
			.g-divider__segment__surface-material-morph {
				display: none;
			}
		}

		&_effect-fade &__segment {
			mask-image: linear-gradient(
				90deg,
				transparent,
				rgb(0 0 0) 22%,
				rgb(0 0 0) 78%,
				transparent
			);
		}

		&_effect-glow &__segment {
			overflow: visible;
			opacity: 1;
			box-shadow:
				0 0 0 1px color-mix(in srgb, var(--g-color) 16%, transparent),
				0 0 18px color-mix(in srgb, var(--g-color) 44%, transparent);
		}

		&_effect-pulse &__segment {
			opacity: 1;

			&::after {
				content: '';

				position: absolute;
				inset: 0;
				transform: translateX(-100%);

				background: linear-gradient(
					90deg,
					transparent,
					color-mix(in srgb, var(--g-on-color) 72%, white) 50%,
					transparent
				);

				animation: g-divider-pulse 2.4s var(--g-token-easing-standard)
					infinite;
			}
		}

		&_orientation-vertical.g-divider_effect-dashed &__segment {
			background: repeating-linear-gradient(
				180deg,
				currentcolor 0 12px,
				transparent 12px 20px
			);
		}

		&_orientation-vertical.g-divider_effect-dotted &__segment {
			background: radial-gradient(
					circle,
					currentcolor 0 45%,
					transparent 47%
				)
				50% 0 / calc(var(--g-divider-thickness) * 4)
				calc(var(--g-divider-thickness) * 4) repeat-y;
		}

		&_orientation-vertical.g-divider_effect-fade &__segment {
			mask-image: linear-gradient(
				180deg,
				transparent,
				rgb(0 0 0) 22%,
				rgb(0 0 0) 78%,
				transparent
			);
		}

		&_orientation-vertical.g-divider_effect-pulse &__segment::after {
			transform: translateY(-100%);
			background: linear-gradient(
				180deg,
				transparent,
				color-mix(in srgb, var(--g-on-color) 72%, white) 50%,
				transparent
			);
			animation-name: g-divider-pulse-vertical;
		}
	}

	@include actionSurface.action-surface-layers('g-divider__segment', true);
	@include actionSurface.action-state-overrides('g-divider');
	@include variants.variant-gradient('g-divider__segment');
	@include variants.variant-tonal('g-divider__segment');
	@include variants.variant-outlined('g-divider__segment', null);
	@include variants.variant-glass('g-divider__segment');

	.g-divider__segment_default {
		--g-surface-content-color: var(--g-color);
		--g-surface-underlay-color: var(--g-color);
		--g-surface-underlay-opacity: 0.52;
	}

	.g-divider__segment_gradient {
		--g-divider-segment-opacity: 1;
		--g-surface-underlay-color: var(
			--g-divider-gradient,
			var(--g-gradient-main)
		);
	}

	.g-divider__segment_default:hover,
	.g-divider__segment_gradient:hover,
	.g-divider__segment_outlined:hover,
	.g-divider__segment_glass:hover {
		--g-surface-overlay-opacity: 0;
	}

	.g-divider__segment_tonal:hover {
		--g-surface-overlay-opacity: var(--g-token-state-tonal-opacity);
	}

	@media (prefers-reduced-motion: reduce) {
		.g-divider_effect-pulse .g-divider__segment::after {
			transform: none;
			opacity: 0.32;
			animation: none;
		}
	}

	@keyframes g-divider-pulse {
		to {
			transform: translateX(100%);
		}
	}

	@keyframes g-divider-pulse-vertical {
		to {
			transform: translateY(100%);
		}
	}
</style>
