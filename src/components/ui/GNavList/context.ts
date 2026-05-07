import type { GColor } from '@/use/color';
import type { InjectionKey, Ref } from 'vue';
import { inject, provide } from 'vue';
import type {
	NavListAlign,
	NavListIndicator,
	NavListPlacement,
	NavValue
} from './types';

export interface NavListContext<T = NavValue> {
	modelValue: Ref<T | undefined>;
	color: Ref<GColor | undefined>;
	activeColor: Ref<GColor | undefined>;
	placement: Ref<NavListPlacement>;
	align: Ref<NavListAlign>;
	indicator: Ref<NavListIndicator>;
	isSelected: (value: T | undefined) => boolean;
	select: (value: T | undefined, event?: Event) => void;
}

const navListInjectionKey = Symbol(
	'g-nav-list'
) as InjectionKey<NavListContext>;

export function provideNavList<T extends NavValue = NavValue>(
	context: NavListContext<T>
) {
	provide(navListInjectionKey, context as unknown as NavListContext);
}

export function useNavListInject<T = NavValue>() {
	return inject(navListInjectionKey, null) as NavListContext<T> | null;
}
