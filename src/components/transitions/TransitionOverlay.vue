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
		name="g-legacy-overlay-transition"
		v-bind="attrs"
		@after-leave="onAfterLeave">
		<slot></slot>
	</Transition>
</template>

<style scoped lang="scss">
	.g-legacy-overlay-transition-enter-active,
	.g-legacy-overlay-transition-leave-active {
		.base-overlay__scrim,
		.base-overlay__content {
			transition:
				opacity var(--g-token-duration-enter)
					var(--g-token-easing-standard),
				transform var(--g-token-duration-enter)
					var(--g-token-easing-emphasized);
		}
	}

	.g-legacy-overlay-transition-leave-active {
		.base-overlay__scrim,
		.base-overlay__content {
			transition-timing-function: var(--g-token-easing-standard);
			transition-duration: var(--g-token-duration-leave);
		}
	}

	.g-legacy-overlay-transition-enter-from,
	.g-legacy-overlay-transition-leave-to {
		.base-overlay__scrim {
			opacity: 0;
		}

		.base-overlay__content {
			transform: translateY(8px) scale(0.996);
			opacity: 0;
		}
	}
</style>
