<script setup lang="ts">
	import type { Placement, StringeredNumber } from '@/types/CommonTypes';
	import { computed } from 'vue';

	const props = defineProps<{
		maskId: string;
		borderRadius: StringeredNumber;
		borderWidth: StringeredNumber;
		placement: Placement;
		rounded: boolean;
		glowBlur?: number;
	}>();

	const maskReference = computed(() => `url(#${props.maskId})`);
	const glowFilterId = computed(() => `${props.maskId}-blur`);
	const glowFilterReference = computed(() =>
		props.glowBlur ? `url(#${glowFilterId.value})` : undefined
	);
	const glowFilterBleed = computed(() => (props.glowBlur ?? 0) * 4);
	const toNumber = (value: StringeredNumber) =>
		Number.parseFloat(String(value));
	const geometry = computed(() => {
		const width = '100cqw';
		const height = '100cqh';
		const borderWidth = Math.max(0, toNumber(props.borderWidth));
		const borderRadius = Math.max(0, toNumber(props.borderRadius));
		const seamOverlap = Math.min(borderWidth, 0.5);
		const isCenter = props.placement === 'center';
		const top = isCenter || props.placement === 'top' ? borderWidth : 0;
		const right = isCenter || props.placement === 'right' ? borderWidth : 0;
		const bottom =
			isCenter || props.placement === 'bottom' ? borderWidth : 0;
		const left = isCenter || props.placement === 'left' ? borderWidth : 0;
		// Match the surface inset exactly: overlap remains visible through glass.
		const baseInnerWidth = `max(0px, calc(${width} - ${left + right}px))`;
		const baseInnerHeight = `max(0px, calc(${height} - ${top + bottom}px))`;
		const innerX = left + (left ? seamOverlap : 0);
		const innerY = top + (top ? seamOverlap : 0);
		const innerRight = right + (right ? seamOverlap : 0);
		const innerBottom = bottom + (bottom ? seamOverlap : 0);
		const innerWidth = `max(0px, calc(${width} - ${innerX + innerRight}px))`;
		const innerHeight = `max(0px, calc(${height} - ${innerY + innerBottom}px))`;
		const outerRadius = props.rounded
			? 'min(50cqw, 50cqh)'
			: `${borderRadius + borderWidth}px`;
		const innerRadius = props.rounded
			? `calc(min(${isCenter ? innerWidth : baseInnerWidth}, ${isCenter ? innerHeight : baseInnerHeight}) / 2)`
			: `${Math.max(0, borderRadius - (isCenter ? seamOverlap : 0))}px`;

		return {
			width,
			height,
			outerRadius,
			innerX,
			innerY,
			innerWidth,
			innerHeight,
			innerRadius
		};
	});
</script>

<template>
	<div
		class="g-gradient-border-layer"
		aria-hidden="true">
		<svg
			class="g-gradient-border-layer__svg"
			aria-hidden="true"
			focusable="false"
			preserveAspectRatio="none">
			<defs>
				<mask
					:id="maskId"
					mask-type="luminance"
					maskUnits="userSpaceOnUse"
					maskContentUnits="userSpaceOnUse"
					x="0"
					y="0"
					width="100%"
					height="100%">
					<rect
						class="g-gradient-border-layer__mask-outer"
						x="0"
						y="0"
						width="100%"
						height="100%"
						:style="{
							rx: geometry.outerRadius,
							ry: geometry.outerRadius
						}"></rect>
					<rect
						class="g-gradient-border-layer__mask-inner"
						:x="geometry.innerX"
						:y="geometry.innerY"
						:style="{
							width: geometry.innerWidth,
							height: geometry.innerHeight,
							rx: geometry.innerRadius,
							ry: geometry.innerRadius
						}"></rect>
				</mask>
				<filter
					v-if="glowBlur"
					:id="glowFilterId"
					color-interpolation-filters="sRGB"
					filterUnits="userSpaceOnUse"
					:x="-glowFilterBleed"
					:y="-glowFilterBleed"
					:width="`calc(100% + ${glowFilterBleed * 2}px)`"
					:height="`calc(100% + ${glowFilterBleed * 2}px)`">
					<feGaussianBlur
						in="SourceGraphic"
						:stdDeviation="glowBlur"></feGaussianBlur>
				</filter>
			</defs>
			<g :filter="glowFilterReference">
				<foreignObject
					x="0"
					y="0"
					width="100%"
					height="100%"
					:mask="maskReference">
					<div class="g-gradient-border-layer__paint"></div>
				</foreignObject>
			</g>
		</svg>
	</div>
</template>

<style scoped lang="scss">
	.g-gradient-border-layer {
		pointer-events: none;

		position: absolute;
		inset: 0;

		container-type: size;
		overflow: visible;
		display: block;

		width: 100%;
		height: 100%;

		&__svg {
			overflow: visible;
			display: block;
			width: 100%;
			height: 100%;
		}

		&__mask-outer {
			fill: rgb(255 255 255);
		}

		&__mask-inner {
			fill: rgb(0 0 0);
		}

		&__paint {
			width: 100%;
			height: 100%;

			background: var(--g-gradient-current, var(--g-gradient-main));
			background-repeat: no-repeat;
			background-position: center;
			background-size: 110% 110%;

			animation: var(
				--g-gradient-border-animation,
				var(--g-gradient-current-animation, none)
			);
		}
	}
</style>
