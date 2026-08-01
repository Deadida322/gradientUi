<script setup lang="ts">
	import { computed, useAttrs } from 'vue';
	import GGradient from '../GGradient/GGradient.vue';
	import GIcon from '@/components/ui/GIcon.vue';
	import type { PLASlots } from '@/types/CommonTypes';
	import { makeButtonProps } from './types';
	import { useActionSurface } from '@/use/actionSurface';
	import usePx from '@/use/px';
	import { useTagName } from '@/use/tagName';

	defineOptions({ inheritAttrs: false });

	const slots = defineSlots<PLASlots>();
	const attrs = useAttrs();

	const props = defineProps(
		makeButtonProps({
			borderWidth: undefined,
			borderRadius: 4,
			placement: 'center'
		})
	);

	const computedBorderRadius = usePx(props.borderRadius);
	const resolvedBorderWidth = computed(
		() =>
			props.borderWidth ??
			(props.variant === 'glass' || props.glow || props.animateGlow
				? 1
				: 0)
	);
	const computedRipple = computed(() => {
		if (props.disabled || props.ripple === false) return false;
		if (typeof props.ripple === 'object') {
			return {
				...props.ripple,
				disabled: props.ripple.disabled || props.disabled
			};
		}

		return props.ripple;
	});
	const { tagName, tagAttrs } = useTagName(props, 'button');
	const {
		actionSurfaceClasses,
		resolvedColor,
		resolvedState,
		surfaceStyles,
		surfaceMaterialMorphBlobClasses,
		surfaceMaterialMorphClasses,
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceTextureClasses,
		surfaceContentClasses,
		morphBlobs,
		morphEnabled,
		getMorphBlobStyle
	} = useActionSurface(props, 'g-button');
</script>

<template>
	<g-gradient
		v-gradient-icon
		class="g-gradient"
		v-bind="{
			...props,
			color: resolvedColor,
			state: resolvedState
		}"
		:border-width="resolvedBorderWidth">
		<component
			:is="tagName"
			v-ripple="computedRipple"
			class="g-button"
			:class="[
				actionSurfaceClasses,
				{
					'g-button_icon': iconButton || isIconButton
				}
			]"
			:style="surfaceStyles"
			v-bind="{ ...tagAttrs, ...attrs }">
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
				class="g-button__content"
				:class="surfaceContentClasses">
				<span
					v-if="(slots.prepend || prepend) && !iconButton"
					class="g-button__prepend">
					<slot name="prepend">
						<g-icon :icon="prepend"></g-icon>
					</slot>
				</span>
				<span class="g-button__label">
					<slot>
						<template v-if="!iconButton">
							{{ label }}
						</template>
						<g-icon
							v-else-if="iconButton"
							:icon="iconButton">
						</g-icon>
					</slot>
				</span>
				<span
					v-if="(slots.append || append) && !iconButton"
					class="g-button__append">
					<slot name="append">
						<g-icon :icon="append"></g-icon>
					</slot>
				</span>
			</span>
		</component>
	</g-gradient>
</template>

<style lang="scss">
	@use '@/styles/mixins/action-surface' as actionSurface;
	@use '@/styles/mixins/rounded' as rounded;
	@use '@/styles/mixins/variants' as variants;
	@use '@/styles/mixins/base' as base;
	@use '@/styles/mixins/sizes' as size;
	@use '@/styles/mixins/truncate' as truncate;

	.g-button {
		@include base.base-component('g-button');

		--g-size-gap: var(--g-token-button-gap);
		--g-size-padding-y-s: var(--g-token-button-padding-y-s);
		--g-size-padding-x-s: var(--g-token-button-padding-x-s);
		--g-size-padding-y-m: var(--g-token-button-padding-y-m);
		--g-size-padding-x-m: var(--g-token-button-padding-x-m);
		--g-size-padding-y-l: var(--g-token-button-padding-y-l);
		--g-size-padding-x-l: var(--g-token-button-padding-x-l);
		--g-size-padding-y-xl: var(--g-token-button-padding-y-xl);
		--g-size-padding-x-xl: var(--g-token-button-padding-x-xl);
		--g-size-font-size-s: var(--g-token-button-font-size-s);
		--g-size-font-size-m: var(--g-token-button-font-size-m);
		--g-size-font-size-l: var(--g-token-button-font-size-l);
		--g-size-font-size-xl: var(--g-token-button-font-size-xl);
		--g-size-line-height: var(--g-token-button-line-height);
		--g-token-icon-size-m: var(--g-token-button-icon-size);

		border-radius: v-bind('computedBorderRadius');
		font: inherit;
		text-decoration: none;

		&__content {
			display: inline-flex;
			gap: inherit;
			align-items: center;
			justify-content: center;

			min-width: 0;
		}

		&_disabled {
			cursor: not-allowed;
			opacity: var(--g-token-opacity-disabled);
		}

		&_icon {
			justify-content: center;
			padding: 0;
		}

		&__label {
			line-height: var(--g-token-line-height-md);

			@include truncate.truncate;
		}
	}

	@include size.size-s('g-button');
	@include size.size-m('g-button');
	@include size.size-l('g-button');
	@include size.size-xl('g-button');
	@include rounded.rounded('g-button');
	@include actionSurface.action-surface-layers('g-button', true);
	@include actionSurface.action-state-overrides('g-button');
	@include variants.variant-gradient('g-button');
	@include variants.variant-tonal('g-button');
	@include variants.variant-text('g-button');
	@include variants.variant-glass('g-button');
	@include variants.variant-outlined('g-button');
</style>
