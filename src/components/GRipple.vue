<template>
	<div
		class="ripple-effect"
		:style="{
			left: `${x}px`,
			top: `${y}px`,
			width: `${size}px`,
			height: `${size}px`,
			backgroundColor: color
		}"></div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'RippleEffect',
		props: {
			x: {
				type: Number,
				required: true
			},
			y: {
				type: Number,
				required: true
			},
			size: {
				type: Number,
				required: true
			},
			color: {
				type: String,
				default: 'currentColor'
			}
		}
	});
</script>

<style scoped>
	.ripple-effect {
		position: absolute;
		top: 0;
		left: 0;
		transform: scale(0);

		border-radius: 50%;

		opacity: 0.1;

		animation: ripple-animation 0.4s linear;
	}

	@keyframes ripple-animation {
		50% {
			opacity: 0.1;
		}

		100% {
			transform: scale(3);
			opacity: 0;
		}
	}
</style>
