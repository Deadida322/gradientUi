<script setup lang="ts">
	import type { GSquircleProps } from './types';
	import { computed } from 'vue';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { createId } from '@/utils/createId';

	const props = withDefaults(defineProps<GSquircleProps>(), {
		size: 40,
		variant: 'tonal',
		shadow: true,
		border: undefined,
		borderColor: undefined,
		color: 'primary'
	});
	const radius = 0.1;
	const d = computed(
		() =>
			`M ${+props.size * 0.5},0 C ${+props.size * (1 - radius)},0 ${+props.size},${+props.size * radius} ${+props.size},
            ${+props.size * 0.5} C ${+props.size},${+props.size * (1 - radius)} ${+props.size * (1 - radius)},${+props.size} 
            ${+props.size * 0.5},${+props.size} C ${+props.size * radius},${+props.size} 0,${+props.size * (1 - radius)} 0,${+props.size * 0.5} C 
            0,${+props.size * radius} ${+props.size * radius},0 ${+props.size * 0.5},0 Z`
	);
	const id = createId('g-squircle');
	const height = computed(() => `${props.size}px`);
	const { colorStyles } = useSurfaceColor(props);
	const fillSurface = computed(() =>
		props.variant === 'tonal' ? 'var(--g-surface-color)' : 'var(--g-color)'
	);
	const fillColor = computed(() => 'var(--g-color)');
	const fillOpacity = computed(() =>
		props.variant === 'tonal' ? 'var(--g-token-state-tonal-opacity)' : 0
	);
	const strokeColor = computed(() => props.borderColor ?? 'transparent');
	const strokeWidth = computed(() => props.border ?? 0);
</script>

<template>
	<div
		class="squircle"
		:class="{
			squircle_shadow: props.shadow,
			[`squircle_${props.variant}`]: true
		}"
		:style="colorStyles">
		<svg
			id="squircle"
			class="squircle__svg"
			:width="props.size"
			:height="props.size"
			:viewBox="`0 0 ${props.size} ${props.size}`">
			<defs>
				<clipPath
					:id="`squircle-clip-${id}`"
					fill="red">
					<path :d="d" />
				</clipPath>
			</defs>
			<path
				class="squircle__surface"
				:d="d"
				:fill="fillSurface" />
			<path
				class="squircle__fill"
				:d="d"
				:fill="fillColor"
				:fill-opacity="fillOpacity" />
			<path
				class="squircle__border"
				:d="d"
				fill="transparent"
				:stroke="strokeColor"
				:stroke-width="strokeWidth" />

			<foreignObject
				x="0"
				y="0"
				:clip-path="`url(#squircle-clip-${id})`"
				width="100%"
				height="100%">
				<div
					v-ripple
					class="squircle__inner">
					<slot></slot>
				</div>
			</foreignObject>
		</svg>
	</div>
</template>

<style scoped lang="scss">
	.squircle__svg {
		overflow: visible;
	}

	.squircle {
		will-change: filter;
		height: v-bind('height');
		transition:
			opacity 0.2s ease-in,
			filter var(--g-token-duration-base) var(--g-token-easing-standard),
			transform var(--g-token-duration-base)
				var(--g-token-easing-standard);

		&__surface,
		&__border,
		&__fill {
			transition:
				fill var(--g-token-duration-base) var(--g-token-easing-standard),
				fill-opacity var(--g-token-duration-base)
					var(--g-token-easing-standard),
				stroke var(--g-token-duration-base)
					var(--g-token-easing-standard),
				stroke-width var(--g-token-duration-base)
					var(--g-token-easing-standard);
		}
	}

	.squircle_shadow {
		will-change: filter, transform;
		filter: drop-shadow(0 1px 20px rgb(0 0 0 / 5%))
			drop-shadow(0 2px 3px rgb(0 0 0 / 34%));
	}

	.squircle__inner {
		cursor: pointer;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 100%;
		height: 100%;

		font-size: calc(v-bind('height') - 20px);
		color: var(--g-on-color);

		transition: color var(--g-token-duration-base)
			var(--g-token-easing-standard);
	}

	.squircle_tonal .squircle__inner {
		color: var(--g-color);
	}
</style>
