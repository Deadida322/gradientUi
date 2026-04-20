<script setup lang="ts">
	import GGradient from '../GGradient/GGradient.vue';
	import GIcon from '@/components/ui/GIcon.vue';
	import type { PLASlots } from '@/types/CommonTypes';
	import { useActionSurface } from '@/use/actionSurface';
	import { makeChipProps } from './types';

	const slots = defineSlots<PLASlots>();
	const props = defineProps(makeChipProps());

	const { actionSurfaceClasses } = useActionSurface(props, 'g-chip');
</script>

<template>
	<g-gradient
		class="g-gradient"
		v-bind="props">
		<div
			class="g-chip"
			:class="actionSurfaceClasses">
			<div class="g-chip__content">
				<div
					v-if="slots.prepend || prependIcon"
					class="g-chip__prepend">
					<slot name="prepend">
						<g-icon
							v-if="prependIcon"
							:icon="prependIcon" />
					</slot>
				</div>

				<div class="g-chip__label">
					<slot>{{ label }}</slot>
				</div>

				<div
					v-if="slots.append || appendIcon"
					class="g-chip__append">
					<slot name="append">
						<g-icon
							v-if="appendIcon"
							:icon="appendIcon" />
					</slot>
				</div>

				<button
					v-if="removable"
					type="button"
					class="g-chip__remove"
					@click.stop="onRemove?.()">
					<g-icon icon="close" />
				</button>
			</div>
		</div>
	</g-gradient>
</template>

<style lang="scss" scoped>
	@use '@/styles/mixins/action-surface' as actionSurface;
	@use '@/styles/mixins/rounded' as rounded;
	@use '@/styles/mixins/variants' as variants;
	@use '@/styles/mixins/base' as base;
	@use '@/styles/mixins/sizes' as size;

	.g-chip {
		@include base.base-component('g-chip');

		user-select: none;

		min-width: 0;
		padding: 4px 10px;
		border-radius: 999px;

		font-size: 13px;
		line-height: 18px;

		&__content {
			display: inline-flex;
			gap: 6px;
			align-items: center;
			min-width: 0;
		}

		&__prepend,
		&__append,
		&__remove {
			display: inline-flex;
			flex: 0 0 auto;
			align-items: center;
		}

		&__label {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&__remove {
			cursor: pointer;

			padding: 0;
			border: none;

			color: inherit;

			opacity: 0.72;
			background: transparent;

			transition: opacity 0.16s ease;

			&:hover {
				opacity: 1;
			}
		}

		&_disabled {
			cursor: not-allowed;
			opacity: 0.56;
		}

		&_active {
			transform: translateY(1px);
		}
	}

	@include variants.variant-tonal('g-chip');
	@include variants.variant-text('g-chip');
	@include variants.variant-outlined('g-chip');
	@include size.size-s('g-chip');
	@include size.size-m('g-chip');
	@include size.size-l('g-chip');
	@include size.size-xl('g-chip');
	@include rounded.rounded('g-chip');
	@include actionSurface.action-state-overrides('g-chip');
</style>
