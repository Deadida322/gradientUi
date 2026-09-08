<script setup lang="ts">
	import { computed, useAttrs } from 'vue';
	import GGradient from '../GGradient/GGradient.vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import type { Sizes } from '@/types/CommonTypes';
	import { useMaterialSurface } from '@/use/materialSurface';
	import { useSize } from '@/use/size';
	import { useTagName } from '@/use/tagName';
	import { makeAvatarProps, type GAvatarEmits } from './types';

	defineOptions({ inheritAttrs: false });

	defineSlots<{
		default?: () => unknown;
	}>();

	const attrs = useAttrs();
	const emit = defineEmits<GAvatarEmits>();
	const props = defineProps(makeAvatarProps());
	const sizeClass = useSize(props, 'g-avatar');
	const { tagName, tagAttrs } = useTagName(props, 'span');
	const isActionable = computed(
		() =>
			!props.disabled &&
			(props.href !== undefined || tagName.value === 'button')
	);
	const hasHoverLift = computed(
		() =>
			!props.disabled &&
			(isActionable.value ||
				props.hover ||
				props.shadow ||
				props.dropShadow)
	);
	const resolvedImage = computed(() => props.src ?? props.image);
	const resolvedText = computed(() => {
		if (props.text) return props.text;
		if (!props.name) return '';

		return props.name
			.trim()
			.split(/\s+/)
			.slice(0, 2)
			.map((part) => part[0])
			.join('')
			.toUpperCase();
	});
	const accessibleLabel = computed(
		() => props.alt ?? props.name ?? props.text ?? undefined
	);
	const computedRole = computed(() =>
		!resolvedImage.value && accessibleLabel.value ? 'img' : undefined
	);
	const squircleRadiusBySize: Record<Sizes, number> = {
		s: 10,
		m: 12,
		l: 16,
		xl: 20
	};
	const toCssRadius = (value: number | string) =>
		typeof value === 'number' || /^\d+(\.\d+)?$/.test(value)
			? `${value}px`
			: value;
	const squircleRadius = computed(() => squircleRadiusBySize[props.size]);
	const frameRadius = computed(() => {
		if (props.borderRadius !== undefined) return props.borderRadius;
		if (props.shape === 'square') return 0;
		if (props.shape === 'rounded') return 12;
		if (props.shape === 'squircle') return squircleRadius.value;

		return 999;
	});
	const cssRadius = computed(() => {
		if (props.borderRadius !== undefined)
			return toCssRadius(props.borderRadius);
		if (props.shape === 'square') return '0';
		if (props.shape === 'rounded') return '12px';
		if (props.shape === 'squircle') return `${squircleRadius.value}px`;

		return '999px';
	});
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
	} = useMaterialSurface(props, 'g-avatar', { kind: 'action' });
	const resolvedBorderWidth = computed(
		() =>
			props.borderWidth ??
			(props.glow ||
			props.animateGlow ||
			props.variant === 'outlined' ||
			props.variant === 'glass'
				? 1
				: 0)
	);
	const avatarFrameProps = computed(() => ({
		...materialFrameProps.value,
		borderRadius: frameRadius.value,
		borderWidth:
			props.shape === 'squircle'
				? 0
				: materialFrameProps.value.borderWidth,
		interactive: hasHoverLift.value,
		rounded: false
	}));
	const avatarStyles = computed(() => ({
		'--g-avatar-radius': cssRadius.value,
		'--g-avatar-squircle-radius': `${squircleRadius.value}px`,
		'--g-avatar-border-width': toCssRadius(resolvedBorderWidth.value)
	}));

	const onClick = (event: MouseEvent) => {
		if (props.disabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		emit('click', event);
	};
</script>

<template>
	<g-gradient
		class="g-avatar__frame"
		:style="avatarStyles"
		v-bind="avatarFrameProps">
		<component
			:is="tagName"
			class="g-avatar"
			:class="[
				sizeClass,
				`g-avatar_${props.variant}`,
				`g-avatar_shape-${props.shape}`,
				{
					'g-avatar_disabled': props.disabled,
					'g-avatar_actionable': isActionable,
					'g-avatar_hoverable': hasHoverLift,
					[`g-avatar_texture-${props.texture}`]:
						props.texture !== 'none'
				}
			]"
			:style="[surfaceStyles, avatarStyles]"
			:role="computedRole"
			:aria-label="computedRole ? accessibleLabel : undefined"
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

			<span
				class="g-avatar__content"
				:class="surfaceContentClasses">
				<slot>
					<img
						v-if="resolvedImage"
						class="g-avatar__image"
						:src="resolvedImage"
						:alt="props.alt ?? props.name ?? ''" />
					<g-icon
						v-else-if="props.icon"
						class="g-avatar__icon"
						:icon="props.icon" />
					<span
						v-else-if="resolvedText"
						class="g-avatar__text">
						{{ resolvedText }}
					</span>
				</slot>
			</span>
		</component>
	</g-gradient>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/action-surface' as actionSurface;
	@use '@/styles/mixins/focus-ring' as focusRing;
	@use '@/styles/mixins/variants' as variants;

	.g-avatar__frame {
		display: inline-flex;
		flex: 0 0 auto;
		vertical-align: middle;
	}

	.g-avatar {
		--g-avatar-size: 40px;
		--g-avatar-radius: 999px;
		--g-avatar-squircle-radius: 16px;
		--g-avatar-font-size: var(--g-token-font-size-md);
		--g-avatar-icon-size: var(--g-token-icon-size-m);
		--g-surface-underlay-color: var(--g-surface-color);
		--g-surface-underlay-opacity: 1;
		--g-surface-overlay-color: var(--g-color);
		--g-surface-overlay-opacity: var(--g-token-state-tonal-opacity);
		--g-surface-content-color: var(--g-color);

		position: relative;

		overflow: hidden;
		display: inline-flex;
		flex: 0 0 auto;
		align-items: center;
		justify-content: center;

		box-sizing: border-box;
		width: var(--g-avatar-size);
		height: var(--g-avatar-size);
		border: 0;
		border-radius: var(--g-avatar-radius);

		font: inherit;
		font-size: var(--g-avatar-font-size);
		font-weight: var(--g-token-font-weight-bold);
		line-height: 1;
		color: var(--g-surface-content-color);
		text-decoration: none;
		text-transform: uppercase;

		background: transparent;

		transition:
			color var(--g-token-duration-base) var(--g-token-easing-standard),
			box-shadow var(--g-token-duration-base)
				var(--g-token-easing-standard);

		&__content {
			position: relative;
			z-index: 4;

			display: inline-flex;
			align-items: center;
			justify-content: center;

			width: 100%;
			min-width: 0;
			height: 100%;
		}

		&__image {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		&__icon {
			font-size: var(--g-avatar-icon-size);
		}

		&__text {
			overflow: hidden;
			max-width: calc(var(--g-avatar-size) - var(--g-token-space-2));
			text-overflow: ellipsis;
			white-space: nowrap;
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

		&_shape-squircle {
			border-radius: var(--g-avatar-squircle-radius);

			&::before {
				pointer-events: none;
				content: '';

				position: absolute;
				z-index: 6;
				inset: 0;

				border: var(--g-avatar-border-width) solid
					color-mix(in srgb, var(--g-color) 70%, white);
				border-radius: inherit;
			}
		}

		&_s {
			--g-avatar-size: 32px;
			--g-avatar-font-size: var(--g-token-font-size-sm);
			--g-avatar-icon-size: var(--g-token-icon-size-s);
		}

		&_l {
			--g-avatar-size: 56px;
			--g-avatar-font-size: var(--g-token-font-size-lg);
			--g-avatar-icon-size: var(--g-token-icon-size-l);
		}

		&_xl {
			--g-avatar-size: 72px;
			--g-avatar-font-size: var(--g-token-font-size-xl);
			--g-avatar-icon-size: var(--g-token-icon-size-xl);
		}
	}

	@include actionSurface.action-surface-layers('g-avatar', true);
	@include actionSurface.action-state-overrides('g-avatar');
	@include variants.variant-gradient('g-avatar');
	@include variants.variant-tonal('g-avatar');
	@include variants.variant-outlined('g-avatar', null);
	@include variants.variant-glass('g-avatar');

	.g-avatar:not(.g-avatar_hoverable):hover {
		&.g-avatar_default,
		&.g-avatar_gradient,
		&.g-avatar_outlined,
		&.g-avatar_glass {
			--g-surface-overlay-opacity: 0;
		}

		&.g-avatar_tonal {
			--g-surface-overlay-opacity: var(--g-token-state-tonal-opacity);
		}
	}
</style>
