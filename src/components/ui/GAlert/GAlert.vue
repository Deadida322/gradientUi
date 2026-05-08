<script setup lang="ts">
	import GIcon from '../GIcon/GIcon.vue';
	import { makeAlertProps } from './types';
	import { useSurfaceLayers } from '@/use/surface';
	import { useSurfaceColor } from '@/use/surfaceColor';

	const slots = defineSlots<{
		default?: () => unknown;
		prepend?: () => unknown;
		append?: () => unknown;
		title?: () => unknown;
		footer?: () => unknown;
	}>();
	const props = defineProps(makeAlertProps());
	const { colorStyles } = useSurfaceColor(props);
	const {
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceContentClasses
	} = useSurfaceLayers('g-alert');
</script>

<template>
	<section
		class="g-alert"
		:class="`g-alert_${props.variant}`"
		:style="colorStyles"
		role="status">
		<span :class="surfaceUnderlayClasses"></span>
		<span :class="surfaceOverlayClasses"></span>

		<div
			class="g-alert__content"
			:class="surfaceContentClasses">
			<div
				v-if="slots.prepend || props.icon"
				class="g-alert__prepend">
				<slot name="prepend">
					<g-icon
						v-if="props.icon"
						:icon="props.icon"
						size="22" />
				</slot>
			</div>

			<div class="g-alert__main">
				<div
					v-if="slots.title || props.title"
					class="g-alert__title">
					<slot name="title">{{ props.title }}</slot>
				</div>
				<div
					v-if="slots.default || props.text"
					class="g-alert__body">
					<slot>{{ props.text }}</slot>
				</div>
				<div
					v-if="slots.footer"
					class="g-alert__footer">
					<slot name="footer"></slot>
				</div>
			</div>

			<div
				v-if="slots.append"
				class="g-alert__append">
				<slot name="append"></slot>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/action-surface' as actionSurface;

	.g-alert {
		--g-surface-underlay-color: var(--g-surface-color);
		--g-surface-underlay-opacity: 1;
		--g-surface-overlay-color: var(--g-color);
		--g-surface-overlay-opacity: var(--g-token-state-tonal-opacity);
		--g-surface-content-color: var(--g-color);

		position: relative;

		overflow: hidden;

		box-sizing: border-box;
		width: 100%;
		min-width: 0;
		max-width: 100%;
		padding: var(--g-token-space-4);
		border-radius: var(--g-token-radius-md);

		color: var(--g-surface-content-color);

		&_filled {
			--g-surface-underlay-color: var(--g-color);
			--g-surface-underlay-opacity: 1;
			--g-surface-overlay-color: var(--g-on-color);
			--g-surface-overlay-opacity: 0;
			--g-surface-content-color: var(--g-on-color);
		}

		&_outlined {
			--g-surface-underlay-opacity: 0;
			--g-surface-overlay-opacity: 0;

			border: 1px solid
				color-mix(in srgb, var(--g-color) 38%, transparent);
		}

		&__content {
			position: relative;
			z-index: 2;

			display: flex;
			gap: var(--g-token-space-3);
			align-items: flex-start;

			min-width: 0;
		}

		&__prepend,
		&__append {
			display: inline-flex;
			flex: 0 0 auto;
			color: currentcolor;
		}

		&__main {
			display: grid;
			flex: 1 1 auto;
			gap: var(--g-token-space-1);
			min-width: 0;
		}

		&__title,
		&__body,
		&__footer {
			min-width: 0;
			overflow-wrap: anywhere;
		}

		&__title {
			font-size: var(--g-token-font-size-md);
			font-weight: var(--g-token-font-weight-bold);
			line-height: var(--g-token-line-height-md);
		}

		&__body {
			font-size: var(--g-token-font-size-sm);
			line-height: var(--g-token-line-height-lg);
			color: color-mix(in srgb, currentcolor 78%, transparent);
		}

		&__footer {
			display: flex;
			flex-wrap: wrap;
			gap: var(--g-token-space-2);
			padding-top: var(--g-token-space-2);
		}

		@media (width <= 420px) {
			padding: var(--g-token-space-3);

			&__content {
				gap: var(--g-token-space-2);
			}
		}
	}

	@include actionSurface.action-surface-layers('g-alert', true);
</style>
