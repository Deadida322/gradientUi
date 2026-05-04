<script setup lang="ts">
	import GTransition from './GTransition.vue';
	import { makeGTransitionProps } from '@/use/transition';

	const props = defineProps(
		makeGTransitionProps({
			name: 'fade',
			css: true,
			tag: 'div'
		})
	);
</script>

<template>
	<g-transition
		v-bind="props"
		group>
		<slot></slot>
	</g-transition>
</template>
