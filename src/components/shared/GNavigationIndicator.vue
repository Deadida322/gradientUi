<script setup lang="ts">
	defineProps<{
		left: number;
		top?: number;
		width: number;
		height?: number;
		visible: boolean;
		gradient?: string;
		vertical?: boolean;
		tag?: 'div' | 'li';
	}>();
</script>
<template>
	<component
		:is="tag ?? 'div'"
		aria-hidden="true"
		class="g-navigation-indicator"
		:class="{
			'g-navigation-indicator_visible': visible,
			'g-navigation-indicator_vertical': vertical
		}"
		:style="{
			transform: vertical
				? `translateY(${top ?? 0}px)`
				: `translateX(${left}px)`,
			width: vertical ? undefined : `${width}px`,
			height: vertical ? `${height ?? 0}px` : undefined,
			background: gradient
		}"></component>
</template>
<style lang="scss">
	.g-navigation-indicator {
		pointer-events: none;

		position: absolute;
		z-index: 2;
		bottom: 0;
		left: 0;

		display: block;

		height: var(--g-navigation-indicator-height, 3px);
		border-radius: var(--g-token-radius-pill);

		opacity: 0;

		transition:
			transform var(--g-token-duration-base)
				var(--g-token-easing-emphasized),
			width var(--g-token-duration-base) var(--g-token-easing-emphasized),
			height var(--g-token-duration-base) var(--g-token-easing-emphasized),
			opacity var(--g-token-duration-fast) var(--g-token-easing-standard);

		&_visible {
			opacity: 1;
		}

		&_vertical {
			inset: 0 0 auto auto;
			width: var(--g-navigation-indicator-height, 3px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.g-navigation-indicator {
			transition: none;
		}
	}
</style>
