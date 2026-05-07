<script setup lang="ts" generic="T extends NavbarValue = NavbarValue">
	import { computed, onBeforeUnmount, onMounted } from 'vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { useNavbarInject } from './context';
	import { useNavbarMenuInject } from './menuContext';
	import {
		makeNavbarSubItemProps,
		type GNavbarItemSlotProps,
		type NavbarValue
	} from './types';

	const props = defineProps(makeNavbarSubItemProps());
	const slots = defineSlots<{
		default?: (props: GNavbarItemSlotProps<T>) => unknown;
		prepend?: (props: GNavbarItemSlotProps<T>) => unknown;
		append?: (props: GNavbarItemSlotProps<T>) => unknown;
	}>();

	const navbar = useNavbarInject<T>();
	const menu = useNavbarMenuInject<T>();
	const selected = computed(() =>
		menu ? menu.isSelected(props.value as T | undefined) : false
	);
	const { colorStyles } = useSurfaceColor({
		color: () =>
			(selected.value
				? navbar?.activeColor.value
				: navbar?.color.value) ?? 'primary'
	});
	const slotProps = computed<GNavbarItemSlotProps<T>>(() => ({
		selected: selected.value,
		disabled: props.disabled,
		value: props.value as T | undefined,
		modelValue: navbar?.modelValue.value,
		isSelected: (value) => menu?.isSelected(value) ?? false,
		select: (value, event) => menu?.select(value, event),
		closeDropdown: () => menu?.select(undefined)
	}));
	const isLink = computed(() => Boolean(props.href) && !props.disabled);
	const actionTag = computed(() => (isLink.value ? 'a' : 'button'));
	const actionAttrs = computed(() =>
		isLink.value
			? {
					href: props.href,
					target: props.target,
					rel:
						props.rel ??
						(props.target === '_blank'
							? 'noopener noreferrer'
							: undefined)
				}
			: {
					type: 'button',
					disabled: props.disabled
				}
	);

	function onClick(event: MouseEvent) {
		if (props.disabled) {
			event.preventDefault();
			return;
		}

		menu?.select(props.value as T | undefined, event);
	}

	onMounted(() => {
		menu?.registerValue(props.value as T | undefined);
	});

	onBeforeUnmount(() => {
		menu?.unregisterValue(props.value as T | undefined);
	});
</script>

<template>
	<li
		class="g-navbar-sub-item"
		:class="{
			'g-navbar-sub-item_selected': selected,
			'g-navbar-sub-item_disabled': props.disabled
		}"
		:style="colorStyles"
		role="none">
		<component
			:is="actionTag"
			v-ripple
			class="g-navbar-sub-item__action"
			role="menuitem"
			:aria-current="selected ? 'page' : undefined"
			v-bind="actionAttrs"
			@click="onClick">
			<span
				v-if="slots.prepend || props.prependIcon"
				class="g-navbar-sub-item__prepend">
				<slot
					name="prepend"
					v-bind="slotProps">
					<g-icon :icon="props.prependIcon" />
				</slot>
			</span>

			<span class="g-navbar-sub-item__label">
				<slot v-bind="slotProps">{{ props.label }}</slot>
			</span>

			<span
				v-if="slots.append || props.appendIcon"
				class="g-navbar-sub-item__append">
				<slot
					name="append"
					v-bind="slotProps">
					<g-icon :icon="props.appendIcon" />
				</slot>
			</span>
		</component>
	</li>
</template>

<style scoped lang="scss">
	.g-navbar-sub-item {
		list-style: none;

		&__action {
			cursor: pointer;

			display: flex;
			gap: var(--g-token-space-2);
			align-items: center;

			width: 100%;
			min-height: 34px;
			padding: var(--g-token-space-2) var(--g-token-space-3);
			border: 0;
			border-radius: var(--g-token-radius-sm);

			font: inherit;
			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-medium);
			line-height: var(--g-token-line-height-sm);
			color: color-mix(
				in srgb,
				var(--g-token-color-on-surface) 58%,
				transparent
			);
			text-align: left;
			text-decoration: none;

			background: transparent;

			transition:
				background-color var(--g-token-duration-hover)
					var(--g-token-easing-standard),
				color var(--g-token-duration-hover)
					var(--g-token-easing-standard);

			&:hover {
				color: var(--g-color);
				background: color-mix(in srgb, var(--g-color) 10%, transparent);
			}
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

		&_selected &__action {
			color: var(--g-color);
			background: color-mix(in srgb, var(--g-color) 12%, transparent);
		}

		&_disabled {
			pointer-events: none;
			opacity: var(--g-token-opacity-disabled);
		}
	}
</style>
