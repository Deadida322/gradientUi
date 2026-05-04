import type { InjectionKey } from 'vue';
import { inject, provide } from 'vue';
import type { NavbarValue } from './types';

export interface NavbarGroupContext<T = NavbarValue> {
	registerValue: (value: T | undefined) => void;
	unregisterValue: (value: T | undefined) => void;
	select: (value: T | undefined, event?: Event) => void;
	isSelected: (value: T | undefined) => boolean;
}

const navbarGroupInjectionKey = Symbol(
	'g-navbar-group'
) as InjectionKey<NavbarGroupContext>;

export function provideNavbarGroup<T extends NavbarValue = NavbarValue>(
	context: NavbarGroupContext<T>
) {
	provide(navbarGroupInjectionKey, context as unknown as NavbarGroupContext);
}

export function useNavbarGroupInject<T = NavbarValue>() {
	return inject(
		navbarGroupInjectionKey,
		null
	) as NavbarGroupContext<T> | null;
}
