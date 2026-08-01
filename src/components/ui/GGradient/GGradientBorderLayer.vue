<script setup lang="ts">
	import type { Placement, StringeredNumber } from '@/types/CommonTypes';
	import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

	const props = defineProps<{
		maskId: string;
		borderRadius: StringeredNumber;
		borderWidth: StringeredNumber;
		placement: Placement;
		rounded: boolean;
		glowBlur?: number;
	}>();

	const layerRef = ref<SVGSVGElement>();
	const layerSize = ref({ width: 1, height: 1 });
	let resizeObserver: ResizeObserver | undefined;

	const maskReference = computed(() => `url(#${props.maskId})`);
	const glowFilterId = computed(() => `${props.maskId}-blur`);
	const glowFilterReference = computed(() =>
		props.glowBlur ? `url(#${glowFilterId.value})` : undefined
	);
	const glowFilterBleed = computed(() => (props.glowBlur ?? 0) * 4);
	const viewBox = computed(
		() => `0 0 ${layerSize.value.width} ${layerSize.value.height}`
	);
	const toNumber = (value: StringeredNumber) =>
		Number.parseFloat(String(value));
	const geometry = computed(() => {
		const { width, height } = layerSize.value;
		const borderWidth = Math.max(0, toNumber(props.borderWidth));
		const borderRadius = Math.max(0, toNumber(props.borderRadius));
		const seamOverlap = Math.min(borderWidth, 0.5);
		const isCenter = props.placement === 'center';
		const top = isCenter || props.placement === 'top' ? borderWidth : 0;
		const right = isCenter || props.placement === 'right' ? borderWidth : 0;
		const bottom =
			isCenter || props.placement === 'bottom' ? borderWidth : 0;
		const left = isCenter || props.placement === 'left' ? borderWidth : 0;
		const baseInnerWidth = Math.max(0, width - left - right);
		const baseInnerHeight = Math.max(0, height - top - bottom);
		const innerX = left + (left ? seamOverlap : 0);
		const innerY = top + (top ? seamOverlap : 0);
		const innerRight = right + (right ? seamOverlap : 0);
		const innerBottom = bottom + (bottom ? seamOverlap : 0);
		const innerWidth = Math.max(0, width - innerX - innerRight);
		const innerHeight = Math.max(0, height - innerY - innerBottom);
		const outerRadius = props.rounded
			? Math.min(width, height) / 2
			: borderRadius + borderWidth;
		const innerRadius = props.rounded
			? Math.min(
					isCenter ? innerWidth : baseInnerWidth,
					isCenter ? innerHeight : baseInnerHeight
				) / 2
			: Math.max(0, borderRadius - (isCenter ? seamOverlap : 0));

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

	const updateSize = () => {
		const layer = layerRef.value;

		if (!layer) return;

		const { width, height } = layer.getBoundingClientRect();

		if (width > 0 && height > 0) {
			layerSize.value = { width, height };
		}
	};

	onMounted(() => {
		const layer = layerRef.value;

		if (!layer) return;

		updateSize();
		resizeObserver = new ResizeObserver(updateSize);
		resizeObserver.observe(layer);
	});

	onBeforeUnmount(() => resizeObserver?.disconnect());
</script>

<template>
	<svg
		ref="layerRef"
		class="g-gradient-border-layer"
		aria-hidden="true"
		focusable="false"
		:viewBox="viewBox"
		preserveAspectRatio="none">
		<defs>
			<mask
				:id="maskId"
				mask-type="luminance"
				maskUnits="userSpaceOnUse"
				maskContentUnits="userSpaceOnUse"
				x="0"
				y="0"
				:width="geometry.width"
				:height="geometry.height">
				<rect
					class="g-gradient-border-layer__mask-outer"
					x="0"
					y="0"
					:width="geometry.width"
					:height="geometry.height"
					:rx="geometry.outerRadius"
					:ry="geometry.outerRadius"></rect>
				<rect
					class="g-gradient-border-layer__mask-inner"
					:x="geometry.innerX"
					:y="geometry.innerY"
					:width="geometry.innerWidth"
					:height="geometry.innerHeight"
					:rx="geometry.innerRadius"
					:ry="geometry.innerRadius"></rect>
			</mask>
			<filter
				v-if="glowBlur"
				:id="glowFilterId"
				color-interpolation-filters="sRGB"
				filterUnits="userSpaceOnUse"
				:x="-glowFilterBleed"
				:y="-glowFilterBleed"
				:width="geometry.width + glowFilterBleed * 2"
				:height="geometry.height + glowFilterBleed * 2">
				<feGaussianBlur
					in="SourceGraphic"
					:stdDeviation="glowBlur"></feGaussianBlur>
			</filter>
		</defs>
		<g :filter="glowFilterReference">
			<foreignObject
				x="0"
				y="0"
				:width="geometry.width"
				:height="geometry.height"
				:mask="maskReference">
				<div class="g-gradient-border-layer__paint"></div>
			</foreignObject>
		</g>
	</svg>
</template>

<style scoped lang="scss">
	.g-gradient-border-layer {
		pointer-events: none;

		position: absolute;
		inset: 0;

		overflow: visible;
		display: block;

		width: 100%;
		height: 100%;

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
