import { computed, type ComputedRef, type Ref } from 'vue';
import type { GMenuItemBase } from '@/use/menu';
import type { InternalItem } from './types';

export type SelectMenuItem<T, V> = InternalItem<T, V> &
	Required<Pick<GMenuItemBase, 'id'>>;

export function useSelectMenuItems<T, V>(
	items: Ref<InternalItem<T, V>[]>
): {
	menuItems: ComputedRef<SelectMenuItem<T, V>[]>;
	resolveMenuItem: (item: GMenuItemBase) => SelectMenuItem<T, V> | undefined;
} {
	function normalize(
		item: InternalItem<T, V>,
		index: number,
		parentPath = ''
	): SelectMenuItem<T, V> {
		const id = `${parentPath}${index}`;

		return {
			...item,
			id,
			children: item.children?.map((child, childIndex) =>
				normalize(child, childIndex, `${id}-`)
			)
		};
	}

	function findById(
		list: SelectMenuItem<T, V>[],
		id: string | number | undefined
	): SelectMenuItem<T, V> | undefined {
		for (const menuItem of list) {
			if (menuItem.id === id) return menuItem;
			if (menuItem.children?.length) {
				const found = findById(
					menuItem.children as SelectMenuItem<T, V>[],
					id
				);
				if (found) return found;
			}
		}

		return undefined;
	}

	const menuItems = computed<SelectMenuItem<T, V>[]>(() => {
		return items.value.map((item, index) => normalize(item, index));
	});

	function resolveMenuItem(
		item: GMenuItemBase
	): SelectMenuItem<T, V> | undefined {
		return findById(menuItems.value, item.id);
	}

	return {
		menuItems,
		resolveMenuItem
	};
}
