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

		--g-size-gap: var(--g-token-chip-gap);
		--g-size-padding-y-s: var(--g-token-chip-padding-y-s);
		--g-size-padding-x-s: var(--g-token-chip-padding-x-s);
		--g-size-padding-y-m: var(--g-token-chip-padding-y-m);
		--g-size-padding-x-m: var(--g-token-chip-padding-x-m);
		--g-size-padding-y-l: var(--g-token-chip-padding-y-l);
		--g-size-padding-x-l: var(--g-token-chip-padding-x-l);
		--g-size-padding-y-xl: var(--g-token-chip-padding-y-xl);
		--g-size-padding-x-xl: var(--g-token-chip-padding-x-xl);
		--g-size-font-size-s: var(--g-token-chip-font-size-s);
		--g-size-font-size-m: var(--g-token-chip-font-size-m);
		--g-size-font-size-l: var(--g-token-chip-font-size-l);
		--g-size-font-size-xl: var(--g-token-chip-font-size-xl);
		--g-size-line-height-s: var(--g-token-chip-line-height-s);
		--g-size-line-height-m: var(--g-token-chip-line-height-m);
		--g-size-line-height-l: var(--g-token-chip-line-height-l);
		--g-size-line-height-xl: var(--g-token-chip-line-height-xl);

		user-select: none;

		min-width: 0;
		padding: var(--g-token-chip-padding-y-m) var(--g-token-chip-padding-x-m);
		border-radius: var(--g-token-chip-radius);

		font-size: var(--g-token-chip-font-size-m);
		line-height: var(--g-token-chip-line-height-m);

		&__content {
			display: inline-flex;
			gap: var(--g-token-chip-gap);
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

			opacity: var(--g-token-opacity-soft);
			background: transparent;

			transition: opacity var(--g-token-duration-fast)
				var(--g-token-easing-standard);

			&:hover {
				opacity: 1;
			}
		}

		&_disabled {
			cursor: not-allowed;
			opacity: var(--g-token-opacity-disabled);
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
