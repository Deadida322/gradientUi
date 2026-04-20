<script lang="ts" setup>
	import usePx from '@/use/px';
	import { toRefs } from 'vue';
	import { makeGradientProps, useGradient } from '@/use/gradient';
	const props = defineProps(makeGradientProps());

	const { borderWidth, borderRadius } = toRefs(props);
	const padding = usePx(borderWidth);
	const computedBR = usePx(borderRadius);

	const { gradientClasses } = useGradient(props);
</script>

<template>
	<div
		class="g-gradient"
		:class="{
			...gradientClasses
		}">
		<div class="g-gradient__slot">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@use '@/styles/mixins/rounded' as rounded;
	@use '@/styles/mixins/disabled' as disabled;

	.g-gradient {
		position: relative;

		overflow: visible;

		width: fit-content;
		height: fit-content;
		padding: 1px;
		border-radius: v-bind('computedBR');

		background: var(--g-gradient-main);
		box-shadow: none;

		transition:
			padding var(--g-token-duration-slow) var(--g-token-easing-standard),
			transform var(--g-token-duration-slow)
				var(--g-token-easing-standard),
			box-shadow var(--g-token-duration-slow)
				var(--g-token-easing-standard);

		@for $i from 0 through 10 {
			&_border_#{$i} {
				padding: #{$i}px;
			}
		}

		&::before {
			content: '';

			position: absolute;
			z-index: -1;
			left: 0;

			width: 100%;
			height: 100%;
			border-radius: v-bind('computedBR');

			opacity: 0;
			background: var(--g-gradient-main);
			filter: blur(5px);

			transition: all var(--g-token-duration-base)
				var(--g-token-easing-emphasized);
		}

		&__slot {
			overflow: hidden;
			border-radius: v-bind('computedBR');
			background-color: white;
			transition: transform var(--g-token-duration-slow)
				var(--g-token-easing-emphasized);
		}

		&_shadow {
			box-shadow: var(--g-token-elevation-2);

			&:hover {
				transform: translateY(-2px);
				box-shadow: var(--g-token-elevation-2);
			}
		}

		&_glow {
			position: relative;

			&::before {
				content: '';

				position: absolute;
				z-index: -1;
				top: 0;
				left: 0;
				transform: translateY(0);

				opacity: 0.6;
				filter: blur(2px);

				transition: transform var(--g-token-duration-base)
					var(--g-token-easing-emphasized);
			}
		}

		&_animate-glow::before {
			animation: g-gradient-glow-pulse 1.8s ease-in-out infinite;
		}

		&:not(.g-gradient_disabled):hover,
		&:not(.g-gradient_disabled).g-gradient_active {
			transform: translateY(-2px);
			transition: transform var(--g-token-duration-base)
				var(--g-token-easing-emphasized);

			&::before {
				transform: translateY(2px);
			}
		}

		&_top {
			padding: 0;
			padding-top: v-bind('padding');
		}

		&_bottom {
			padding: 0;
			padding-bottom: v-bind('padding');
		}

		&_left {
			padding: 0;
			padding-left: v-bind('padding');
		}

		&_right {
			padding: 0;
			padding-right: v-bind('padding');
		}

		&_transparent {
			background: transparent;
		}

		&_error {
			background: var(--g-gradient-error);

			&::before {
				background: var(--g-gradient-error);
			}
		}

		&_warning {
			background: var(--g-gradient-warning);

			&::before {
				background: var(--g-gradient-warning);
			}
		}

		&_success {
			background: var(--g-gradient-success);

			&::before {
				background: var(--g-gradient-success);
			}
		}

		&_inherit-width {
			width: inherit;
		}

		&_rounded {
			@include rounded.rounded();

			.g-gradient__slot {
				@include rounded.rounded();
			}

			&.g-gradient_glow::before {
				@include rounded.rounded();
			}
		}

		&_disabled {
			@include disabled.disabled();

			filter: saturate(0.8);

			&::before {
				@include disabled.disabled();

				filter: saturate(0.8);
			}
		}
	}

	@keyframes g-gradient-glow-pulse {
		0%,
		100% {
			opacity: 0.45;
			filter: blur(2px);
		}

		50% {
			opacity: 0.85;
			filter: blur(7px);
		}
	}

	.g-gradient_border_0 {
		padding: 0;
		background: transparent;
	}

	@include rounded.rounded('g-gradient');
</style>
