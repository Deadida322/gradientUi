import type { InjectionKey } from 'vue';
import { inject, provide } from 'vue';
import type { NavValue } from './types';

export interface NavGroupContext<T = NavValue> {
	registerValue: (value: T | undefined) => void;
	unregisterValue: (value: T | undefined) => void;
}

const navGroupInjectionKey = Symbol(
	'g-nav-group'
) as InjectionKey<NavGroupContext>;

export function provideNavGroup<T extends NavValue = NavValue>(
	context: NavGroupContext<T>
) {
	provide(navGroupInjectionKey, context as NavGroupContext);
}

export function useNavGroupInject<T = NavValue>() {
	return inject(navGroupInjectionKey, null) as NavGroupContext<T> | null;
}
