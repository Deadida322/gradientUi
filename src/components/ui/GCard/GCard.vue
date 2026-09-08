<script setup lang="ts">
	import { computed, useAttrs } from 'vue';
	import GGradient from '../GGradient/GGradient.vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import GLoading from '@/components/ui/GLoading/GLoading.vue';
	import { useDensity } from '@/use/density';
	import { useMaterialSurface } from '@/use/materialSurface';
	import { useSize } from '@/use/size';
	import { useTagName } from '@/use/tagName';
	import { makeCardProps, type GCardEmits } from './types';

	defineOptions({ inheritAttrs: false });

	const slots = defineSlots<{
		default?: () => unknown;
		prepend?: () => unknown;
		append?: () => unknown;
		title?: () => unknown;
		subtitle?: () => unknown;
		media?: () => unknown;
		actions?: () => unknown;
		footer?: () => unknown;
	}>();
	const attrs = useAttrs();
	const emit = defineEmits<GCardEmits>();
	const props = defineProps(makeCardProps());
	const sizeClass = useSize(props, 'g-card');
	const densityClass = useDensity(props, 'g-card');
	const { tagName, tagAttrs } = useTagName(props, 'article');
	const isActionable = computed(
		() =>
			!props.disabled &&
			!props.loading &&
			(props.href !== undefined || tagName.value === 'button')
	);
	const hasHoverLift = computed(
		() =>
			!props.disabled &&
			!props.loading &&
			(isActionable.value ||
				props.hover ||
				props.shadow ||
				props.dropShadow)
	);
	const hasMedia = computed(() => Boolean(slots.media || props.image));
	const hasHeader = computed(() =>
		Boolean(
			slots.prepend ||
			slots.append ||
			slots.title ||
			slots.subtitle ||
			props.prependIcon ||
			props.appendIcon ||
			props.title ||
			props.subtitle
		)
	);
	const resolvedImageAlt = computed(
		() => props.imageAlt ?? props.title ?? ''
	);
	const loadingText = computed(() => props.loadingText ?? 'Loading...');
	const isDarkLoading = computed(() => props.layout === 'overlay');
	const loadingOpacity = computed(() => (isDarkLoading.value ? 0.96 : 0.64));
	const {
		getMorphBlobStyle,
		morphBlobs,
		morphEnabled,
		materialFrameProps,
		surfaceStyles,
		surfaceMaterialMorphBlobClasses,
		surfaceMaterialMorphClasses,
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceTextureClasses,
		surfaceContentClasses
	} = useMaterialSurface(props, 'g-card');

	const onClick = (event: MouseEvent) => {
		if (props.disabled || props.loading) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		emit('click', event);
	};
</script>

<template>
	<g-gradient
		class="g-card__frame"
		v-bind="materialFrameProps"
		:interactive="hasHoverLift">
		<component
			:is="tagName"
			class="g-card"
			:class="[
				sizeClass,
				densityClass,
				`g-card_${props.variant}`,
				`g-card_layout-${props.layout}`,
				{
					'g-card_disabled': props.disabled,
					'g-card_loading': props.loading,
					'g-card_actionable': isActionable,
					'g-card_hoverable': hasHoverLift,
					'g-card_has-media': hasMedia,
					[`g-card_texture-${props.texture}`]:
						props.texture !== 'none'
				}
			]"
			:style="surfaceStyles"
			:aria-busy="props.loading ? 'true' : undefined"
			v-bind="{ ...tagAttrs, ...attrs }"
			@click="onClick">
			<span :class="surfaceUnderlayClasses"></span>
			<span
				v-if="morphEnabled"
				:class="surfaceMaterialMorphClasses"
				aria-hidden="true">
				<span
					v-for="(blob, index) in morphBlobs"
					:key="index"
					:class="surfaceMaterialMorphBlobClasses"
					:style="getMorphBlobStyle(blob)"></span>
			</span>
			<span :class="surfaceOverlayClasses"></span>
			<span :class="surfaceTextureClasses"></span>

			<div
				class="g-card__content"
				:class="surfaceContentClasses">
				<div
					v-if="hasMedia"
					class="g-card__media">
					<slot name="media">
						<img
							v-if="props.image"
							:src="props.image"
							:alt="resolvedImageAlt" />
					</slot>
				</div>

				<div class="g-card__body">
					<header
						v-if="hasHeader"
						class="g-card__header">
						<div
							v-if="slots.prepend || props.prependIcon"
							class="g-card__prepend">
							<slot name="prepend">
								<g-icon
									v-if="props.prependIcon"
									:icon="props.prependIcon" />
							</slot>
						</div>

						<div class="g-card__heading">
							<h3
								v-if="slots.title || props.title"
								class="g-card__title">
								<slot name="title">{{ props.title }}</slot>
							</h3>
							<p
								v-if="slots.subtitle || props.subtitle"
								class="g-card__subtitle">
								<slot name="subtitle">{{
									props.subtitle
								}}</slot>
							</p>
						</div>

						<div
							v-if="slots.append || props.appendIcon"
							class="g-card__append">
							<slot name="append">
								<g-icon
									v-if="props.appendIcon"
									:icon="props.appendIcon" />
							</slot>
						</div>
					</header>

					<div
						v-if="slots.default || props.text"
						class="g-card__text">
						<slot>{{ props.text }}</slot>
					</div>

					<div
						v-if="slots.actions"
						class="g-card__actions">
						<slot name="actions"></slot>
					</div>
				</div>

				<footer
					v-if="slots.footer"
					class="g-card__footer">
					<slot name="footer"></slot>
				</footer>
			</div>

			<div
				v-if="props.loading"
				class="g-card__loading"
				@click.stop>
				<g-loading
					show
					:text="loadingText"
					:color="props.color"
					:dark="false"
					:opacity="loadingOpacity"
					blur="8px"
					:progress-view="props.loadingProgressView" />
			</div>
		</component>
	</g-gradient>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/action-surface' as actionSurface;
	@use '@/styles/mixins/focus-ring' as focusRing;
	@use '@/styles/mixins/variants' as variants;

	.g-card__frame {
		width: 100%;
		min-width: 0;
	}

	.g-card {
		--g-card-padding: var(--g-token-space-5);
		--g-card-gap: var(--g-token-space-4);
		--g-card-media-size: 168px;
		--g-card-density-padding-delta: 0px;
		--g-card-density-gap-delta: 0px;
		--g-card-density-media-delta: 0px;
		--g-card-resolved-padding: calc(
			var(--g-card-padding) + var(--g-card-density-padding-delta)
		);
		--g-card-resolved-gap: calc(
			var(--g-card-gap) + var(--g-card-density-gap-delta)
		);
		--g-card-resolved-media-size: calc(
			var(--g-card-media-size) + var(--g-card-density-media-delta)
		);
		--g-card-title-size: var(--g-token-font-size-lg);
		--g-card-subtitle-size: var(--g-token-font-size-sm);
		--g-surface-underlay-color: var(--g-surface-color);
		--g-surface-underlay-opacity: 1;
		--g-surface-overlay-color: var(--g-color);
		--g-surface-overlay-opacity: var(--g-token-state-tonal-opacity);
		--g-surface-content-color: var(--g-color);

		position: relative;

		overflow: hidden;
		display: block;

		box-sizing: border-box;
		width: 100%;
		min-width: 0;
		max-width: 100%;
		border: 0;
		border-radius: var(--g-token-radius-lg);

		font: inherit;
		color: var(--g-surface-content-color);
		text-align: left;
		text-decoration: none;

		background: transparent;

		transition:
			transform var(--g-token-duration-hover)
				var(--g-token-easing-standard),
			box-shadow var(--g-token-duration-hover)
				var(--g-token-easing-standard);

		&__content {
			position: relative;
			z-index: 2;
			display: grid;
			min-width: 0;
		}

		&__body {
			display: grid;
			gap: var(--g-card-resolved-gap);
			min-width: 0;
			padding: var(--g-card-resolved-padding);
		}

		&__header {
			display: flex;
			gap: var(--g-token-space-3);
			align-items: flex-start;
			min-width: 0;
		}

		&__prepend,
		&__append {
			display: inline-flex;
			flex: 0 0 auto;
			align-items: center;
			justify-content: center;

			min-width: var(--g-token-icon-size-m);

			color: currentcolor;
		}

		&__heading {
			display: grid;
			flex: 1 1 auto;
			gap: var(--g-token-space-1);
			min-width: 0;
		}

		&__title,
		&__subtitle,
		&__text,
		&__footer {
			min-width: 0;
			margin: 0;
			overflow-wrap: anywhere;
		}

		&__title {
			font-size: var(--g-card-title-size);
			font-weight: var(--g-token-font-weight-bold);
			line-height: var(--g-token-line-height-lg);
			color: currentcolor;
		}

		&__subtitle,
		&__text {
			font-size: var(--g-card-subtitle-size);
			line-height: var(--g-token-line-height-lg);
			color: color-mix(in srgb, currentcolor 72%, transparent);
		}

		&__media {
			position: relative;

			overflow: hidden;

			min-width: 0;
			min-height: var(--g-card-resolved-media-size);

			background: rgba(var(--g-theme-on-surface), 0.06);

			img {
				display: block;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		&__actions,
		&__footer {
			display: flex;
			flex-wrap: wrap;
			gap: var(--g-token-space-2);
			align-items: center;
		}

		&__actions {
			padding-top: var(--g-token-space-1);
		}

		&__loading {
			pointer-events: auto;

			position: absolute;
			z-index: 5;
			inset: 0;

			overflow: hidden;

			border-radius: inherit;
		}

		&__footer {
			justify-content: space-between;

			padding: var(--g-token-space-3) var(--g-card-resolved-padding);
			border-top: 1px solid
				color-mix(in srgb, currentcolor 12%, transparent);

			font-size: var(--g-token-font-size-xs);
			line-height: var(--g-token-line-height-md);
			color: color-mix(in srgb, currentcolor 68%, transparent);
		}

		&_actionable {
			cursor: pointer;
		}

		&_hoverable {
			&:hover {
				--g-surface-overlay-opacity: var(--g-token-state-hover-opacity);
			}

			&:focus-visible {
				@include focusRing.focus-ring;
			}
		}

		&_disabled {
			cursor: not-allowed;
			opacity: var(--g-token-opacity-disabled);
		}

		&_loading {
			cursor: wait;
		}

		&_loading &__content {
			pointer-events: none;
			filter: blur(5px) saturate(0.82);
		}

		&_s {
			--g-card-padding: var(--g-token-space-3);
			--g-card-gap: var(--g-token-space-2);
			--g-card-media-size: 124px;
			--g-card-title-size: var(--g-token-font-size-md);
		}

		&_l {
			--g-card-padding: var(--g-token-space-6);
			--g-card-gap: var(--g-token-space-5);
			--g-card-media-size: 220px;
			--g-card-title-size: var(--g-token-font-size-xl);
		}

		&_xl {
			--g-card-padding: calc(
				var(--g-token-space-6) + var(--g-token-space-2)
			);
			--g-card-gap: var(--g-token-space-5);
			--g-card-media-size: 280px;
			--g-card-title-size: var(--g-token-font-size-xl);
		}

		&_density-compact {
			--g-card-density-padding-delta: calc(var(--g-token-space-1) * -1);
			--g-card-density-gap-delta: calc(var(--g-token-space-0) * -1);
			--g-card-density-media-delta: -28px;
		}

		&_density-spacious {
			--g-card-density-padding-delta: var(--g-token-space-2);
			--g-card-density-gap-delta: var(--g-token-space-1);
			--g-card-density-media-delta: 36px;
		}

		&_layout-media &__media {
			aspect-ratio: 16 / 9;
		}

		&_layout-media &__body {
			align-content: start;
		}

		&_layout-horizontal &__content {
			grid-template-columns: minmax(160px, 0.42fr) minmax(0, 1fr);
			align-items: stretch;
		}

		&_layout-horizontal &__media {
			min-height: 100%;
		}

		&_layout-horizontal &__footer {
			grid-column: 1 / -1;
		}

		&_layout-banner &__content {
			grid-template-columns: minmax(84px, 112px) minmax(0, 1fr);
			align-items: center;
		}

		&_layout-banner &__media {
			aspect-ratio: 1;
			min-height: 0;
			margin: var(--g-token-space-2) 0 var(--g-token-space-2)
				var(--g-token-space-2);
			border-radius: var(--g-token-radius-md);
		}

		&_layout-banner &__body {
			gap: var(--g-token-space-2);
			align-content: center;
			padding: var(--g-token-space-3);
		}

		&_layout-banner &__title {
			font-size: var(--g-token-font-size-md);
			line-height: var(--g-token-line-height-md);
		}

		&_layout-banner &__subtitle,
		&_layout-banner &__text {
			line-height: var(--g-token-line-height-md);
		}

		&_layout-banner &__footer {
			grid-column: 1 / -1;
			padding-top: 0;
		}

		&_layout-inset &__media {
			aspect-ratio: 16 / 9;
			width: calc(100% - (var(--g-card-resolved-padding) * 2));
			margin: var(--g-card-resolved-padding)
				var(--g-card-resolved-padding) 0;
			border-radius: var(--g-token-radius-md);
		}

		&_layout-media-bottom &__media {
			order: 2;
			aspect-ratio: 16 / 9;
		}

		&_layout-media-bottom &__body {
			order: 1;
		}

		&_layout-media-bottom &__footer {
			order: 3;
		}

		&_layout-overlay {
			min-height: max(240px, var(--g-card-resolved-media-size));
		}

		&_layout-overlay &__content {
			min-height: inherit;
		}

		&_layout-overlay &__media {
			position: absolute;
			z-index: 0;
			inset: 0;
		}

		&_layout-overlay &__media::after {
			content: '';
			position: absolute;
			inset: 0;
			background:
				linear-gradient(180deg, transparent 18%, rgb(0 0 0 / 62%) 100%),
				linear-gradient(90deg, rgb(0 0 0 / 38%), transparent 72%);
		}

		&_layout-overlay &__body {
			z-index: 1;
			align-content: end;
			min-height: inherit;
			color: white;
		}

		&_layout-overlay &__subtitle,
		&_layout-overlay &__text {
			color: rgb(255 255 255 / 78%);
		}

		&_layout-profile &__content {
			justify-items: center;
			text-align: center;
		}

		&_layout-profile &__media {
			aspect-ratio: 1;
			width: min(112px, 38vw);
			min-height: 0;
			margin-top: var(--g-card-resolved-padding);
			border-radius: var(--g-token-radius-pill);
		}

		&_layout-profile &__header,
		&_layout-profile &__actions,
		&_layout-metric &__header,
		&_layout-metric &__actions,
		&_layout-compact &__header,
		&_layout-compact &__actions {
			justify-content: center;
		}

		&_layout-metric &__body {
			justify-items: center;
			text-align: center;
		}

		&_layout-metric &__title {
			font-size: var(--g-token-font-size-xl);
		}

		&_layout-compact {
			width: fit-content;
			max-width: 100%;
		}

		&_layout-compact &__body {
			padding: var(--g-token-space-3);
		}

		&_layout-compact &__media {
			aspect-ratio: 4 / 3;
			width: 100%;
		}

		&_gradient &__subtitle,
		&_gradient &__text,
		&_default &__subtitle,
		&_default &__text {
			color: color-mix(in srgb, currentcolor 82%, transparent);
		}
	}

	@media (width <= 640px) {
		.g-card {
			&_layout-horizontal &__content {
				grid-template-columns: minmax(0, 1fr);
			}

			&_layout-horizontal &__media,
			&_layout-banner &__media {
				aspect-ratio: 16 / 9;
			}

			&_layout-banner &__content {
				grid-template-columns: minmax(0, 1fr);
			}
		}
	}

	@include actionSurface.action-surface-layers('g-card', true);
	@include actionSurface.action-state-overrides('g-card');
	@include variants.variant-gradient('g-card');
	@include variants.variant-tonal('g-card');
	@include variants.variant-outlined('g-card', null);
	@include variants.variant-glass('g-card');

	.g-card:not(.g-card_hoverable):hover {
		&.g-card_default,
		&.g-card_gradient,
		&.g-card_outlined,
		&.g-card_glass {
			--g-surface-overlay-opacity: 0;
		}

		&.g-card_tonal {
			--g-surface-overlay-opacity: var(--g-token-state-tonal-opacity);
		}
	}
</style>
