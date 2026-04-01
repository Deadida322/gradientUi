<script lang="ts" setup>
	import usePx from '@/use/px';
	import { makeIconProps } from './types';
	import { useIcon } from '@/use/icon';
	const props = defineProps(makeIconProps());

	const computedSize = usePx(props.size);
	const resolvedIcon = useIcon(() => props.icon!);
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
