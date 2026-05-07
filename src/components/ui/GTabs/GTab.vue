<script setup lang="ts" generic="T extends GTabValue = GTabValue">
	import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import { useDisabled } from '@/use/disabled';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { useTabsInject } from './context';
	import {
		makeTabProps,
		type GTabSlotProps,
		type GTabSlots,
		type GTabValue
	} from './types';

	const props = defineProps(makeTabProps());
	const slots = defineSlots<GTabSlots<T>>();
	const emit = defineEmits<{
		click: [event: MouseEvent];
	}>();

	const tabs = useTabsInject<T>();
	const rootRef = ref<HTMLElement | null>(null);
	const selected = computed(() =>
		tabs ? tabs.isSelected(props.value as T | undefined) : false
	);
	const disabled = computed(() => props.disabled || tabs?.disabled.value);
	const resolvedColor = computed(
		() =>
			(selected.value ? tabs?.activeColor.value : tabs?.color.value) ??
			'primary'
	);
	const { colorStyles } = useSurfaceColor({
		color: () => resolvedColor.value
	});
	const tabStyles = computed(() => colorStyles.value);
	const disabledClass = useDisabled(
		{
			get disabled() {
				return Boolean(disabled.value);
			}
		},
		'g-tab'
	);
	const tabClasses = computed(() => ({
		'g-tab_selected': selected.value,
		[disabledClass.value]: true,
		[`g-tab_${tabs?.variant.value ?? 'line'}`]: true,
		[`g-tab_${tabs?.size.value ?? 'm'}`]: true
	}));
	const slotProps = computed<GTabSlotProps<T>>(() => ({
		selected: selected.value,
		disabled: Boolean(disabled.value),
		value: props.value as T | undefined,
		modelValue: tabs?.modelValue.value,
		select
	}));
	const hasPrepend = computed(
		() => Boolean(slots.prepend) || Boolean(props.prependIcon)
	);
	const hasAppend = computed(
		() => Boolean(slots.append) || Boolean(props.appendIcon)
	);

	function register() {
		if (!tabs || !rootRef.value) return;

		tabs.registerTab({
			value: props.value as T | undefined,
			el: rootRef.value,
			disabled: Boolean(disabled.value)
		});
	}

	function unregister() {
		if (!tabs || !rootRef.value) return;

		tabs.unregisterTab(rootRef.value);
	}

	function select(value: T | undefined, event?: Event) {
		tabs?.select(value, event);
	}

	function onClick(event: MouseEvent) {
		if (disabled.value) return;

		select(props.value as T | undefined, event);
		emit('click', event);
	}

	function onKeydown(event: KeyboardEvent) {
		tabs?.onTabKeydown(event, props.value as T | undefined);
	}

	onMounted(register);
	onBeforeUnmount(unregister);

	watch(
		() => [props.value, disabled.value],
		() => register()
	);
</script>

<template>
	<button
		:id="tabs?.getTabId(props.value as T | undefined)"
		ref="rootRef"
		v-ripple
		class="g-tab"
		:class="tabClasses"
		:style="tabStyles"
		type="button"
		role="tab"
		:disabled="disabled"
		:tabindex="selected ? 0 : -1"
		:aria-selected="selected"
		:aria-controls="tabs?.getPanelId(props.value as T | undefined)"
		@click="onClick"
		@keydown="onKeydown">
		<span
			v-if="hasPrepend"
			class="g-tab__prepend">
			<slot
				name="prepend"
				v-bind="slotProps">
				<g-icon :icon="props.prependIcon" />
			</slot>
		</span>

		<span class="g-tab__label">
			<slot v-bind="slotProps">{{ props.label }}</slot>
		</span>

		<span
			v-if="hasAppend"
			class="g-tab__append">
			<slot
				name="append"
				v-bind="slotProps">
				<g-icon :icon="props.appendIcon" />
			</slot>
		</span>
	</button>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/base' as base;
	@use '@/styles/mixins/disabled' as disabled;
	@use '@/styles/mixins/sizes' as size;

	.g-tab {
		@include base.base-component('g-tab');

		--g-size-gap: var(--g-token-space-2);
		--g-size-padding-y-s: 0;
		--g-size-padding-x-s: var(--g-token-space-3);
		--g-size-padding-y-m: 0;
		--g-size-padding-x-m: var(--g-token-space-4);
		--g-size-padding-y-l: 0;
		--g-size-padding-x-l: var(--g-token-space-5);
		--g-size-padding-y-xl: 0;
		--g-size-padding-x-xl: var(--g-token-space-5);
		--g-size-font-size-s: var(--g-token-font-size-xs);
		--g-size-font-size-m: var(--g-token-font-size-sm);
		--g-size-font-size-l: var(--g-token-font-size-md);
		--g-size-font-size-xl: var(--g-token-font-size-md);
		--g-size-line-height: var(--g-token-line-height-md);
		--g-tab-min-height: 40px;

		cursor: pointer;

		position: relative;

		flex: 0 0 auto;

		min-width: 0;
		min-height: var(--g-tab-min-height);
		border-radius: var(--g-token-radius-sm);

		color: var(--g-token-text-soft);

		background: transparent;

		transition:
			color var(--g-token-duration-hover) var(--g-token-easing-standard),
			background-color var(--g-token-duration-hover)
				var(--g-token-easing-standard),
			box-shadow var(--g-token-duration-hover)
				var(--g-token-easing-standard);

		&::after {
			content: '';

			position: absolute;
			right: var(--g-token-space-2);
			bottom: 0;
			left: var(--g-token-space-2);

			height: 2px;
			border-radius: var(--g-token-radius-pill);

			opacity: 0;
			background: var(--g-tabs-indicator-gradient, var(--g-color));

			transition: opacity var(--g-token-duration-fast)
				var(--g-token-easing-standard);
		}

		&:hover {
			color: var(--g-color);
			background: color-mix(in srgb, var(--g-color) 8%, transparent);
		}

		&:focus-visible {
			outline: var(--g-token-state-focus-ring-width) solid
				color-mix(in srgb, var(--g-color) 48%, transparent);
			outline-offset: 2px;
		}

		&_selected {
			color: var(--g-color);
		}

		&_selected::after {
			opacity: 1;
		}

		&_pill.g-tab_selected,
		&_tonal.g-tab_selected {
			background: color-mix(in srgb, var(--g-color) 12%, transparent);
		}

		&_pill::after,
		&_tonal::after {
			display: none;
		}

		&_pill.g-tab_selected {
			box-shadow: inset 0 0 0 1px
				color-mix(in srgb, var(--g-color) 18%, transparent);
		}

		&_s {
			--g-tab-min-height: 32px;
		}

		&_m {
			--g-tab-min-height: 40px;
		}

		&_l,
		&_xl {
			--g-tab-min-height: 48px;
		}

		&__label {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&__prepend,
		&__append {
			display: inline-flex;
			flex: 0 0 auto;
			align-items: center;
		}
	}

	@include size.size-s('g-tab');
	@include size.size-m('g-tab');
	@include size.size-l('g-tab');
	@include size.size-xl('g-tab');
	@include disabled.disabled('g-tab');
</style>
