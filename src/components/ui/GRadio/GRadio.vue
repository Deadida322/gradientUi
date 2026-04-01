<script setup lang="ts">
	import { v4 } from 'uuid';
	import type { GRadioProps } from './types';
	import GRadioItem from './GRadioItem.vue';

	const { vertical, disabled, options } = defineProps<GRadioProps>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const modelValue = defineModel<any>();
	const name = v4();
</script>

<template>
	<div
		class="g-radio-group"
		:class="{
			'g-radio-group_disabled': vertical,
			'g-radio-group_vertical': disabled
		}">
		<g-radio-item
			v-for="{ label, value } in options"
			:key="label"
			v-model="modelValue"
			:active="value === modelValue"
			:label="label"
			:name="name"
			:value="value">
		</g-radio-item>
	</div>
</template>

<style scoped lang="scss">
	.g-radio-group {
		display: flex;
		gap: 8px;

		&_vertical {
			flex-direction: column;
			align-items: start;
		}
	}
</style>
