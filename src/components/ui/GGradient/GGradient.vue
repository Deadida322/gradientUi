<script lang="ts" setup>
	import { computed, useId } from 'vue';
	import { makeGradientProps, useGradient } from '@/use/gradient';
	import { useGradientGlow } from '@/use/gradientGlow';
	import { useGradientSurface } from '@/use/gradientSurface';
	import GGradientBorderLayer from './GGradientBorderLayer.vue';
	const props = defineProps(makeGradientProps());
	const instanceId = useId().replaceAll(':', '');
	const borderMaskId = `g-gradient-border-${instanceId}`;
	const glowMaskId = `g-gradient-glow-${instanceId}`;
	const hasBorder = computed(() => Number(props.borderWidth) > 0);
	const showGlow = computed(
		() => hasBorder.value && Boolean(props.glow || props.animateGlow)
	);

	const { containerBorderRadius, gradientClasses, gradientStyles } =
		useGradient(props);
	const { glowClasses } = useGradientGlow(props);
	const { interactionClass, surfaceBorderRadius, surfaceFillClass } =
		useGradientSurface(props);
</script>

<template>
	<component
		:is="rootTag"
		class="g-gradient"
		:class="[
			gradientClasses,
			glowClasses,
			interactionClass,
			surfaceFillClass
		]"
		:style="gradientStyles">
		<g-gradient-border-layer
			v-if="hasBorder"
			class="g-gradient__border"
			:mask-id="borderMaskId"
			:border-radius="borderRadius"
			:border-width="borderWidth"
			:placement="placement"
			:rounded="rounded" />
		<g-gradient-border-layer
			v-if="showGlow"
			class="g-gradient__glow"
			:mask-id="glowMaskId"
			:border-radius="borderRadius"
			:border-width="borderWidth"
			:placement="placement"
			:rounded="rounded"
			:glow-blur="4" />
		<div class="g-gradient__slot">
			<slot></slot>
		</div>
	</component>
</template>

<style lang="scss" scoped>
	@use '@/styles/mixins/rounded' as rounded;
	@use '@/styles/mixins/disabled' as disabled;

	.g-gradient {
		--g-gradient-border-top: var(--g-border-width);
		--g-gradient-border-right: var(--g-border-width);
		--g-gradient-border-bottom: var(--g-border-width);
		--g-gradient-border-left: var(--g-border-width);

		isolation: isolate;
		position: relative;

		overflow: visible;

		box-sizing: border-box;
		width: fit-content;
		height: fit-content;
		padding: var(--g-gradient-border-top) var(--g-gradient-border-right)
			var(--g-gradient-border-bottom) var(--g-gradient-border-left);
		border-radius: v-bind('containerBorderRadius');

		background: transparent;
		box-shadow: none;

		transition:
			padding var(--g-token-duration-slow) var(--g-token-easing-standard),
			transform var(--g-token-duration-slow)
				var(--g-token-easing-standard),
			box-shadow var(--g-token-duration-slow)
				var(--g-token-easing-standard);

		&__border {
			z-index: 1;
		}

		&__glow {
			z-index: 0;
			transform: translateY(0);
			opacity: 0;
			transition:
				transform var(--g-token-duration-base)
					var(--g-token-easing-emphasized),
				opacity var(--g-token-duration-base)
					var(--g-token-easing-emphasized);
		}

		&__slot {
			position: relative;
			z-index: 2;

			overflow: hidden;

			border-radius: v-bind('surfaceBorderRadius');

			transition: transform var(--g-token-duration-slow)
				var(--g-token-easing-emphasized);
		}

		&_surface-theme &__slot {
			background-color: var(--g-token-color-surface);
		}

		&_surface-transparent &__slot {
			background-color: transparent;
		}

		&_shadow {
			box-shadow: var(--g-token-elevation-2);

			&:hover {
				transform: translateY(-2px);
				box-shadow: var(--g-token-elevation-2);
			}
		}

		&_glow &__glow {
			opacity: 1;
		}

		&_interactive:not(.g-gradient_disabled):hover,
		&_interactive:not(.g-gradient_disabled).g-gradient_active {
			transform: translateY(-2px);
			transition: transform var(--g-token-duration-base)
				var(--g-token-easing-emphasized);

			.g-gradient__glow {
				transform: translateY(2px);
			}
		}

		&_top {
			--g-gradient-border-right: 0;
			--g-gradient-border-bottom: 0;
			--g-gradient-border-left: 0;
		}

		&_bottom {
			--g-gradient-border-top: 0;
			--g-gradient-border-right: 0;
			--g-gradient-border-left: 0;
		}

		&_left {
			--g-gradient-border-top: 0;
			--g-gradient-border-right: 0;
			--g-gradient-border-bottom: 0;
		}

		&_right {
			--g-gradient-border-top: 0;
			--g-gradient-border-bottom: 0;
			--g-gradient-border-left: 0;
		}

		&_inherit-width {
			width: inherit;
		}

		&_rounded {
			@include rounded.rounded();

			.g-gradient__slot {
				@include rounded.rounded();
			}
		}

		&_disabled {
			@include disabled.disabled();

			filter: saturate(0.8);
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.g-gradient_animate-glow .g-gradient__glow {
			animation: g-gradient-glow-pulse 1.8s ease-in-out infinite;
		}
	}

	@keyframes g-gradient-glow-pulse {
		0%,
		100% {
			opacity: 0.6;
		}

		50% {
			opacity: 0.95;
		}
	}

	@include rounded.rounded('g-gradient');
</style>
