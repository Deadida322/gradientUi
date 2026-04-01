<script setup lang="ts">
	import GGradient from '../GGradient/GGradient.vue';
	import GIcon from '@/components/ui/GIcon.vue';
	import type { PLASlots } from '@/types/CommonTypes';
	import { makeButtonProps } from './types';
	import { useVariant } from '@/use/variant';
	import { useSize } from '@/use/size';
	import usePx from '@/use/px';
	const slots = defineSlots<PLASlots>();

	const props = defineProps(
		makeButtonProps({
			borderWidth: 0,
			borderRadius: 4,
			placement: 'center'
		})
	);

	const computedBorderRadius = usePx(props.borderRadius);

	const variantClasses = useVariant(props, 'g-button');
	const sizeClasses = useSize(props, 'g-button');
</script>

<template>
	<g-gradient
		v-gradient-icon
		class="g-gradient"
		v-bind="{
			...props
		}">
		<div
			v-ripple
			class="g-button"
			:class="{
				[variantClasses]: true,
				[sizeClasses]: true,
				'g-button_icon': iconButton || isIconButton,
				'g-button_rounded': rounded,
				'g-button_active': active
			}">
			<div
				v-if="(slots.prepend || prepend) && !iconButton"
				class="g-button__prepend">
				<slot name="prepend">
					<g-icon :icon="prepend"></g-icon>
				</slot>
			</div>
			<div class="g-button__label">
				<slot>
					<template v-if="!iconButton">
						{{ label }}
					</template>
					<g-icon
						v-else
						:icon="iconButton">
					</g-icon>
				</slot>
			</div>
			<div
				v-if="(slots.append || append) && !iconButton"
				class="g-button__append">
				<slot name="append">
					<g-icon :icon="append"></g-icon>
				</slot>
			</div>
		</div>
	</g-gradient>
</template>

<style lang="scss">
	@use '@/styles/mixins/rounded' as rounded;
	@use '@/styles/mixins/variants' as variants;
	@use '@/styles/mixins/base' as base;
	@use '@/styles/mixins/sizes' as size;

	.g-button {
		@include base.base-component('g-button');

		border-radius: v-bind('computedBorderRadius');

		&_icon {
			justify-content: center;
			padding: 0;
		}

		&__label {
			line-height: 20px;
		}
	}

	@include variants.variant-filled('g-button');
	@include variants.variant-tonal('g-button');
	@include variants.variant-text('g-button');
	@include variants.variant-outlined('g-button');
	@include size.size-s('g-button');
	@include size.size-m('g-button');
	@include size.size-l('g-button');
	@include rounded.rounded('g-button');
</style>
