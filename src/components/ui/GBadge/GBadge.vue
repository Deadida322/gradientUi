<script setup lang="ts">
	import { computed } from 'vue';
	import { makeBadgeProps } from './types';
	import { useSurfaceLayers } from '@/use/surface';
	import { useSurfaceColor } from '@/use/surfaceColor';

	const props = defineProps(makeBadgeProps());
	defineSlots<{
		default?: () => unknown;
		content?: () => unknown;
	}>();
	const { colorStyles } = useSurfaceColor(props);
	const {
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceContentClasses
	} = useSurfaceLayers('g-badge__surface');
	const normalizedVariant = computed(() =>
		props.variant === 'primary' ? 'filled' : props.variant
	);
</script>

<template>
	<div
		class="g-badge"
		:class="{
			[`g-badge_${props.position}`]: true,
			[`g-badge_${props.location}`]: props.position === 'floating'
		}">
		<div class="g-badge__wrapper">
			<slot></slot>
		</div>
		<div
			class="g-badge__content"
			:class="{
				[`g-badge__content_${props.size}`]: true
			}">
			<div
				class="g-badge__surface"
				:class="{
					[`g-badge__surface_${normalizedVariant}`]: true,
					'g-badge__surface_dot': props.dot
				}"
				:style="colorStyles">
				<span :class="surfaceUnderlayClasses"></span>
				<span :class="surfaceOverlayClasses"></span>
				<span :class="surfaceContentClasses">
					<slot
						v-if="!props.dot"
						name="content">
						{{ props.content }}
					</slot>
				</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@use '@/styles/mixins/action-surface' as actionSurface;

	.g-badge {
		position: relative;

		display: inline-flex;

		width: fit-content;
		max-width: 100%;

		vertical-align: middle;

		&__wrapper {
			display: inline-flex;
			min-width: 0;
		}

		&__content {
			z-index: 1;

			display: inline-flex;
			flex: 0 0 auto;

			font-size: var(--g-token-font-size-xs);
			font-weight: var(--g-token-font-weight-bold);
			line-height: 1;

			&_s {
				font-size: 0.625rem;
			}

			&_l {
				font-size: var(--g-token-font-size-sm);
			}

			&_xl {
				font-size: var(--g-token-font-size-md);
			}
		}

		&__surface {
			--g-surface-underlay-color: var(--g-surface-color);
			--g-surface-underlay-opacity: 1;
			--g-surface-overlay-color: var(--g-color);
			--g-surface-overlay-opacity: var(--g-token-state-tonal-opacity);
			--g-surface-content-color: var(--g-color);

			position: relative;

			overflow: hidden;
			display: inline-flex;
			align-items: center;
			justify-content: center;

			min-width: 18px;
			height: 18px;
			padding: 0 var(--g-token-space-1);
			border: 0.5px solid var(--g-token-color-surface);
			border-radius: 999px;

			color: var(--g-surface-content-color);

			background: transparent;

			&_filled {
				--g-surface-underlay-color: var(--g-color);
				--g-surface-underlay-opacity: 1;
				--g-surface-overlay-color: var(--g-on-color);
				--g-surface-overlay-opacity: 0;
				--g-surface-content-color: var(--g-on-color);

				background: transparent;
			}

			&_dot {
				width: 10px;
				min-width: 10px;
				height: 10px;
				padding: 0;
			}
		}

		&_inline {
			gap: var(--g-token-space-1);
			align-items: center;

			.g-badge__content {
				transform: none;
			}

			.g-badge__surface {
				border-color: transparent;
			}
		}

		&_floating {
			.g-badge__content {
				position: absolute;
			}
		}

		&_top-right .g-badge__content {
			top: 0;
			right: 0;
			transform: translate(50%, -50%);
		}

		&_top-left .g-badge__content {
			top: 0;
			left: 0;
			transform: translate(-50%, -50%);
		}

		&_bottom-right .g-badge__content {
			right: 0;
			bottom: 0;
			transform: translate(50%, 50%);
		}

		&_bottom-left .g-badge__content {
			bottom: 0;
			left: 0;
			transform: translate(-50%, 50%);
		}

		&_floating.g-badge_top-right,
		&_floating.g-badge_bottom-right {
			margin-right: 9px;
		}

		&_floating.g-badge_top-left,
		&_floating.g-badge_bottom-left {
			margin-left: 9px;
		}
	}

	.g-badge__content_s .g-badge__surface {
		min-width: 14px;
		height: 14px;
		border-width: 1px;
	}

	.g-badge__content_l .g-badge__surface {
		min-width: 22px;
		height: 22px;
	}

	.g-badge__content_xl .g-badge__surface {
		min-width: 26px;
		height: 26px;
	}

	@include actionSurface.action-surface-layers('g-badge__surface', true);
</style>
