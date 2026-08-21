<script setup lang="ts" generic="T extends GTabValue = GTabValue">
	import { computed, ref, shallowRef } from 'vue';
	import { useDisabled } from '@/use/disabled';
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
	const localValue = ref<T | undefined>(props.defaultValue as T | undefined);
	const registeredTabs = shallowRef<
		{
			value: T | undefined;
			el: HTMLElement;
			disabled: boolean;
		}[]
	>([]);

	const isControlled = computed(() => props.modelValue !== undefined);
	const model = computed<T | undefined>({
		get() {
			return isControlled.value
				? (props.modelValue as T | undefined)
				: localValue.value;
		},
		set(value) {
			if (!isControlled.value) {
				localValue.value = value;
			}

			emit('update:modelValue', value);
		}
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
		modelValue: model.value,
		select
	}));

	const valueKey = (value: T | undefined) =>
		String(value ?? 'default').replace(/[^a-zA-Z0-9_-]/g, '-');

	function isSelected(value: T | undefined) {
		return value !== undefined && Object.is(model.value, value);
	}

	function select(value: T | undefined, event?: Event) {
		if (props.disabled || value === undefined) return;

		model.value = value;
		emit('select', value, event);
	}

	function registerTab(registration: {
		value: T | undefined;
		el: HTMLElement;
		disabled: boolean;
	}) {
		const next = registeredTabs.value.filter(
			(item) => item.el !== registration.el
		);

		next.push(registration);
		registeredTabs.value = next;

		if (
			props.mandatory &&
			model.value === undefined &&
			registration.value !== undefined &&
			!registration.disabled
		) {
			select(registration.value);
		}
	}

	function unregisterTab(el: HTMLElement) {
		registeredTabs.value = registeredTabs.value.filter(
			(item) => item.el !== el
		);
	}

	function getEnabledTabs() {
		return registeredTabs.value.filter(
			(item) => !item.disabled && item.value !== undefined
		);
	}

	function focusTab(index: number, event: KeyboardEvent) {
		const enabledTabs = getEnabledTabs();
		const tab = enabledTabs[index];

		if (!tab) return;

		event.preventDefault();
		tab.el.focus();

		if (props.activation === 'automatic') {
			select(tab.value, event);
		}
	}

	function onTabKeydown(event: KeyboardEvent, value: T | undefined) {
		const enabledTabs = getEnabledTabs();
		const currentIndex = enabledTabs.findIndex((item) =>
			Object.is(item.value, value)
		);
		const horizontal = props.orientation === 'horizontal';
		const previousKey = horizontal ? 'ArrowLeft' : 'ArrowUp';
		const nextKey = horizontal ? 'ArrowRight' : 'ArrowDown';

		if (event.key === previousKey) {
			focusTab(
				currentIndex <= 0 ? enabledTabs.length - 1 : currentIndex - 1,
				event
			);
			return;
		}

		if (event.key === nextKey) {
			focusTab(
				currentIndex >= enabledTabs.length - 1 ? 0 : currentIndex + 1,
				event
			);
			return;
		}

		if (event.key === 'Home') {
			focusTab(0, event);
			return;
		}

		if (event.key === 'End') {
			focusTab(enabledTabs.length - 1, event);
			return;
		}

		if (
			props.activation === 'manual' &&
			(event.key === 'Enter' || event.key === ' ')
		) {
			event.preventDefault();
			select(value, event);
		}
	}

	provideTabs<T>({
		modelValue: model,
		color: computed(() => props.color),
		activeColor: resolvedActiveColor,
		activation: computed(() => props.activation),
		orientation: computed(() => props.orientation),
		variant: computed(() => props.variant),
		size: computed(() => props.size),
		disabled: computed(() => props.disabled),
		isSelected,
		select,
		registerTab,
		unregisterTab,
		onTabKeydown,
		getTabId: (value) => `${rootId}-tab-${valueKey(value)}`,
		getPanelId: (value) => `${rootId}-panel-${valueKey(value)}`
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
