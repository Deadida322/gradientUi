import type { InjectionKey } from 'vue';
import { inject, provide } from 'vue';
import type { NavbarValue } from './types';

export interface NavbarMenuContext<T = NavbarValue> {
	registerValue: (value: T | undefined) => void;
	unregisterValue: (value: T | undefined) => void;
	select: (value: T | undefined, event?: Event) => void;
	isSelected: (value: T | undefined) => boolean;
}

const navbarMenuInjectionKey = Symbol(
	'g-navbar-menu'
) as InjectionKey<NavbarMenuContext>;

export function provideNavbarMenu<T extends NavbarValue = NavbarValue>(
	context: NavbarMenuContext<T>
) {
	provide(navbarMenuInjectionKey, context as unknown as NavbarMenuContext);
}

export function useNavbarMenuInject<T = NavbarValue>() {
	return inject(navbarMenuInjectionKey, null) as NavbarMenuContext<T> | null;
}
