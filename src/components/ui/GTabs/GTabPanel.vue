<script setup lang="ts" generic="T extends GTabValue = GTabValue">
	import { computed } from 'vue';
	import { useTabsInject } from './context';
	import {
		makeTabPanelProps,
		type GTabPanelSlotProps,
		type GTabPanelSlots,
		type GTabValue
	} from './types';

	const props = defineProps(makeTabPanelProps());
	defineSlots<GTabPanelSlots<T>>();
	const tabs = useTabsInject<T>();
	const selected = computed(() =>
		tabs ? tabs.isSelected(props.value as T | undefined) : false
	);
	const shouldRender = computed(() => props.eager || selected.value);
	const slotProps = computed<GTabPanelSlotProps<T>>(() => ({
		selected: selected.value,
		value: props.value as T | undefined,
		modelValue: tabs?.modelValue.value
	}));
</script>

<template>
	<section
		v-if="shouldRender"
		v-show="selected"
		:id="tabs?.getPanelId(props.value as T | undefined)"
		class="g-tab-panel"
		role="tabpanel"
		:tabindex="0"
		:aria-labelledby="tabs?.getTabId(props.value as T | undefined)">
		<slot v-bind="slotProps" />
	</section>
</template>

<style scoped lang="scss">
	.g-tab-panel {
		min-width: 0;

		&:focus-visible {
			outline: var(--g-token-state-focus-ring-width) solid
				var(--g-token-focus-ring);
			outline-offset: 2px;
		}
	}
</style>
