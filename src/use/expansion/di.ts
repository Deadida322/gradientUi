import { inject, provide, type InjectionKey } from 'vue';
import type { ExpansionGroupContext } from './types';

export const ExpansionGroupKey: InjectionKey<unknown> =
	Symbol('ExpansionGroup');

export function provideExpansionGroup<T>(context: ExpansionGroupContext<T>) {
	provide(ExpansionGroupKey, context as unknown);
}

export function useExpansionGroupInject<T>() {
	return inject(ExpansionGroupKey, null) as ExpansionGroupContext<T> | null;
}
