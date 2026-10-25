<script setup lang="ts">
	import { computed, ref } from 'vue';
	import GNavigationIndicator from '@/components/shared/GNavigationIndicator.vue';
	import { useNavigationIndicator } from '@/use/navigation/indicator';
	import { makeTabListProps } from './types';
	import { useTabsInject } from './context';

	const props = defineProps(makeTabListProps());
	const tabs = useTabsInject();
	const root = ref<HTMLElement | null>(null);
	const { indicator } = useNavigationIndicator(
		root,
		() => tabs?.modelValue.value,
		() => tabs?.registeredTabs.value ?? []
	);

	const listClasses = computed(() => ({
		[`g-tab-list_${tabs?.orientation.value ?? 'horizontal'}`]: true,
		'g-tab-list_grow': props.grow
	}));
</script>

<template>
	<div
		ref="root"
		class="g-tab-list"
		:class="listClasses"
		role="tablist"
		:aria-label="props.ariaLabel"
		:aria-orientation="tabs?.orientation.value">
		<slot />
		<g-navigation-indicator
			v-if="tabs?.variant.value === 'line'"
			v-bind="indicator"
			:vertical="tabs?.orientation.value === 'vertical'"
			class="g-tab-list__indicator" />
	</div>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/scrollbar' as scrollbar;

	.g-tab-list {
		--g-tab-list-radius: var(--g-token-radius-md);

		position: relative;

		overflow: auto hidden;
		display: inline-flex;
		gap: var(--g-token-space-1);
		align-items: stretch;

		min-width: 0;
		max-width: 100%;
		padding: var(--g-token-space-1);
		border-radius: var(--g-tab-list-radius);

		background: rgba(var(--g-theme-on-surface), 0.04);

		&__indicator {
			background: var(--g-tabs-indicator-gradient, var(--g-color));
		}

		&_vertical {
			overflow: hidden auto;
			flex-direction: column;
		}

		&_grow {
			display: flex;
			width: 100%;
		}

		@include scrollbar.tonal-scrollbar(
			4px,
			var(--g-color, var(--g-token-color-primary)),
			24%,
			38%
		);
	}
</style>
