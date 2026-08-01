<script setup lang="ts">
	import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
	import { makeProgressProps } from './types';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { useSurfaceLayers } from '@/use/surface';
	import usePx from '@/use/px';

	const props = defineProps(makeProgressProps({ color: 'primary' }));
	const { gradientStyles } = useSurfaceColor(props);
	const width = ref(0);
	const parentRef = ref<Element | null>(null);
	let observer: ResizeObserver | undefined;

	const normalizedValue = computed(() =>
		Math.min(100, Math.max(0, props.modelValue))
	);
	const computedWidth = usePx(width);
	const segmentCount = computed(() =>
		Math.max(2, Math.round(props.segments))
	);
	const segmentDividers = computed(() =>
		Array.from({ length: segmentCount.value - 1 }, (_, index) => index)
	);
	const percentage = computed(() => `${normalizedValue.value}%`);
	const displayLabel = computed(
		() => props.label ?? `${Math.round(normalizedValue.value)}%`
	);
	const getSegmentDividerStyles = (index: number) => ({
		'--g-progress-segment-position': `${
			((index + 1) / segmentCount.value) * 100
		}%`
	});
	const progressStyles = computed(() => ({
		...gradientStyles.value,
		'--g-progress-value': percentage.value,
		'--g-progress-track-width': computedWidth.value
	}));
	const observeParentWidth = () => {
		observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				width.value = entry.contentRect.width;
			}
		});

		if (parentRef.value) observer.observe(parentRef.value);
	};

	onMounted(() => {
		observeParentWidth();
	});

	onBeforeUnmount(() => {
		observer?.disconnect();
	});

	const {
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceTextureClasses,
		surfaceContentClasses
	} = useSurfaceLayers('g-progress');
</script>

<template>
	<div
		class="g-progress"
		:class="{
			'g-progress_rounded': props.rounded,
			'g-progress_indeterminate': props.indeterminate,
			'g-progress_no-label': props.noLabel,
			[`g-progress_${props.size}`]: true,
			[`g-progress_label-${props.labelAlign}`]: true,
			[`g-progress_view-${props.view}`]: true,
			[`g-progress_texture-${props.texture}`]: props.texture !== 'none'
		}"
		:style="progressStyles">
		<div
			v-if="!props.noLabel"
			class="g-progress__label">
			<slot>{{ displayLabel }}</slot>
		</div>

		<div
			ref="parentRef"
			class="g-progress__track"
			role="progressbar"
			:aria-valuemin="0"
			:aria-valuemax="100"
			:aria-valuenow="props.indeterminate ? undefined : normalizedValue"
			:aria-valuetext="props.indeterminate ? undefined : displayLabel">
			<span :class="surfaceUnderlayClasses"></span>
			<span :class="surfaceOverlayClasses"></span>
			<span :class="surfaceTextureClasses"></span>
			<div
				class="g-progress__surface-content"
				:class="surfaceContentClasses">
				<div class="g-progress__bar">
					<div class="g-progress__active">
						<div class="g-progress__overlay"></div>
					</div>
				</div>
			</div>
			<template v-if="props.view === 'segmented'">
				<span
					v-for="index in segmentDividers"
					:key="index"
					class="g-progress__segment-divider"
					:style="getSegmentDividerStyles(index)"></span>
			</template>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@use '@/styles/mixins/action-surface' as actionSurface;

	.g-progress {
		--g-progress-height: var(--g-token-space-5);
		--g-progress-radius: var(--g-token-radius-sm);
		--g-surface-underlay-color: var(--g-surface-color);
		--g-surface-underlay-opacity: 1;
		--g-surface-overlay-color: var(--g-color);
		--g-surface-overlay-opacity: var(--g-token-state-tonal-opacity);
		--g-progress-label-align: center;
		--g-progress-segment-gap: 3px;
		--g-progress-segment-position: 0%;
		--g-progress-label-color: color-mix(
			in srgb,
			var(--g-color) 72%,
			var(--g-on-surface-color)
		);

		position: relative;

		display: flex;
		flex-direction: column;
		gap: var(--g-token-space-1);

		width: 100%;

		color: var(--g-color);

		&_s {
			--g-progress-height: var(--g-token-space-2);
			--g-progress-radius: var(--g-token-radius-xs);
			--g-progress-segment-gap: 2px;
		}

		&_l {
			--g-progress-height: var(--g-token-space-6);
			--g-progress-radius: var(--g-token-radius-md);
		}

		&_xl {
			--g-progress-height: var(--g-token-space-6);
			--g-progress-radius: var(--g-token-radius-md);
		}

		&__track {
			position: relative;

			overflow: hidden;

			width: 100%;
			height: var(--g-progress-height);
			border-radius: var(--g-progress-radius);
		}

		&__segment-divider {
			pointer-events: none;

			position: absolute;
			z-index: 3;
			top: 0;
			bottom: 0;
			left: var(--g-progress-segment-position);
			transform: translateX(-50%);

			width: var(--g-progress-segment-gap);

			background: var(--g-surface-color);
		}

		&__surface-content {
			width: 100%;
			height: 100%;
		}

		&__label {
			overflow: hidden;

			font-size: var(--g-token-font-size-xs);
			font-weight: 650;
			line-height: 1.25;
			color: var(--g-progress-label-color);
			text-align: var(--g-progress-label-align);
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&__bar {
			position: relative;
			z-index: 1;
			width: 100%;
			height: 100%;
		}

		&__active {
			position: relative;

			overflow: hidden;

			width: var(--g-progress-value);
			height: 100%;
			border-radius: var(--g-progress-radius);

			transition: width var(--g-token-duration-base)
				var(--g-token-easing-standard);
		}

		&__overlay {
			position: absolute;
			top: 0;
			left: 0;

			width: var(--g-progress-track-width);
			height: 100%;
			border-radius: var(--g-progress-radius);

			background: var(--g-gradient-current, var(--g-gradient-main));
		}

		&_indeterminate {
			.g-progress__active {
				width: 100%;
			}

			.g-progress__overlay {
				animation-name: loading-animation;
				animation-duration: 2s;
				animation-timing-function: ease-in-out;
				animation-iteration-count: infinite;
			}
		}

		&_rounded {
			--g-progress-radius: 999px;

			.g-progress__active,
			.g-progress__overlay {
				border-radius: var(--g-progress-radius);
			}
		}

		&_label-start {
			--g-progress-label-align: left;
		}

		&_label-end {
			--g-progress-label-align: right;
		}

		&_view-striped {
			.g-progress__overlay::after {
				content: '';

				position: absolute;
				inset: 0;

				opacity: 0.72;
				background-image: repeating-linear-gradient(
					-45deg,
					rgb(255 255 255 / 16%) 0,
					rgb(255 255 255 / 16%) 4px,
					transparent 4px,
					transparent 10px
				);
				background-size: 14px 14px;

				animation: progress-stripes 1.1s linear infinite;
			}
		}

		&_view-segmented {
			--g-surface-overlay-opacity: calc(
				var(--g-token-state-tonal-opacity) * 0.72
			);

			.g-progress__active,
			.g-progress__overlay {
				border-radius: 0;
			}
		}

		&_view-glow {
			--g-surface-overlay-opacity: calc(
				var(--g-token-state-tonal-opacity) * 0.72
			);

			.g-progress__track {
				box-shadow:
					inset 0 0 0 1px
						color-mix(in srgb, var(--g-color) 16%, transparent),
					0 0 18px color-mix(in srgb, var(--g-color) 18%, transparent);
			}

			.g-progress__active {
				box-shadow:
					0 0 12px color-mix(in srgb, var(--g-color) 34%, transparent),
					0 0 28px color-mix(in srgb, var(--g-color) 18%, transparent);
			}
		}
	}

	@include actionSurface.action-surface-layers('g-progress');

	@keyframes loading-animation {
		0% {
			transform: translateX(-100%);
			width: 50%;
		}

		50% {
			width: 70%;
		}

		99.999% {
			transform: translateX(100%);
			width: 100%;
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes progress-stripes {
		to {
			background-position: 14px 0;
		}
	}
</style>
