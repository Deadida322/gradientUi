<script setup lang="ts">
	import { useSurfaceColor } from '@/use/surfaceColor';
	import type { GColor } from '@/use/color';
	import type { PropType } from 'vue';

	const props = defineProps({
		item: {
			type: Object,
			default: () => {}
		},
		color: {
			type: String as PropType<GColor>,
			default: 'primary'
		},
		checked: {
			type: Boolean,
			default: false
		}
	});
	const { colorStyles } = useSurfaceColor({
		color: () => props.color,
		active: () => props.checked
	});
</script>

<template>
	<div
		class="g-select-item"
		:class="{
			'g-select-item_checked': checked
		}"
		:style="colorStyles">
		<slot>
			{{ item.label }}
		</slot>
	</div>
</template>

<style lang="scss" scoped>
	.g-select-item {
		cursor: pointer;

		width: 100%;
		padding: 8px;
		border-radius: 4px;

		font-size: 12px;

		transition:
			transform 0.2s ease-in-out,
			background-color 0.2s ease-in-out;

		&:hover {
			transform: translateX(4px);
			color: var(--g-color);
		}

		&_checked {
			transform: translateX(4px);
			color: var(--g-color);
			background-color: color-mix(
				in srgb,
				var(--g-color) calc(var(--g-token-state-tonal-opacity) * 100%),
				transparent
			);
		}
	}
</style>
