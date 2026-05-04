import type { GColor } from '@/use/color';
import type { InjectionKey, Ref } from 'vue';
import { inject, provide } from 'vue';
import type {
	AsideAlign,
	AsideIndicator,
	AsidePlacement,
	AsideValue
} from './types';

export interface AsideContext<T = AsideValue> {
	modelValue: Ref<T | undefined>;
	color: Ref<GColor | undefined>;
	activeColor: Ref<GColor | undefined>;
	placement: Ref<AsidePlacement>;
	align: Ref<AsideAlign>;
	indicator: Ref<AsideIndicator>;
	isSelected: (value: T | undefined) => boolean;
	select: (value: T | undefined, event?: Event) => void;
}

const asideInjectionKey = Symbol('g-aside') as InjectionKey<AsideContext>;

export function provideAside<T extends AsideValue = AsideValue>(
	context: AsideContext<T>
) {
	provide(asideInjectionKey, context as unknown as AsideContext);
}

export function useAsideInject<T = AsideValue>() {
	return inject(asideInjectionKey, null) as AsideContext<T> | null;
}
