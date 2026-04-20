import type { GMenuItemBase } from '@/use/menu';
import type { SelectMenuItem } from './menuItems';

export function useSelectMenuSlot<T, V>(
	resolveMenuItem: (item: GMenuItemBase) => SelectMenuItem<T, V> | undefined
) {
	function getSlotItem(item: GMenuItemBase): SelectMenuItem<T, V> {
		const resolvedItem = resolveMenuItem(item);

		if (!resolvedItem) {
			throw new Error('Failed to resolve select menu item.');
		}

		return resolvedItem;
	}

	return {
		getSlotItem
	};
}
