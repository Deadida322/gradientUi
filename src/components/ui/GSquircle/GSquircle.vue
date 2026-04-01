<script setup lang="ts">
	import type { GSquircleProps } from './types';
	import { v4 } from 'uuid';
	import { computed } from 'vue';
	const {
		size = 40,
		shadow = true,
		borderColor,
		border,
		color = `var(--g-tonal)`
	} = defineProps<GSquircleProps>();
	const radius = 0.1;
	const d = computed(
		() =>
			`M ${+size * 0.5},0 C ${+size * (1 - radius)},0 ${+size},${+size * radius} ${+size},
            ${+size * 0.5} C ${+size},${+size * (1 - radius)} ${+size * (1 - radius)},${+size} 
            ${+size * 0.5},${+size} C ${+size * radius},${+size} 0,${+size * (1 - radius)} 0,${+size * 0.5} C 
            0,${+size * radius} ${+size * radius},0 ${+size * 0.5},0 Z`
	);
	const uuid = v4();
	const height = computed(() => `${size}px`);
</script>

<template>
	<div
		class="squircle"
		:class="{
			squircle_shadow: shadow
		}">
		<svg
			id="squircle"
			class="squircle__svg"
			:width="size"
			:height="size"
			:viewBox="`0 0 ${size} ${size}`">
			<defs>
				<clipPath
					:id="`squircle-clip-${uuid}`"
					fill="red">
					<path :d="d" />
				</clipPath>
			</defs>
			<path
				:d="d"
				fill="white" />
			<path
				class="squircle__fill"
				:d="d"
				:fill="color"
				:stroke="borderColor"
				:stroke-width="border" />

			<foreignObject
				x="0"
				y="0"
				:clip-path="`url(#squircle-clip-${uuid})`"
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
			filter 0.2s ease-in,
			transform 0.2s ease-in;

		&__fill {
			transition: fill 0.2s ease-in;
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
	}
</style>
