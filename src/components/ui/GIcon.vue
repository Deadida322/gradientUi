<script setup lang="ts">
	import { toRef } from 'vue';
	import usePx from '@/use/px';
	import type { GIconProps } from './GIcon/types';
	import { useIcon } from '@/use/icon';

	const props = withDefaults(defineProps<GIconProps>(), {
		size: 20,
		tag: 'span'
	});

	const computedSize = usePx(toRef(props, 'size'));
	const resolvedIcon = useIcon(() => props.icon);
</script>

<template>
	<component
		:is="resolvedIcon.component"
		:icon="resolvedIcon.icon"
		:tag="props.tag"
		class="g-icon"
		:style="{ fontSize: computedSize }"
		v-bind="$attrs" />
</template>

<style scoped lang="scss">
	.g-icon {
		display: flex;
		align-items: center;
	}
</style>
