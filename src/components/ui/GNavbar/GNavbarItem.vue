<script setup lang="ts" generic="T extends NavbarValue = NavbarValue">
	import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { useNavbarInject } from './context';
	import {
		makeNavbarItemProps,
		type GNavbarItemSlotProps,
		type GNavbarItemSlots,
		type NavbarValue
	} from './types';

	const props = defineProps(makeNavbarItemProps());
	const slots = defineSlots<GNavbarItemSlots<T>>();
	const emit = defineEmits<{
		click: [event: MouseEvent];
	}>();

	const navbar = useNavbarInject<T>();
	const rootRef = ref<HTMLElement | null>(null);
	const selected = computed(() =>
		navbar
			? navbar.isSelected(props.value as T | undefined) ||
				navbar.isElementSelected(rootRef.value)
			: false
	);
	const resolvedColor = computed(
		() =>
			(selected.value
				? navbar?.activeColor.value
				: navbar?.color.value) ?? 'primary'
	);
	const { colorStyles } = useSurfaceColor({
		color: () => resolvedColor.value
	});
	const itemStyles = computed(() => colorStyles.value);
	const slotProps = computed<GNavbarItemSlotProps<T>>(() => ({
		selected: selected.value,
		disabled: props.disabled,
		value: props.value as T | undefined,
		modelValue: navbar?.modelValue.value,
		isSelected,
		select,
		closeDropdown
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

	function register() {
		if (!navbar || !rootRef.value) return;

		navbar.register(props.value as T | undefined, rootRef.value);
	}

	function unregister() {
		if (!navbar || !rootRef.value) return;

		navbar.unregisterElement(rootRef.value);
	}

	function refresh() {
		navbar?.refreshIndicator();
	}

	function isSelected(value: T | undefined) {
		return navbar ? navbar.isSelected(value) : false;
	}

	function closeDropdown() {
		// Kept in slot props for parity with grouped navigation items.
	}

	function select(value: T | undefined, event?: Event) {
		navbar?.select(value, event);
		refresh();
	}

	function onClick(event: MouseEvent) {
		if (props.disabled) {
			event.preventDefault();
			return;
		}

		select(props.value as T | undefined, event);
		emit('click', event);
	}

	onMounted(register);
	onBeforeUnmount(unregister);

	watch(
		() => props.value,
		(_value, oldValue) => {
			if (navbar && rootRef.value) {
				navbar.unregister(oldValue as T | undefined, rootRef.value);
			}

			register();
		}
	);

	watch(resolvedColor, refresh);
</script>

<template>
	<li
		ref="rootRef"
		class="g-navbar-item"
		:class="{
			'g-navbar-item_selected': selected,
			'g-navbar-item_disabled': props.disabled
		}"
		:style="itemStyles"
		role="none">
		<component
			:is="actionTag"
			v-ripple
			class="g-navbar-item__action"
			role="menuitem"
			:aria-current="selected ? 'page' : undefined"
			v-bind="actionAttrs"
			@click="onClick">
			<span
				v-if="slots.prepend || props.prependIcon"
				class="g-navbar-item__prepend">
				<slot
					name="prepend"
					v-bind="slotProps">
					<g-icon :icon="props.prependIcon" />
				</slot>
			</span>

			<span class="g-navbar-item__label">
				<slot v-bind="slotProps">{{ props.label }}</slot>
			</span>

			<span
				v-if="slots.append || props.appendIcon"
				class="g-navbar-item__append">
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
	.g-navbar-item {
		position: relative;

		display: inline-flex;
		flex: 0 0 auto;
		align-items: stretch;

		height: var(--g-navbar-height, 56px);

		color: var(--g-token-color-on-surface);
		list-style: none;

		:deep(.base-floating__reference) {
			display: flex;
			height: 100%;
		}

		&__action {
			cursor: pointer;

			position: relative;

			display: inline-flex;
			gap: var(--g-token-space-2);
			align-items: center;
			justify-content: center;

			min-width: 0;
			height: 100%;
			padding: 0 var(--g-token-space-3);
			border: 0;
			border-radius: var(--g-token-radius-md);

			font: inherit;
			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-medium);
			line-height: var(--g-token-line-height-sm);
			color: inherit;
			text-decoration: none;

			background: transparent;

			transition:
				background-color var(--g-token-duration-hover)
					var(--g-token-easing-standard),
				color var(--g-token-duration-hover)
					var(--g-token-easing-standard);

			&:hover {
				background: color-mix(in srgb, var(--g-color) 10%, transparent);
			}

			&:focus-visible {
				outline: var(--g-token-state-focus-ring-width) solid
					color-mix(in srgb, var(--g-color) 70%, transparent);
				outline-offset: 2px;
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
			color: currentcolor;
		}

		&__append {
			transition: transform var(--g-token-duration-base)
				var(--g-token-easing-standard);
		}

		&_selected {
			color: var(--g-color);
		}

		&_disabled {
			pointer-events: none;
			opacity: var(--g-token-opacity-disabled);
		}
	}
</style>
