<script setup lang="ts">
	import { computed } from 'vue';
	import GGradient from '@/components/ui/GGradient/GGradient.vue';
	import { useMaterial } from '@/use/material';
	import { useGlass } from '@/use/glass';
	import { makeGradientMaterialProps } from './types';

	defineOptions({ name: 'GGradientMaterial' });

	const props = defineProps(makeGradientMaterialProps());
	const resolvedBorderWidth = computed(
		() =>
			props.borderWidth ??
			(props.variant === 'outlined' ||
			props.variant === 'glass' ||
			props.glow ||
			props.animateGlow
				? 1
				: 0)
	);
	const { glassStyles } = useGlass(props);
	const {
		getMorphBlobStyle,
		materialClasses,
		materialStyles,
		morphBlobs,
		morphEnabled
	} = useMaterial({
		baseClass: 'g-gradient-material',
		color: () => props.color ?? props.state,
		kind: () => props.kind,
		recipe: () => props.gradientRecipe,
		effects: () =>
			Boolean(
				props.shadow ||
				props.dropShadow ||
				props.shadowOptions ||
				props.dropShadowOptions ||
				props.morph ||
				props.morphOptions
			),
		animations: () => Boolean(props.animationOptions),
		shadow: () => props.shadowOptions,
		dropShadow: () => props.dropShadowOptions,
		animation: () => props.animationOptions,
		morph: () => props.morphOptions ?? props.morph,
		borderRadius: () => props.borderRadius,
		padding: () => props.padding
	});
	const materialBorderAnimationStyles = computed(() => ({
		'--g-gradient-border-animation':
			'var(--g-gradient-material-animation, none)'
	}));
	const materialRootStyles = computed(() => [
		materialStyles.value,
		props.variant === 'glass' ? glassStyles.value : undefined,
		materialBorderAnimationStyles.value
	]);
</script>

<template>
	<g-gradient
		:root-tag="tag"
		class="g-gradient-material"
		:class="[materialClasses, `g-gradient-material_${variant}`]"
		:style="materialRootStyles"
		:color="color ?? state"
		:state="state"
		:material-kind="kind"
		:gradient-recipe="gradientRecipe"
		:border-radius="borderRadius"
		:border-width="resolvedBorderWidth"
		:placement="placement"
		:rounded="rounded"
		:glow="glow"
		:animate-glow="animateGlow"
		surface-fill="transparent">
		<span class="g-gradient-material__surface">
			<span
				v-if="morphEnabled && variant === 'gradient'"
				class="g-gradient-material__morph"
				aria-hidden="true">
				<span
					v-for="(blob, index) in morphBlobs"
					:key="index"
					class="g-gradient-material__morph-blob"
					:style="getMorphBlobStyle(blob)"></span>
			</span>
			<span class="g-gradient-material__content">
				<slot></slot>
			</span>
		</span>
	</g-gradient>
</template>

<style lang="scss">
	@use '@/styles/mixins/glass' as glass;

	.g-gradient-material {
		position: relative;
		display: inline-flex;
		filter: var(--g-gradient-material-drop-shadow, none);
		box-shadow: var(--g-gradient-material-shadow, none);
	}

	.g-gradient-material__surface {
		position: relative;

		overflow: hidden;
		display: inline-flex;

		padding: var(--g-gradient-material-padding, 0);
		border-radius: var(
			--g-gradient-material-radius,
			var(--g-token-radius-md)
		);

		color: var(--g-gradient-material-foreground);

		background: var(--g-gradient-material-background);

		animation: var(--g-gradient-material-animation, none);
	}

	.g-gradient-material_outlined .g-gradient-material__surface {
		color: var(--g-gradient-material-color);
		background: transparent;
	}

	.g-gradient-material_glass .g-gradient-material__surface {
		color: var(--g-gradient-material-color);

		@include glass.glass-surface;
	}

	.g-gradient-material__morph {
		--g-gradient-material-morph-bleed: 18%;

		position: absolute;
		z-index: 1;
		inset: calc(-1 * var(--g-gradient-material-morph-bleed));

		width: calc(100% + 2 * var(--g-gradient-material-morph-bleed));
		height: calc(100% + 2 * var(--g-gradient-material-morph-bleed));

		opacity: 0.82;
		filter: var(--g-gradient-material-filter, none);
		mix-blend-mode: var(
			--g-gradient-material-morph-blend-mode,
			hard-light
		);
	}

	.g-gradient-material__morph-blob {
		position: absolute;
		transform-origin: var(--g-gradient-morph-origin-x)
			var(--g-gradient-morph-origin-y);
		transform: translate(-50%, -50%);

		aspect-ratio: 1;
		border-radius: 999px;

		opacity: var(--g-gradient-morph-opacity);
		background: radial-gradient(
			circle,
			var(--g-gradient-morph-blob-color) 0%,
			transparent 72%
		);
		filter: blur(var(--g-gradient-morph-blur));

		animation: var(--g-gradient-morph-animation)
			var(--g-gradient-morph-duration, 9000ms) ease-in-out infinite
			alternate;
	}

	.g-gradient-material__content {
		position: relative;
		z-index: 2;
		display: inherit;
		flex-direction: inherit;
	}

	@keyframes g-gradient-morph-drift {
		0% {
			transform: translate(-50%, -50%) scale(0.92);
		}

		42% {
			transform: translate(
					calc(-50% + var(--g-gradient-morph-x)),
					calc(-50% + var(--g-gradient-morph-y))
				)
				scale(var(--g-gradient-morph-scale));
		}

		100% {
			transform: translate(
					calc(-50% + var(--g-gradient-morph-x2)),
					calc(-50% + var(--g-gradient-morph-y2))
				)
				scale(var(--g-gradient-morph-scale-mid));
		}
	}

	@keyframes g-gradient-morph-float {
		0% {
			transform: translate(-50%, -50%) scale(1);
		}

		50% {
			transform: translate(
					calc(-50% + var(--g-gradient-morph-x)),
					calc(-50% + var(--g-gradient-morph-y))
				)
				scale(var(--g-gradient-morph-scale-mid));
		}

		100% {
			transform: translate(
					calc(-50% + var(--g-gradient-morph-x2)),
					calc(-50% + var(--g-gradient-morph-y2))
				)
				scale(var(--g-gradient-morph-scale));
		}
	}

	@keyframes g-gradient-morph-orbit {
		0% {
			transform: translate(-50%, -50%) rotate(0deg) scale(0.96);
		}

		50% {
			transform: translate(
					calc(-50% + var(--g-gradient-morph-x)),
					calc(-50% + var(--g-gradient-morph-y))
				)
				rotate(var(--g-gradient-morph-rotate-mid))
				scale(var(--g-gradient-morph-scale-mid));
		}

		100% {
			transform: translate(
					calc(-50% + var(--g-gradient-morph-x2)),
					calc(-50% + var(--g-gradient-morph-y2))
				)
				rotate(var(--g-gradient-morph-rotate-to))
				scale(var(--g-gradient-morph-scale));
		}
	}
</style>
