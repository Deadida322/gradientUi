<script setup lang="ts">
	import { useAttrs } from 'vue';

	defineOptions({ inheritAttrs: false });

	const attrs = useAttrs();
	const emit = defineEmits<{
		leave: [];
	}>();

	const onAfterLeave = () => {
		emit('leave');
	};
</script>

<template>
	<Transition
		name="g-legacy-scale-transition"
		v-bind="attrs"
		@after-leave="onAfterLeave">
		<slot></slot>
	</Transition>
</template>

<style scoped lang="scss">
	.g-legacy-scale-transition-enter-active {
		transition:
			opacity var(--g-token-duration-enter)
				var(--g-token-easing-emphasized),
			transform var(--g-token-duration-enter)
				var(--g-token-easing-emphasized);
	}

	.g-legacy-scale-transition-leave-active {
		transition:
			opacity var(--g-token-duration-leave) var(--g-token-easing-standard),
			transform var(--g-token-duration-leave)
				var(--g-token-easing-standard);
	}

	.g-legacy-scale-transition-enter-from {
		transform: scale(0.94);
		opacity: 0;
	}

	.g-legacy-scale-transition-leave-to {
		transform: scale(0.985);
		opacity: 0;
	}
</style>
