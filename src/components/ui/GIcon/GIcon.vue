<script lang="ts" setup>
	import { computed } from 'vue';
	import { makeIconProps } from './types';
	import { useIcon } from '@/use/icon';
	const props = defineProps(makeIconProps());

	const resolvedIcon = useIcon(() => props.icon!);
	const iconSize = computed(() =>
		props.size == null
			? 'var(--g-token-icon-size-m)'
			: Number.isFinite(Number(props.size))
				? `${props.size}px`
				: String(props.size)
	);
</script>

<template>
	<component
		:is="resolvedIcon.component"
		:icon="resolvedIcon.icon"
		:tag="props.tag"
		class="g-icon"
		:style="{ fontSize: iconSize }"
		v-bind="$attrs" />
</template>

<style scoped lang="scss">
	.g-icon {
		display: flex;
		align-items: center;
	}
</style>
