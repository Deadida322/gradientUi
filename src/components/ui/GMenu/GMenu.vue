<script setup lang="ts">
	import { GMenuEmits, makeGMenuProps, type GMenuItemBase } from '@/use/menu';
	import { useMenuContext } from '@/use/menuContext';
	import GMenuItem from '../GMenuItem/GMenuItem.vue';
	import GSubmenu from './GSubmenu.vue';
	const props = defineProps(makeGMenuProps());
	const emit = defineEmits(GMenuEmits);
	const menuContext = useMenuContext({
		onSelect: (item) => emit('select', item),
		onHover: (item) => emit('hover', item)
	});

	function hasChildren(item: GMenuItemBase): boolean {
		return Array.isArray(item.children) && item.children.length > 0;
	}

	function onClick(item: GMenuItemBase) {
		if (item.disabled) return;
		if (hasChildren(item)) return;
		menuContext.onSelect(item);
	}

	function onMouseenter(item: GMenuItemBase) {
		menuContext.onHover(item);
	}

	const isItemActive = (item: GMenuItemBase) =>
		Boolean(props.isSelected?.(item));
</script>

<template>
	<ul
		role="listbox"
		class="g-menu"
		v-bind="$attrs"
		v-on="$attrs">
		<template
			v-for="(item, index) in items"
			:key="item.id ?? index">
			<g-submenu
				v-if="hasChildren(item)"
				:item="item"
				:is-selected="props.isSelected"
				:state="props.state">
				<template #item="{ item: slotItem }">
					<slot
						name="item"
						:item="slotItem">
						{{ slotItem.label }}
					</slot>
				</template>
				<template #submenu>
					<g-menu
						:items="item.children ?? []"
						:is-selected="props.isSelected"
						:state="props.state" />
				</template>
			</g-submenu>

			<g-menu-item
				v-else
				:item="item"
				:selected="isSelected?.(item)"
				:state="props.state"
				role="option"
				:aria-selected="isItemActive(item)"
				:disabled="item.disabled"
				:label="item.label"
				@click="onClick(item)"
				@mouseenter="onMouseenter(item)">
				<slot
					name="item"
					:item="item"
					:selected="isItemActive(item)">
					{{ item.label }}
				</slot>
			</g-menu-item>
		</template>
	</ul>
</template>

<style lang="scss" scoped>
	.g-menu {
		display: flex;
		flex-direction: column;
		gap: var(--g-token-menu-gap);

		width: max-content;
		min-width: 100%;
		margin: 0;
		padding: 0;

		list-style: none;
		list-style-type: none;
	}
</style>
