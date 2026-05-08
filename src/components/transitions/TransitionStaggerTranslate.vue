<script setup lang="ts">
	import { useAttrs } from 'vue';

	defineOptions({ inheritAttrs: false });

	const attrs = useAttrs();

	const getIndex = (el: Element) =>
		Number((el as HTMLElement).dataset.index ?? 0);

	const onBeforeEnter = (el: Element) => {
		if (!(el instanceof HTMLElement)) return;

		el.style.setProperty(
			'--g-stagger-transition-delay',
			`${getIndex(el) * 55}ms`
		);
	};

	const onAfterEnter = (el: Element) => {
		if (!(el instanceof HTMLElement)) return;

		el.style.removeProperty('--g-stagger-transition-delay');
	};
</script>

<template>
	<TransitionGroup
		name="g-stagger-translate-transition"
		v-bind="attrs"
		@before-enter="onBeforeEnter"
		@after-enter="onAfterEnter">
		<slot></slot>
	</TransitionGroup>
</template>

<style scoped lang="scss">
	.g-stagger-translate-transition-enter-active,
	.g-stagger-translate-transition-leave-active {
		transition:
			opacity 240ms var(--g-token-easing-standard),
			transform 240ms var(--g-token-easing-emphasized);
		transition-delay: var(--g-stagger-transition-delay, 0ms);
	}

	.g-stagger-translate-transition-move {
		transition: transform 240ms var(--g-token-easing-emphasized);
	}

	.g-stagger-translate-transition-leave-active {
		position: absolute;
	}

	.g-stagger-translate-transition-enter-from,
	.g-stagger-translate-transition-leave-to {
		transform: translateY(10px) scale(0.96);
		opacity: 0;
	}
</style>
