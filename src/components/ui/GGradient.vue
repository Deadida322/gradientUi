<script setup>
	import { toRefs } from 'vue';
	import usePx from '@/use/px.ts';
	const props = defineProps({
		borderRadius: {
			type: [String, Number],
			default: 4
		},
		borderWidth: {
			type: [Number, String],
			default: 2,
			required: false
		},
		glow: {
			type: Number,
			default: null,
			required: false
		},
		animateGlow: {
			type: Boolean,
			default: false
		},
		shadow: {
			type: Boolean,
			default: false
		},
		position: {
			type: String,
			default: ''
		},
		state: {
			type: String,
			default: ''
		}
	});

	const { borderWidth, borderRadius } = toRefs(props);

	const padding = usePx(borderWidth);
	const computedBR = usePx(borderRadius);
</script>

<template>
	<div
		class="g-gradient"
		:class="{
			'g-gradient_shadow': shadow,
			'g-gradient_glow': glow,
			[`g-gradient_${position}`]: position,
			'g-gradient_transparent': !borderWidth,
			[`g-gradient_${state}`]: state
		}">
		<div class="g-gradient__slot">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.g-gradient {
		position: relative;

		overflow: visible !important;

		width: fit-content;
		height: fit-content;
		padding: v-bind('padding');
		border-radius: v-bind('computedBR');

		background: var(--g-gradient-main);
		box-shadow: none !important;

		transition: all 0.2s ease-in-out;

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

			transition: all 0.2s ease-in-out;
		}

		&__slot {
			overflow: hidden;
			border-radius: v-bind('computedBR');
			background-color: white;
		}

		&_shadow {
			box-shadow: 2px 5px 4px -2px rgb(0 0 0 / 20%);

			&:hover {
				transform: translateY(-2px);
				box-shadow: 2px 5px 4px 0 rgb(0 0 0 / 20%);
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

				transition: all 0.2s ease-in-out;
			}
		}

		&:hover {
			transform: translateY(-2px);
			transition: all 0.2s ease-in-out;

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
	}
</style>
