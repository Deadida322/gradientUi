<script setup lang="ts">
	import { useAttrs } from 'vue';

	defineOptions({ inheritAttrs: false });

	const attrs = useAttrs();
</script>

<template>
	<Transition
		name="g-rotate-transition"
		mode="out-in"
		v-bind="attrs">
		<slot></slot>
	</Transition>
</template>

<style scoped lang="scss">
	.g-rotate-transition-enter-active,
	.g-rotate-transition-leave-active {
		transition:
			opacity var(--g-token-duration-fast) var(--g-token-easing-standard),
			transform var(--g-token-duration-fast)
				var(--g-token-easing-emphasized);
	}

	.g-rotate-transition-enter-from {
		transform: rotate(-45deg) scale(0.5);
		opacity: 0;
	}

	.g-rotate-transition-leave-to {
		transform: rotate(45deg) scale(0.5);
		opacity: 0;
	}
</style>
