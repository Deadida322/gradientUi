<script setup lang="ts">
	import type { GSquircleProps } from './types';
	import { computed } from 'vue';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { createId } from '@/utils/createId';
	import { useMaterial } from '@/use/material';

	const props = withDefaults(defineProps<GSquircleProps>(), {
		size: 40,
		variant: 'tonal',
		shadow: true,
		border: undefined,
		borderColor: undefined,
		color: 'primary'
	});
	const radius = 0.1;
	const numericSize = computed(() => Number.parseFloat(String(props.size)));
	const createSquirclePath = (size: number, inset = 0) => {
		const innerSize = Math.max(0, size - inset * 2);
		const start = inset + innerSize * 0.5;
		const end = inset + innerSize;
		const near = inset + innerSize * radius;
		const far = inset + innerSize * (1 - radius);

		return `M ${start},${inset} C ${far},${inset} ${end},${near} ${end},${start} C ${end},${far} ${far},${end} ${start},${end} C ${near},${end} ${inset},${far} ${inset},${start} C ${inset},${near} ${near},${inset} ${start},${inset} Z`;
	};
	const d = computed(() => createSquirclePath(numericSize.value));
	const id = createId('g-squircle');
	const borderMaskId = `squircle-border-${id}`;
	const glowFilterId = `squircle-glow-${id}`;
	const height = computed(() => `${props.size}px`);
	const { colorStyles } = useSurfaceColor(props);
	const { materialStyles } = useMaterial({
		color: () => props.color ?? props.state,
		kind: 'action',
		recipe: () => props.gradientRecipe,
		effects: () => props.variant === 'gradient',
		animations: () => Boolean(props.animationOptions),
		animation: () => props.animationOptions
	});
	const squircleStyles = computed(() => ({
		...colorStyles.value,
		...materialStyles.value
	}));
	const fillSurface = computed(() =>
		props.variant === 'tonal'
			? 'var(--g-surface-color)'
			: props.variant === 'gradient'
				? 'transparent'
				: 'var(--g-color)'
	);
	const fillColor = computed(() => 'var(--g-color)');
	const fillOpacity = computed(() =>
		props.variant === 'tonal' ? 'var(--g-token-state-tonal-opacity)' : 0
	);
	const strokeColor = computed(() => props.borderColor ?? 'transparent');
	const strokeWidth = computed(() => props.border ?? 0);
	const borderD = computed(() =>
		createSquirclePath(numericSize.value, strokeWidth.value / 2)
	);
	const hasGradientBorder = computed(() =>
		Boolean(props.gradientBorder && strokeWidth.value > 0)
	);
	const showGlow = computed(() => Boolean(props.glow || props.animateGlow));
	const glowBlur = computed(() => {
		if (props.glow === true || props.glow === undefined) return 7;

		const value = Number.parseFloat(String(props.glow));

		return Number.isFinite(value) ? Math.max(0, value) : 7;
	});
	const glowBleed = computed(() => glowBlur.value * 4);
	const borderMaskReference = computed(() => `url(#${borderMaskId})`);
	const glowFilterReference = computed(() => `url(#${glowFilterId})`);
</script>

<template>
	<div
		class="squircle"
		:class="{
			squircle_shadow: props.shadow,
			squircle_glow: showGlow,
			squircle_animateGlow: props.animateGlow,
			[`squircle_${props.variant}`]: true
		}"
		:style="squircleStyles">
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
				<mask
					:id="borderMaskId"
					mask-type="luminance"
					maskUnits="userSpaceOnUse"
					x="0"
					y="0"
					:width="props.size"
					:height="props.size">
					<rect
						x="0"
						y="0"
						:width="props.size"
						:height="props.size"
						fill="black" />
					<path
						:d="borderD"
						fill="none"
						stroke="white"
						:stroke-width="strokeWidth" />
				</mask>
				<filter
					v-if="showGlow"
					:id="glowFilterId"
					color-interpolation-filters="sRGB"
					filterUnits="userSpaceOnUse"
					:x="-glowBleed"
					:y="-glowBleed"
					:width="Number(props.size) + glowBleed * 2"
					:height="Number(props.size) + glowBleed * 2">
					<feGaussianBlur
						in="SourceGraphic"
						:stdDeviation="glowBlur" />
				</filter>
			</defs>
			<g
				v-if="showGlow"
				class="squircle__glow"
				:filter="glowFilterReference">
				<foreignObject
					x="0"
					y="0"
					width="100%"
					height="100%"
					:mask="hasGradientBorder ? borderMaskReference : undefined"
					:clip-path="
						hasGradientBorder
							? undefined
							: `url(#squircle-clip-${id})`
					">
					<div class="squircle__gradient-paint"></div>
				</foreignObject>
			</g>
			<path
				class="squircle__surface"
				:d="d"
				:fill="fillSurface" />
			<path
				class="squircle__fill"
				:d="d"
				:fill="fillColor"
				:fill-opacity="fillOpacity" />
			<foreignObject
				v-if="hasGradientBorder"
				x="0"
				y="0"
				width="100%"
				height="100%"
				:mask="borderMaskReference">
				<div class="squircle__gradient-paint"></div>
			</foreignObject>
			<path
				class="squircle__border"
				:d="borderD"
				fill="transparent"
				:stroke="hasGradientBorder ? 'transparent' : strokeColor"
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
		width: v-bind('height');
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

		&__glow {
			pointer-events: none;
			opacity: 0.78;
			transition:
				transform var(--g-token-duration-base)
					var(--g-token-easing-emphasized),
				opacity var(--g-token-duration-base)
					var(--g-token-easing-emphasized);
		}

		&__gradient-paint {
			width: 100%;
			height: 100%;

			background: var(--g-gradient-material-background, var(--g-color));
			background-repeat: no-repeat;
			background-position: center;
			background-size: 110% 110%;

			animation: var(--g-gradient-material-animation, none);
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

	.squircle_gradient .squircle__inner {
		color: var(--g-gradient-material-foreground, var(--g-on-color));
		background: var(--g-gradient-material-background, var(--g-color));
		animation: var(--g-gradient-material-animation, none);
	}

	@media (prefers-reduced-motion: no-preference) {
		.squircle_animateGlow .squircle__glow {
			animation: g-squircle-glow-pulse 1.8s ease-in-out infinite;
		}
	}

	@keyframes g-squircle-glow-pulse {
		0%,
		100% {
			opacity: 0.58;
		}

		50% {
			opacity: 0.92;
		}
	}
</style>
