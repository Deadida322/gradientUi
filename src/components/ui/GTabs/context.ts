import { inject, provide, type ComputedRef, type Ref } from 'vue';
import type {
	GTabValue,
	GTabsActivation,
	GTabsOrientation,
	GTabsVariant
} from './types';
import type { GColor } from '@/use/color';
import type { Sizes } from '@/types/CommonTypes';

export interface GTabRegistration<T = GTabValue> {
	value: T | undefined;
	el: HTMLElement;
	disabled: boolean;
}

export interface GTabsContext<T = GTabValue> {
	modelValue: Ref<T | undefined>;
	color: ComputedRef<GColor | undefined>;
	activeColor: ComputedRef<GColor | undefined>;
	activation: ComputedRef<GTabsActivation>;
	orientation: ComputedRef<GTabsOrientation>;
	variant: ComputedRef<GTabsVariant>;
	size: ComputedRef<Sizes>;
	disabled: ComputedRef<boolean>;
	isSelected: (value: T | undefined) => boolean;
	select: (value: T | undefined, event?: Event) => void;
	registerTab: (registration: GTabRegistration<T>) => void;
	unregisterTab: (el: HTMLElement) => void;
	onTabKeydown: (event: KeyboardEvent, value: T | undefined) => void;
	getTabId: (value: T | undefined) => string;
	getPanelId: (value: T | undefined) => string;
}

const GTabsSymbol = Symbol('GTabs');

export const provideTabs = <T = GTabValue>(context: GTabsContext<T>) => {
	provide(GTabsSymbol, context);
};

export const useTabsInject = <T = GTabValue>() =>
	inject<GTabsContext<T> | null>(GTabsSymbol, null);
