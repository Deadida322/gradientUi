import type { MaybeRefOrGetter, Ref } from 'vue';

export type GNavigationValue =
	| string
	| number
	| boolean
	| symbol
	| Record<string, unknown>
	| unknown[];

export type GNavigationOrientation = 'horizontal' | 'vertical';

export interface GNavigationRegistration<T = GNavigationValue> {
	value: T | undefined;
	el: HTMLElement;
	disabled: boolean;
}

export interface UseNavigationControllerOptions<T = GNavigationValue> {
	modelValue: MaybeRefOrGetter<T | undefined>;
	defaultValue?: MaybeRefOrGetter<T | undefined>;
	disabled?: MaybeRefOrGetter<boolean | undefined>;
	mandatory?: MaybeRefOrGetter<boolean | undefined>;
	orientation?: MaybeRefOrGetter<GNavigationOrientation | undefined>;
	selectOnFocus?: MaybeRefOrGetter<boolean | undefined>;
	selectOnAction?: MaybeRefOrGetter<boolean | undefined>;
	idPrefix: string;
	itemIdSegment?: string;
	panelIdSegment?: string;
	onUpdateModelValue: (value: T | undefined) => void;
	onSelect?: (value: T | undefined, event?: Event) => void;
	canSelect?: (value: T | undefined, event?: Event) => boolean;
}

export interface UseNavigationKeyboardOptions<T = GNavigationValue> {
	orientation?: MaybeRefOrGetter<GNavigationOrientation | undefined>;
	selectOnAction?: MaybeRefOrGetter<boolean | undefined>;
	getEnabledItems: () => GNavigationRegistration<T>[];
	focusItem: (index: number, event: KeyboardEvent) => void;
	select: (value: T | undefined, event?: Event) => void;
}

export interface UseNavigationItemOptions<T = GNavigationValue> {
	value: MaybeRefOrGetter<T | undefined>;
	rootRef: Ref<HTMLElement | null>;
	disabled?: MaybeRefOrGetter<boolean | undefined>;
	parentDisabled?: MaybeRefOrGetter<boolean | undefined>;
	isSelected?: (value: T | undefined) => boolean;
	select?: (value: T | undefined, event?: Event) => void;
	registerItem?: (registration: GNavigationRegistration<T>) => void;
	unregisterItem?: (el: HTMLElement) => void;
	onItemKeydown?: (event: KeyboardEvent, value: T | undefined) => void;
	onClick?: (event: MouseEvent) => void;
}
