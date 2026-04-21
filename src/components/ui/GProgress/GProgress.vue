<script setup lang="ts">
	import { ref, onMounted, computed } from 'vue';
	import type { GProgressProps } from './types';
	import { useColor } from '@/use/color';
	import { useSurfaceLayers } from '@/use/surface';
	const props = withDefaults(defineProps<GProgressProps>(), {
		noLabel: false,
		sizes: 'm',
		color: 'primary',
		modelValue: 0
	});
	const { colorStyles } = useColor(props);
	const width = ref(0);
	const parentRef = ref<Element | null>(null);
	const observeParentWidth = () => {
		const observer = new ResizeObserver((entries) => {
			for (let entry of entries) {
				width.value = entry.contentRect.width;
			}
		});
		if (parentRef.value) observer.observe(parentRef.value);
	};

	onMounted(() => {
		observeParentWidth();
	});

	const computedWidth = computed(() => `${width.value}px`);
	const percentage = computed(() => `${props.modelValue}%`);
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
		:class="{
			'g-progress_rounded': rounded,
			[`g-progress_${size}`]: true
		}"
		:style="colorStyles">
		<span :class="surfaceUnderlayClasses"></span>
		<span :class="surfaceOverlayClasses"></span>
		<div
			class="g-progress__surface-content"
			:class="surfaceContentClasses">
			<div
				v-if="!noLabel"
				class="g-progress__label">
				{{ percentage }}
			</div>
			<div class="g-progress__bar">
				<div class="g-progress__active">
					<div
						class="g-progress__overlay"
						:class="{
							'g-progress_indeterminate': indeterminate
						}"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@use '@/styles/mixins/action-surface' as actionSurface;

	.g-progress {
		--g-surface-underlay-color: var(--g-surface-color);
		--g-surface-underlay-opacity: 1;
		--g-surface-overlay-color: var(--g-color);
		--g-surface-overlay-opacity: var(--g-token-state-tonal-opacity);

		position: relative;

		overflow: hidden;

		width: 100%;
		height: 20px;
		border-radius: 5px;

		color: var(--g-color);

		&_s {
			height: 6px;
		}

		&__surface-content {
			width: 100%;
			height: 100%;
		}

		&__label {
			position: absolute;
			top: 0;
			left: 0;

			width: 100%;
			height: 100%;

			font-size: 12px;
			line-height: 20px;
			color: white;
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

			width: v-bind('percentage');
			height: 100%;
			border-radius: 5px;
		}

		&__overlay {
			position: absolute;
			top: 0;
			left: 0;

			width: v-bind('computedWidth');
			height: 100%;
			border-radius: 5px;

			background: var(--g-gradient-main);

			&.g-progress_indeterminate {
				animation-name: loading-animation;
				animation-duration: 2s;
				animation-timing-function: ease-in-out;
				animation-iteration-count: infinite;
			}
		}

		&_rounded {
			border-radius: 10px;

			.g-progress__active {
				border-radius: 10px;
			}

			.g-progress__overlay {
				border-radius: 10px;
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
