<script setup lang="ts">
	import { useAttrs } from 'vue';
	import type { GAlertProps } from './types';
	const slots = defineSlots<{
		default?: () => unknown;
		prepend?: () => unknown;
		append?: () => unknown;
		title?: () => unknown;
		footer?: () => unknown;
	}>();
	const { title } = defineProps<GAlertProps>();
	const attrs = useAttrs();
</script>

<template>
	<divs
		v-bind="attrs"
		class="g-alert">
		<div
			v-if="slots.title || title"
			class="g-alert__title">
			<slot name="title"></slot>
		</div>
		<div class="g-alert__body">
			<div
				v-if="slots.prepend"
				class="g-alert__prepend">
				<slot name="prepend"></slot>
			</div>
			<div class="g-alert__body-default"></div>
			<div
				v-if="slots.append"
				class="g-alert__append">
				<slot name="append"></slot>
			</div>
		</div>
	</divs>
</template>
