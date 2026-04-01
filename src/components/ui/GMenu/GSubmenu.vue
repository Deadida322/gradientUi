<script setup lang="ts">
	import {
		computed,
		onBeforeUnmount,
		ref,
		type ComponentPublicInstance
	} from 'vue';
	import { useMenuContext } from '@/use/menuContext';
	import type { GMenuItemBase } from '@/use/menu';
	import type { GGradienStates } from '@/use/gradient';
	import GDropdown from '../GDropdown/GDropdown.vue';
	import GMenuItem from '../GMenuItem/GMenuItem.vue';
	import GIcon from '../GIcon/GIcon.vue';

	const props = defineProps<{
		item: GMenuItemBase;
		isSelected?: (item: GMenuItemBase) => boolean;
		highlighted?: boolean;
		state?: GGradienStates;
	}>();

	const menuContext = useMenuContext();

	const hasChildren = computed(
		() =>
			Array.isArray(props.item.children) && props.item.children.length > 0
	);
	type MenuItemRef =
		| HTMLElement
		| (ComponentPublicInstance & { $el: Element });

	const menuItemRef = ref<MenuItemRef | null>(null);
	const open = ref(false);
	let closeTimer: ReturnType<typeof setTimeout> | null = null;

	function hasSelectedInTree(root: GMenuItemBase): boolean {
		if (!props.isSelected) return false;

		const stack: GMenuItemBase[] = [root];
		while (stack.length > 0) {
			const current = stack.pop();
			if (!current) continue;
			if (props.isSelected(current)) return true;
			if (
				Array.isArray(current.children) &&
				current.children.length > 0
			) {
				stack.push(...current.children);
			}
		}

		return false;
	}

	const isSubmenuSelected = computed(() => hasSelectedInTree(props.item));

	function clearCloseTimer() {
		if (!closeTimer) return;
		clearTimeout(closeTimer);
		closeTimer = null;
	}

	function scheduleClose() {
		clearCloseTimer();
		closeTimer = setTimeout(() => {
			open.value = false;
		}, 120);
	}

	function onMouseenter() {
		clearCloseTimer();
		open.value = true;
		menuContext.onHover(props.item);
	}

	function onMouseleave() {
		scheduleClose();
	}

	function onContentMouseenter() {
		clearCloseTimer();
		open.value = true;
	}

	function onContentMouseleave() {
		scheduleClose();
	}

	onBeforeUnmount(() => {
		clearCloseTimer();
	});
</script>

<template>
	<g-menu-item
		ref="menuItemRef"
		:item="item"
		:selected="isSubmenuSelected"
		:state="props.state"
		role="option"
		:aria-selected="isSubmenuSelected"
		:data-disabled="item.disabled"
		:label="item.label"
		v-on="$attrs"
		@mouseenter="onMouseenter"
		@mouseleave="onMouseleave">
		<slot
			name="item"
			:item="item">
			{{ item.label }}
		</slot>
		<template #append>
			<g-icon
				icon="chevron-down"
				size="20"></g-icon>
			<g-dropdown
				v-if="hasChildren"
				v-model="open"
				:reference="menuItemRef"
				placement="bottom"
				same-width
				:open-on-click="false"
				:open-on-focus="false"
				:offset="0"
				:close-on-content-click="false">
				<div
					@mouseenter="onContentMouseenter"
					@mouseleave="onContentMouseleave">
					<slot name="submenu" />
				</div>
			</g-dropdown>
		</template>
	</g-menu-item>
</template>

<style scoped lang="scss">
	.g-menu__arrow {
		opacity: 0.6;
	}
</style>
