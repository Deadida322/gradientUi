import type { GColor } from '@/use/color';
import type { InjectionKey, Ref } from 'vue';
import { inject, provide } from 'vue';
import type { NavbarValue } from './types';

export interface NavbarContext<T = NavbarValue> {
	modelValue: Ref<T | undefined>;
	color: Ref<GColor | undefined>;
	activeColor: Ref<GColor | undefined>;
	isSelected: (value: T | undefined) => boolean;
	isElementSelected: (el: HTMLElement | null | undefined) => boolean;
	register: (value: T | undefined, el: HTMLElement) => void;
	unregister: (value: T | undefined, el: HTMLElement) => void;
	unregisterElement: (el: HTMLElement) => void;
	select: (value: T | undefined, event?: Event) => void;
	refreshIndicator: () => void;
}

const navbarInjectionKey = Symbol('g-navbar') as InjectionKey<NavbarContext>;

export function provideNavbar<T extends NavbarValue = NavbarValue>(
	context: NavbarContext<T>
) {
	provide(navbarInjectionKey, context as unknown as NavbarContext);
}

export function useNavbarInject<T = NavbarValue>() {
	return inject(navbarInjectionKey, null) as NavbarContext<T> | null;
}
