<script setup lang="ts">
	import { type GBadgeProps } from './types';
	import { useSurfaceLayers } from '@/use/surface';
	import { useSurfaceColor } from '@/use/surfaceColor';

	const props = withDefaults(defineProps<GBadgeProps>(), {
		color: 'primary',
		state: undefined,
		variant: 'tonal'
	});
	const { colorStyles } = useSurfaceColor(props);
	const {
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceContentClasses
	} = useSurfaceLayers('content__wrapper');
</script>

<template>
	<div
		class="g-badge"
		:class="{
			[`g-badge_${position}`]: position
		}">
		<div class="g-badge__wrapper">
			<slot></slot>
		</div>
		<div
			class="g-badge__content"
			:class="{
				[`g-badge__content_${size}`]: true
			}">
			<div
				class="content__wrapper"
				:class="{
					[`content__wrapper_${variant}`]: true,
					content__wrapper_dot: dot
				}"
				:style="colorStyles">
				<span :class="surfaceUnderlayClasses"></span>
				<span :class="surfaceOverlayClasses"></span>
				<span :class="surfaceContentClasses">
					<slot
						v-if="!dot"
						name="content"
						>{{ content }}</slot
					>
				</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	@use '@/styles/mixins/action-surface' as actionSurface;

	.g-badge {
		position: relative;
		width: fit-content;

		&__content {
			position: absolute;
			top: 0;
			right: 0;
			transform: translate(75%, -25%);

			overflow: hidden;

			border-radius: 20px;

			font-size: 0.75rem;
			line-height: 1rem;

			background: white;

			&_s {
				font-size: 0.5rem;
				line-height: 0.7rem;
			}
		}

		.content__wrapper {
			--g-surface-underlay-color: var(--g-surface-color);
			--g-surface-underlay-opacity: 1;
			--g-surface-overlay-color: var(--g-color);
			--g-surface-overlay-opacity: var(--g-token-state-tonal-opacity);
			--g-surface-content-color: var(--g-color);

			padding: 2px 4px;
			color: var(--g-surface-content-color);
			background: transparent;

			&_primary {
				--g-surface-underlay-color: var(--g-color);
				--g-surface-underlay-opacity: 1;
				--g-surface-overlay-color: var(--g-on-color);
				--g-surface-overlay-opacity: 0;
				--g-surface-content-color: var(--g-on-color);

				background: transparent;
			}

			&_dot {
				width: 4px;
				height: 4px;
				padding: 0;
			}
		}

		&_inline {
			display: flex;
			gap: 4px;
			align-items: center;

			.g-badge__content {
				position: static;
				transform: none;
			}
		}

		&_floating {
			.g-badge__content {
				transform: translate(100%, -100%);
			}
		}
	}

	@include actionSurface.action-surface-layers('content__wrapper', true);
</style>
