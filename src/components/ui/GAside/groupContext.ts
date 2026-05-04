import type { InjectionKey } from 'vue';
import { inject, provide } from 'vue';
import type { AsideValue } from './types';

export interface AsideGroupContext<T = AsideValue> {
	registerValue: (value: T | undefined) => void;
	unregisterValue: (value: T | undefined) => void;
}

const asideGroupInjectionKey = Symbol(
	'g-aside-group'
) as InjectionKey<AsideGroupContext>;

export function provideAsideGroup<T extends AsideValue = AsideValue>(
	context: AsideGroupContext<T>
) {
	provide(asideGroupInjectionKey, context as AsideGroupContext);
}

export function useAsideGroupInject<T = AsideValue>() {
	return inject(asideGroupInjectionKey, null) as AsideGroupContext<T> | null;
}
