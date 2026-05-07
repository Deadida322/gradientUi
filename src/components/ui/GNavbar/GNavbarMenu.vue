<script setup lang="ts" generic="T extends NavbarValue = NavbarValue">
	import {
		computed,
		nextTick,
		onBeforeUnmount,
		onMounted,
		ref,
		watch,
		type ComponentPublicInstance
	} from 'vue';
	import GDropdown from '@/components/ui/GDropdown/GDropdown.vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { provideNavbarMenu } from './menuContext';
	import { useNavbarInject } from './context';
	import {
		makeNavbarMenuProps,
		type GNavbarItemSlotProps,
		type GNavbarMenuSlots,
		type NavbarValue
	} from './types';

	const props = defineProps(makeNavbarMenuProps());
	const slots = defineSlots<GNavbarMenuSlots<T>>();
	const emit = defineEmits<{
		click: [event: MouseEvent];
	}>();

	const navbar = useNavbarInject<T>();
	const actionRef = ref<HTMLElement | null>(null);
	const dropdownOpen = ref(false);
	const ownedValues = new Set<T | undefined>();
	const selected = computed(() =>
		navbar
			? navbar.isSelected(props.value as T | undefined) ||
				navbar.isElementSelected(actionRef.value)
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
	const actionIcon = computed(() =>
		dropdownOpen.value ? props.openedIcon : props.closedIcon
	);

	function registerOwnValue(value: T | undefined) {
		if (!navbar || !actionRef.value || value === undefined) return;

		ownedValues.add(value);
		navbar.register(value, actionRef.value);
	}

	function unregisterOwnValue(value: T | undefined) {
		if (!navbar || !actionRef.value || value === undefined) return;

		ownedValues.delete(value);
		navbar.unregister(value, actionRef.value);
	}

	function register() {
		registerOwnValue(props.value as T | undefined);
	}

	function unregister() {
		if (!navbar || !actionRef.value) return;

		navbar.unregisterElement(actionRef.value);
		ownedValues.clear();
	}

	function refresh() {
		navbar?.refreshIndicator();
	}

	function isSelected(value: T | undefined) {
		return navbar ? navbar.isSelected(value) : false;
	}

	function closeDropdown() {
		dropdownOpen.value = false;
	}

	function select(value: T | undefined, event?: Event) {
		registerOwnValue(value);
		navbar?.select(value, event);

		if (props.closeOnSelect) {
			closeDropdown();
		}

		void nextTick(refresh);
	}

	function onClick(event: MouseEvent) {
		if (props.disabled) {
			event.preventDefault();
			return;
		}

		select(props.value as T | undefined, event);
		emit('click', event);
	}

	function setActionElement(
		el: Element | ComponentPublicInstance | null,
		setActivatorRef: (el: Element | ComponentPublicInstance | null) => void
	) {
		setActivatorRef(el);
		actionRef.value = el instanceof HTMLElement ? el : null;
	}

	provideNavbarMenu({
		registerValue: registerOwnValue,
		unregisterValue: unregisterOwnValue,
		select,
		isSelected
	});

	onMounted(register);
	onBeforeUnmount(unregister);

	watch(
		() => props.value,
		(_value, oldValue) => {
			unregisterOwnValue(oldValue as T | undefined);
			register();
		}
	);

	watch(resolvedColor, refresh);
</script>

<template>
	<li
		class="g-navbar-menu"
		:class="{
			'g-navbar-menu_selected': selected,
			'g-navbar-menu_disabled': props.disabled,
			'g-navbar-menu_open': dropdownOpen
		}"
		:style="itemStyles"
		role="none">
		<g-dropdown
			v-model="dropdownOpen"
			close-on-content-click
			append-to="body"
			open-on-hover
			open-on-focus
			:open-on-click="false"
			:offset="0"
			placement="bottom-start">
			<template #activator="{ activatorAttrs, activatorRef }">
				<button
					:ref="(el) => setActionElement(el, activatorRef)"
					v-ripple
					class="g-navbar-menu__action"
					type="button"
					role="menuitem"
					:aria-current="selected ? 'page' : undefined"
					:aria-haspopup="true"
					:aria-expanded="dropdownOpen"
					:disabled="props.disabled"
					v-bind="activatorAttrs"
					@click="onClick">
					<span
						v-if="slots.prepend || props.prependIcon"
						class="g-navbar-menu__prepend">
						<slot
							name="prepend"
							v-bind="slotProps">
							<g-icon :icon="props.prependIcon" />
						</slot>
					</span>

					<span class="g-navbar-menu__label">
						<slot v-bind="slotProps">{{ props.label }}</slot>
					</span>

					<span class="g-navbar-menu__append">
						<slot
							name="append"
							v-bind="slotProps">
							<g-icon :icon="props.appendIcon ?? actionIcon" />
						</slot>
					</span>
				</button>
			</template>

			<div class="g-navbar-menu__dropdown">
				<slot
					name="dropdown"
					v-bind="slotProps" />
			</div>
		</g-dropdown>
	</li>
</template>

<style scoped lang="scss">
	.g-navbar-menu {
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

		&__dropdown {
			min-width: 220px;
		}

		&_selected {
			color: var(--g-color);
		}

		&_open &__append {
			transform: rotate(180deg);
		}

		&_disabled {
			pointer-events: none;
			opacity: var(--g-token-opacity-disabled);
		}
	}
</style>
