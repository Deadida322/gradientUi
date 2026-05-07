<script setup lang="ts" generic="T extends NavValue = NavValue">
	import { computed, ref } from 'vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { useNavListInject } from './context';
	import { provideNavGroup } from './groupContext';
	import {
		makeNavGroupProps,
		type GNavGroupSlotProps,
		type GNavGroupSlots,
		type NavValue
	} from './types';

	const props = defineProps(makeNavGroupProps());
	const slots = defineSlots<GNavGroupSlots<T>>();

	const nav = useNavListInject<T>();
	const open = ref(props.defaultOpen);
	const ownedValues = new Set<T | undefined>();
	const selected = computed(() => {
		if (!nav) return false;
		if (props.value !== undefined && nav.isSelected(props.value as T)) {
			return true;
		}

		for (const value of ownedValues) {
			if (nav.isSelected(value)) {
				return true;
			}
		}

		return false;
	});
	const placement = computed(() => nav?.placement.value ?? 'left');
	const align = computed(() => nav?.align.value ?? 'start');
	const resolvedColor = computed(
		() =>
			(selected.value ? nav?.activeColor.value : nav?.color.value) ??
			'primary'
	);
	const { colorStyles } = useSurfaceColor({
		color: () => resolvedColor.value
	});
	const groupStyles = computed(() => colorStyles.value);
	const slotProps = computed<GNavGroupSlotProps<T>>(() => ({
		selected: selected.value,
		open: open.value,
		disabled: props.disabled,
		value: props.value as T | undefined,
		modelValue: nav?.modelValue.value,
		isSelected,
		select,
		toggle
	}));

	function isSelected(value: T | undefined) {
		return nav ? nav.isSelected(value) : false;
	}

	function select(value: T | undefined, event?: Event) {
		nav?.select(value, event);
	}

	function toggle() {
		if (!props.collapsible || props.disabled) return;
		open.value = !open.value;
	}

	function registerValue(value: T | undefined) {
		if (value === undefined) return;
		ownedValues.add(value);
	}

	function unregisterValue(value: T | undefined) {
		if (value === undefined) return;
		ownedValues.delete(value);
	}

	provideNavGroup({
		registerValue,
		unregisterValue
	});
</script>

<template>
	<li
		class="g-nav-group"
		:class="{
			'g-nav-group_open': open,
			'g-nav-group_selected': selected,
			'g-nav-group_disabled': props.disabled,
			[`g-nav-group_${placement}`]: true,
			[`g-nav-group_align-${align}`]: true
		}"
		:style="groupStyles"
		role="none">
		<component
			:is="props.collapsible ? 'button' : 'div'"
			v-if="props.label || slots.label || props.collapsible"
			class="g-nav-group__header"
			:type="props.collapsible ? 'button' : undefined"
			:disabled="props.collapsible ? props.disabled : undefined"
			@click="toggle">
			<span class="g-nav-group__label">
				<slot
					name="label"
					v-bind="slotProps">
					{{ props.label }}
				</slot>
			</span>

			<span
				v-if="slots.append || props.collapsible"
				class="g-nav-group__append">
				<slot
					name="append"
					v-bind="slotProps">
					<g-icon
						v-if="props.collapsible"
						:icon="props.appendIcon" />
				</slot>
			</span>
		</component>

		<div
			v-show="!props.collapsible || open"
			class="g-nav-group__items">
			<slot v-bind="slotProps" />
		</div>
	</li>
</template>

<style scoped lang="scss">
	.g-nav-group {
		display: flex;
		flex-direction: column;
		gap: 4px;

		width: 100%;
		max-width: 100%;

		list-style: none;

		&__header {
			cursor: default;

			display: inline-flex;
			gap: var(--g-token-space-2);
			align-items: center;

			width: auto;
			max-width: 100%;
			min-height: 28px;
			padding: 0 10px;
			border: 0;

			font: inherit;
			font-size: var(--g-token-font-size-xs);
			font-weight: var(--g-token-font-weight-bold);
			color: color-mix(
				in srgb,
				var(--g-token-color-on-surface) 42%,
				var(--g-color) 12%
			);
			text-align: left;
			text-transform: uppercase;
			letter-spacing: 0.04em;

			background: transparent;
		}

		:where(button).g-nav-group__header {
			cursor: pointer;
		}

		&__label {
			overflow: hidden;
			flex: 0 1 auto;

			min-width: 0;

			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&__append {
			display: inline-flex;
			flex: 0 0 auto;
			align-items: center;
			justify-content: center;

			transition: transform var(--g-token-duration-base)
				var(--g-token-easing-standard);
		}

		&__items {
			display: flex;
			flex-direction: column;
			gap: 4px;

			width: 100%;
			min-width: 0;
			max-width: 100%;
		}

		&_align-start {
			align-items: flex-start;
		}

		&_align-center {
			align-items: center;
		}

		&_align-end {
			align-items: flex-end;
		}

		&_align-start &__header,
		&_align-start &__items {
			text-align: left;
		}

		&_align-center &__header,
		&_align-center &__items {
			text-align: center;
		}

		&_align-end &__header,
		&_align-end &__items {
			text-align: right;
		}

		&_selected &__header {
			color: color-mix(
				in srgb,
				var(--g-token-color-on-surface) 54%,
				var(--g-color) 24%
			);
		}

		&_open &__append {
			transform: rotate(180deg);
		}

		&_disabled {
			opacity: var(--g-token-opacity-disabled);
		}

		&_disabled &__header {
			pointer-events: none;
		}
	}
</style>
