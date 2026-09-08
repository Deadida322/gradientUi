import { inject, provide, type ComputedRef, type Ref } from 'vue';
import type { Sizes } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';
import type { GNavigationRegistration } from '@/use/navigation';
import type {
	GStepValue,
	GStepperActivation,
	GStepperItemSlotProps,
	GStepperOrientation,
	GStepperResolvedItem,
	GStepperSemanticState,
	GStepperSlotProps,
	GStepperStepState,
	GStepperVariant
} from './types';

export interface GStepperContext<T = unknown, V = GStepValue> {
	modelValue: Ref<V | undefined>;
	items: ComputedRef<GStepperResolvedItem<T, V>[]>;
	activeItem: ComputedRef<GStepperResolvedItem<T, V> | undefined>;
	activeIndex: ComputedRef<number>;
	color: ComputedRef<GColor | undefined>;
	activeColor: ComputedRef<GColor | undefined>;
	activation: ComputedRef<GStepperActivation>;
	orientation: ComputedRef<GStepperOrientation>;
	variant: ComputedRef<GStepperVariant>;
	size: ComputedRef<Sizes>;
	disabled: ComputedRef<boolean>;
	canPrev: ComputedRef<boolean>;
	canNext: ComputedRef<boolean>;
	isLast: ComputedRef<boolean>;
	prevText: ComputedRef<string>;
	nextText: ComputedRef<string>;
	finishText: ComputedRef<string>;
	isSelected: (value: V | undefined) => boolean;
	isStepAvailable: (item: GStepperResolvedItem<T, V>) => boolean;
	isStepCompleted: (item: GStepperResolvedItem<T, V>) => boolean;
	getItemState: (item: GStepperResolvedItem<T, V>) => GStepperStepState;
	getItemSemanticState: (
		item: GStepperResolvedItem<T, V>
	) => GStepperSemanticState | undefined;
	select: (value: V | undefined, event?: Event) => void;
	next: (event?: Event) => void;
	prev: (event?: Event) => void;
	finish: (event?: Event) => void;
	registerStep: (registration: GNavigationRegistration<V>) => void;
	unregisterStep: (el: HTMLElement) => void;
	onStepKeydown: (event: KeyboardEvent, value: V | undefined) => void;
	getStepId: (value: V | undefined) => string;
	getPanelId: (value: V | undefined) => string;
	getItemSlotProps: (
		item: GStepperResolvedItem<T, V>
	) => GStepperItemSlotProps<T, V>;
	getSlotProps: () => GStepperSlotProps<T, V>;
}

const GStepperSymbol = Symbol('GStepper');

export const provideStepper = <T = unknown, V = GStepValue>(
	context: GStepperContext<T, V>
) => {
	provide(GStepperSymbol, context);
};

export const useStepperInject = <T = unknown, V = GStepValue>() =>
	inject<GStepperContext<T, V> | null>(GStepperSymbol, null);
