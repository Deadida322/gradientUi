<script lang="ts" setup>
	import { computed } from 'vue';
	import { useAttrs } from 'vue';
	import GIcon from '../GIcon/GIcon.vue';
	import type { GTextProps } from './types';
	import type { PLASlots } from '@/types/CommonTypes';
	const {
		tagName,
		prependIcon,
		appendIcon,
		type,
		truncate = false
	} = defineProps<GTextProps>();
	const slots = defineSlots<PLASlots>();
	const attrs = useAttrs();

	const computedTag = computed(() => {
		if (tagName) return tagName;

		if (type?.startsWith('h-')) {
			return type.replace('-', '');
		}

		if (type === 'subtitle-1' || type === 'subtitle-2') {
			return 'p';
		}

		if (type === 'caption' || type === 'small') {
			return 'span';
		}

		return 'div';
	});

	const hasPrepend = computed(
		() => Boolean(slots.prepend) || Boolean(prependIcon)
	);
	const hasAppend = computed(
		() => Boolean(slots.append) || Boolean(appendIcon)
	);
</script>

<template>
	<component
		v-bind="attrs"
		:is="computedTag"
		:class="{
			[`g-text_${type}`]: type,
			[`g-title_${type}`]: type,
			'g-text_truncate': truncate
		}"
		class="g-text g-title">
		<div
			v-if="hasPrepend"
			class="g-text__prepend g-title__prepend">
			<slot name="prepend">
				<g-icon :icon="prependIcon"></g-icon>
			</slot>
		</div>
		<div class="g-text__label g-title__label">
			<slot name="default">
				{{ label }}
			</slot>
		</div>
		<div
			v-if="hasAppend"
			class="g-text__append g-title__append">
			<slot name="append">
				<g-icon :icon="appendIcon"></g-icon>
			</slot>
		</div>
	</component>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/truncate' as truncate;

	.g-text,
	.g-title {
		--g-token-icon-size-m: var(--g-token-text-icon-size);

		display: flex;
		gap: var(--g-token-text-gap);
		align-items: flex-start;

		margin: 0;

		font-size: var(--g-token-text-body-size);
		font-weight: var(--g-token-text-body-weight);
		line-height: var(--g-token-text-body-line-height);
		color: var(--g-token-text-color);
		text-align: start;

		&__prepend,
		&__append {
			display: inline-flex;
			flex: 0 0 auto;
			align-items: center;
		}

		&__label {
			min-width: 0;
		}

		&_truncate &__label {
			@include truncate.truncate;
		}

		&_h-1 {
			font-size: var(--g-token-text-h-1-size);
			font-weight: var(--g-token-text-h-1-weight);
			line-height: var(--g-token-text-h-1-line-height);
		}

		&_h-2 {
			font-size: var(--g-token-text-h-2-size);
			font-weight: var(--g-token-text-h-2-weight);
			line-height: var(--g-token-text-h-2-line-height);
		}

		&_h-3 {
			font-size: var(--g-token-text-h-3-size);
			font-weight: var(--g-token-text-h-3-weight);
			line-height: var(--g-token-text-h-3-line-height);
		}

		&_h-4 {
			font-size: var(--g-token-text-h-4-size);
			font-weight: var(--g-token-text-h-4-weight);
			line-height: var(--g-token-text-h-4-line-height);
		}

		&_h-5 {
			font-size: var(--g-token-text-h-5-size);
			font-weight: var(--g-token-text-h-5-weight);
			line-height: var(--g-token-text-h-5-line-height);
		}

		&_h-6 {
			font-size: var(--g-token-text-h-6-size);
			font-weight: var(--g-token-text-h-6-weight);
			line-height: var(--g-token-text-h-6-line-height);
		}

		&_subtitle-1 {
			font-size: var(--g-token-text-subtitle-1-size);
			font-weight: var(--g-token-text-subtitle-1-weight);
			line-height: var(--g-token-text-subtitle-1-line-height);
		}

		&_subtitle-2 {
			font-size: var(--g-token-text-subtitle-2-size);
			font-weight: var(--g-token-text-subtitle-2-weight);
			line-height: var(--g-token-text-subtitle-2-line-height);
		}

		&_small {
			font-size: var(--g-token-text-small-size);
			font-weight: var(--g-token-text-small-weight);
			line-height: var(--g-token-text-small-line-height);
		}

		&_caption {
			font-size: var(--g-token-text-caption-size);
			font-weight: var(--g-token-text-caption-weight);
			line-height: var(--g-token-text-caption-line-height);
		}
	}
</style>
