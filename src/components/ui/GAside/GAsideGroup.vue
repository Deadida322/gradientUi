<script setup lang="ts" generic="T extends AsideValue = AsideValue">
	import { computed, ref } from 'vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { useAsideInject } from './context';
	import { provideAsideGroup } from './groupContext';
	import {
		makeAsideGroupProps,
		type AsideValue,
		type GAsideGroupSlotProps,
		type GAsideGroupSlots
	} from './types';

	const props = defineProps(makeAsideGroupProps());
	const slots = defineSlots<GAsideGroupSlots<T>>();

	const aside = useAsideInject<T>();
	const open = ref(props.defaultOpen);
	const ownedValues = new Set<T | undefined>();
	const selected = computed(() => {
		if (!aside) return false;
		if (props.value !== undefined && aside.isSelected(props.value as T)) {
			return true;
		}

		for (const value of ownedValues) {
			if (aside.isSelected(value)) {
				return true;
			}
		}

		return false;
	});
	const placement = computed(() => aside?.placement.value ?? 'right');
	const align = computed(() => aside?.align.value ?? 'end');
	const resolvedColor = computed(
		() =>
			(selected.value ? aside?.activeColor.value : aside?.color.value) ??
			'primary'
	);
	const { colorStyles } = useSurfaceColor({
		color: () => resolvedColor.value
	});
	const groupStyles = computed(() => colorStyles.value);
	const slotProps = computed<GAsideGroupSlotProps<T>>(() => ({
		selected: selected.value,
		open: open.value,
		disabled: props.disabled,
		value: props.value as T | undefined,
		modelValue: aside?.modelValue.value,
		isSelected,
		select,
		toggle
	}));

	function isSelected(value: T | undefined) {
		return aside ? aside.isSelected(value) : false;
	}

	function select(value: T | undefined, event?: Event) {
		aside?.select(value, event);
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

	provideAsideGroup({
		registerValue,
		unregisterValue
	});
</script>

<template>
	<li
		class="g-aside-group"
		:class="{
			'g-aside-group_open': open,
			'g-aside-group_selected': selected,
			'g-aside-group_disabled': props.disabled,
			[`g-aside-group_${placement}`]: true,
			[`g-aside-group_align-${align}`]: true
		}"
		:style="groupStyles"
		role="none">
		<component
			:is="props.collapsible ? 'button' : 'div'"
			v-if="props.label || slots.label || props.collapsible"
			class="g-aside-group__header"
			:type="props.collapsible ? 'button' : undefined"
			:disabled="props.collapsible ? props.disabled : undefined"
			@click="toggle">
			<span class="g-aside-group__label">
				<slot
					name="label"
					v-bind="slotProps">
					{{ props.label }}
				</slot>
			</span>

			<span
				v-if="slots.append || props.collapsible"
				class="g-aside-group__append">
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
			class="g-aside-group__items">
			<slot v-bind="slotProps" />
		</div>
	</li>
</template>

<style scoped lang="scss">
	.g-aside-group {
		display: flex;
		flex-direction: column;
		gap: 4px;

		width: fit-content;
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

		:where(button).g-aside-group__header {
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

			width: fit-content;
			min-width: 0;
			max-width: 100%;
			padding-inline: 12px;
		}

		&_align-start {
			align-self: flex-start;
		}

		&_align-center {
			align-self: center;
		}

		&_align-end {
			align-self: flex-end;
		}

		&_left &__header {
			align-self: flex-start;
		}

		&_right &__header {
			align-self: flex-end;
		}

		&_left &__items {
			align-items: flex-start;
		}

		&_right &__items {
			align-items: flex-end;
		}

		&_left &__items {
			padding-inline: 14px 0;
		}

		&_right &__items {
			padding-inline: 0 14px;
		}

		&_align-start &__header {
			justify-content: flex-start;
		}

		&_align-start &__header,
		&_align-start &__items {
			text-align: left;
		}

		&_align-center &__header {
			justify-content: center;
		}

		&_align-center &__header,
		&_align-center &__items {
			text-align: center;
		}

		&_align-end &__header {
			justify-content: flex-end;
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

		&:not(.g-aside-group_disabled, .g-aside-group_selected)
			.g-aside-group__header:hover {
			color: color-mix(
				in srgb,
				var(--g-token-color-on-surface) 50%,
				var(--g-color) 16%
			);
		}

		&:not(.g-aside-group_selected) .g-aside-group__append {
			color: color-mix(
				in srgb,
				var(--g-token-color-on-surface) 36%,
				transparent
			);
		}
	}
</style>
