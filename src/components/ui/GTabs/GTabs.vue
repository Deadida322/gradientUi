<script setup lang="ts" generic="T extends GTabValue = GTabValue">
	import { computed } from 'vue';
	import { useDisabled } from '@/use/disabled';
	import { useNavigationController } from '@/use/navigation';
	import { useRounded } from '@/use/rounded';
	import { useSize } from '@/use/size';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { createComponentId } from '@/utils/createComponentId';
	import { provideTabs } from './context';
	import {
		makeTabsProps,
		type GTabValue,
		type GTabsEmits,
		type GTabsSlots
	} from './types';

	const props = defineProps(makeTabsProps({ color: 'primary' }));
	defineSlots<GTabsSlots<T>>();
	const emit = defineEmits<GTabsEmits<T>>();

	const rootId = createComponentId('g-tabs');
	const navigation = useNavigationController<T>({
		modelValue: () => props.modelValue as T | undefined,
		defaultValue: () => props.defaultValue as T | undefined,
		disabled: () => props.disabled,
		mandatory: () => props.mandatory,
		orientation: () => props.orientation,
		selectOnFocus: () => props.activation === 'automatic',
		selectOnAction: () => props.activation === 'manual',
		idPrefix: rootId,
		itemIdSegment: 'tab',
		onUpdateModelValue: (value) => emit('update:modelValue', value),
		onSelect: (value, event) => emit('select', value, event)
	});
	const resolvedActiveColor = computed(
		() => props.activeColor ?? props.color
	);
	const { colorStyles, resolvedGradient } = useSurfaceColor({
		color: () => resolvedActiveColor.value
	});
	const tabsIndicatorStyles = computed(() => ({
		'--g-tabs-indicator-gradient': resolvedGradient.value
	}));
	const tabsStyles = computed(() => [
		colorStyles.value,
		tabsIndicatorStyles.value
	]);
	const disabledClass = useDisabled(props, 'g-tabs');
	const roundedClass = useRounded(props, 'g-tabs');
	const sizeClass = useSize(props, 'g-tabs');
	const tabsClasses = computed(() => ({
		[`g-tabs_${props.orientation}`]: true,
		[`g-tabs_${props.variant}`]: true,
		[disabledClass.value]: true,
		[roundedClass.value]: true,
		[sizeClass.value]: true
	}));
	const slotProps = computed(() => ({
		modelValue: navigation.model.value,
		select: navigation.select
	}));

	provideTabs<T>({
		modelValue: navigation.model,
		color: computed(() => props.color),
		activeColor: resolvedActiveColor,
		activation: computed(() => props.activation),
		orientation: computed(() => props.orientation),
		variant: computed(() => props.variant),
		size: computed(() => props.size),
		disabled: computed(() => props.disabled),
		isSelected: navigation.isSelected,
		select: navigation.select,
		registerTab: navigation.registerItem,
		unregisterTab: navigation.unregisterItem,
		onTabKeydown: navigation.onItemKeydown,
		getTabId: (value) => navigation.getItemId(value),
		getPanelId: (value) => navigation.getPanelId(value)
	});
</script>

<template>
	<div
		class="g-tabs"
		:class="tabsClasses"
		:style="tabsStyles">
		<slot v-bind="slotProps" />
	</div>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/disabled' as disabled;
	@use '@/styles/mixins/rounded' as rounded;

	.g-tabs {
		display: grid;
		gap: var(--g-token-space-3);
		min-width: 0;
		color: var(--g-token-color-on-surface);

		&_vertical {
			grid-template-columns: auto minmax(0, 1fr);
			align-items: start;
		}
	}

	@include disabled.disabled('g-tabs');
	@include rounded.rounded('g-tabs');
</style>
