import { inject, provide } from 'vue';
import type { GMenuItemBase } from '@/use/menu';

export interface MenuContextState {
	onSelect: (item: GMenuItemBase) => void;
	onHover: (item: GMenuItemBase) => void;
}

const MenuContextSymbol = Symbol('MenuContext');

export function useMenuContext(
	handlers?: Partial<MenuContextState>
): MenuContextState {
	const parent = inject<MenuContextState | null>(MenuContextSymbol, null);
	if (parent) return parent;

	const state: MenuContextState = {
		onSelect: handlers?.onSelect ?? (() => {}),
		onHover: handlers?.onHover ?? (() => {})
	};

	provide(MenuContextSymbol, state);
	return state;
}
