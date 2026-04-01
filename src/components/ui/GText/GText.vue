<script lang="ts" setup>
	import type { GTextProps } from './types';
	import type { PLASlots } from '@/types/CommonTypes';
	import { useAttrs } from 'vue';
	const {
		tagName = 'div',
		prependIcon,
		appendIcon
	} = defineProps<GTextProps>();
	const slots = defineSlots<PLASlots>();

	const attrs = useAttrs();
</script>

<template>
	<component
		v-bind="attrs"
		:is="tagName"
		:class="{
			[`g-title_${type}`]: type
		}"
		class="g-title">
		<div
			v-if="slots.prepend"
			class="g-title__prepend">
			<slot name="prepend">
				<g-icon :icon="prependIcon"></g-icon>
			</slot>
		</div>
		<div class="g-title__label">
			<slot name="default">
				{{ label }}
			</slot>
		</div>
		<div
			v-if="slots.append"
			class="g-title__append">
			<slot name="append">
				<g-icon :icon="appendIcon"></g-icon>
			</slot>
		</div>
	</component>
</template>

<style scoped lang="scss">
	.g-title {
		display: flex;
		gap: 10px;
		align-items: flex-start;

		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		text-align: start;

		&_h-1 {
			font-size: 6rem;
			font-weight: 300;
			line-height: 1;
		}

		&_h-2 {
			font-size: 3.75rem;
			font-weight: 300;
			line-height: 1;
		}

		&_h-3 {
			font-size: 3rem;
			font-weight: 400;
			line-height: 1.05;
		}

		&_h-4 {
			font-size: 2.125rem;
			font-weight: 400;
			line-height: 1.175;
		}

		&_h-5 {
			font-size: 1.5rem;
			font-weight: 400;
			line-height: 1.333;
		}

		&_h-6 {
			font-size: 1.25rem;
			font-weight: 500;
			line-height: 1.6;
		}

		&_subtitle-1 {
			font-size: 1rem;
			font-weight: 400;
			line-height: 1.75;
		}

		&_subtitle-2 {
			font-size: 0.875rem;
			font-weight: 500;
			line-height: 1.6;
		}

		&_small {
			font-size: 0.875rem;
			font-weight: 400;
			line-height: 1.425;
		}

		&_caption {
			font-size: 0.75rem;
			font-weight: 400;
			line-height: 1.667;
		}
	}
</style>
