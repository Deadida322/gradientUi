<script setup lang="ts">
	import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
	import type { GProgressProps } from './types';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { useSurfaceLayers } from '@/use/surface';

	const props = withDefaults(defineProps<GProgressProps>(), {
		noLabel: false,
		size: 'm',
		color: 'primary',
		modelValue: 0,
		label: undefined,
		state: undefined
	});
	const { gradientStyles } = useSurfaceColor(props);
	const width = ref(0);
	const parentRef = ref<Element | null>(null);
	let observer: ResizeObserver | undefined;

	const normalizedValue = computed(() =>
		Math.min(100, Math.max(0, props.modelValue))
	);
	const computedWidth = computed(() => `${width.value}px`);
	const percentage = computed(() => `${normalizedValue.value}%`);
	const displayLabel = computed(
		() => props.label ?? `${Math.round(normalizedValue.value)}%`
	);
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
		surfaceContentClasses
	} = useSurfaceLayers('g-progress');
</script>

<template>
	<div
		ref="parentRef"
		class="g-progress"
		role="progressbar"
		:aria-valuemin="0"
		:aria-valuemax="100"
		:aria-valuenow="indeterminate ? undefined : normalizedValue"
		:class="{
			'g-progress_rounded': rounded,
			'g-progress_indeterminate': indeterminate,
			'g-progress_no-label': noLabel,
			[`g-progress_${size}`]: true
		}"
		:style="progressStyles">
		<span :class="surfaceUnderlayClasses"></span>
		<span :class="surfaceOverlayClasses"></span>
		<div
			class="g-progress__surface-content"
			:class="surfaceContentClasses">
			<div
				v-if="!noLabel"
				class="g-progress__label">
				<slot>{{ displayLabel }}</slot>
			</div>
			<div class="g-progress__bar">
				<div class="g-progress__active">
					<div class="g-progress__overlay"></div>
				</div>
			</div>
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

		position: relative;

		overflow: hidden;

		width: 100%;
		height: var(--g-progress-height);
		border-radius: var(--g-progress-radius);

		color: var(--g-color);

		&_s {
			--g-progress-height: var(--g-token-space-2);
			--g-progress-radius: var(--g-token-radius-xs);
		}

		&_l {
			--g-progress-height: var(--g-token-space-6);
			--g-progress-radius: var(--g-token-radius-md);
		}

		&_xl {
			--g-progress-height: var(--g-token-space-6);
			--g-progress-radius: var(--g-token-radius-md);
		}

		&__surface-content {
			width: 100%;
			height: 100%;
		}

		&__label {
			position: absolute;
			z-index: 2;
			top: 0;
			left: 0;

			display: block;

			width: 100%;
			height: 100%;

			font-size: 12px;
			line-height: var(--g-progress-height);
			color: color-mix(
				in srgb,
				var(--g-color) 76%,
				var(--g-on-surface-color)
			);
			text-align: center;
			text-shadow: 0 1px 1px var(--g-surface-color);
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

			.g-progress__active {
				border-radius: var(--g-progress-radius);
			}

			.g-progress__overlay {
				border-radius: var(--g-progress-radius);
			}
		}
	}

	@include actionSurface.action-surface-layers('g-progress', true);

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
</style>
