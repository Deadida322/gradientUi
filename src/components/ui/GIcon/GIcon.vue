<script lang="ts" setup>
	import { computed } from 'vue';
	import { makeIconProps } from './types';
	import { useIcon } from '@/use/icon';
	const props = defineProps(makeIconProps());

	const resolvedIcon = useIcon(() => props.icon);
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
		v-if="resolvedIcon.icon"
		:icon="resolvedIcon.icon"
		:tag="props.tag"
		class="g-icon"
		:style="{ fontSize: iconSize }"
		v-bind="$attrs" />
</template>

<style scoped lang="scss">
	.g-icon {
		display: inline-flex;
		flex: 0 0 auto;
		align-items: center;
		justify-content: center;

		width: 1em;
		height: 1em;

		line-height: 1;
		vertical-align: middle;
	}
</style>
