<script setup lang="ts">
	import type { GFABProps } from '.';
	import { computed } from 'vue';
	import GSquircle from '../GSquircle';
	import GIcon from '../GIcon.vue';

	const { size = 'm', label, icon } = defineProps<GFABProps>();

	const sizesMap = {
		s: 40,
		m: 56,
		l: 64,
		xl: 96
	};

	const computedSize = computed(() => sizesMap[size]);
</script>

<template>
	<div
		class="g-fab"
		:class="`g-fab_${computedSize}`">
		<slot v-if="label || $slots.default"> {{ label }}</slot>
		<g-squircle
			class="squircle"
			:size="computedSize">
			<slot name="icon">
				<g-icon :icon="icon"></g-icon>
			</slot>
		</g-squircle>
	</div>
</template>

<style scoped lang="scss">
	.g-fab {
		display: flex;
		gap: 10px;
		align-items: center;
		transition: transform 0.2s ease-in-out;

		&:hover {
			.squircle {
				transform: translateY(-3px);
				filter: drop-shadow(0 3px 20px rgb(0 0 0 / 5%))
					drop-shadow(0 4px 3px rgb(0 0 0 / 34%));
			}
		}
	}
</style>
