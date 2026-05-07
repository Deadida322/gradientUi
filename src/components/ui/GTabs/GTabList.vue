<script setup lang="ts">
	import { computed } from 'vue';
	import { makeTabListProps } from './types';
	import { useTabsInject } from './context';

	const props = defineProps(makeTabListProps());
	const tabs = useTabsInject();

	const listClasses = computed(() => ({
		[`g-tab-list_${tabs?.orientation.value ?? 'horizontal'}`]: true,
		'g-tab-list_grow': props.grow
	}));
</script>

<template>
	<div
		class="g-tab-list"
		:class="listClasses"
		role="tablist"
		:aria-label="props.ariaLabel"
		:aria-orientation="tabs?.orientation.value">
		<slot />
	</div>
</template>

<style scoped lang="scss">
	.g-tab-list {
		--g-tab-list-radius: var(--g-token-radius-md);

		display: inline-flex;
		gap: var(--g-token-space-1);
		align-items: stretch;

		min-width: 0;
		padding: var(--g-token-space-1);
		border-radius: var(--g-tab-list-radius);

		background: rgba(var(--g-theme-on-surface), 0.04);

		&_vertical {
			flex-direction: column;
		}

		&_grow {
			display: flex;
			width: 100%;
		}
	}
</style>
