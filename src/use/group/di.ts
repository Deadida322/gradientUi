import { type InjectionKey, inject, provide } from 'vue';
import type { GroupContext } from './types';

export const GroupKey: InjectionKey<unknown> = Symbol('Group');

export function provideGroup<T>(ctx: GroupContext<T>) {
	provide(GroupKey, ctx as unknown);
}

export function useGroupInject<T>(): GroupContext<T> | null {
	return inject(GroupKey, null) as GroupContext<T> | null;
}
