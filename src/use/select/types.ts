export interface InternalItem<T, V = unknown> {
	label: string;
	value: V;
	raw: T;
	disabled?: boolean;
	children?: InternalItem<T, V>[];
}

export type SelectItemKey<T> = Extract<keyof T, string | number>;
export type SelectLabelKey<T> = SelectItemKey<T> | ((item: T) => string);
export type SelectValueKey<T, V> = SelectItemKey<T> | ((item: T) => V);
export type SelectItemChildren<T> =
	| SelectItemKey<T>
	| ((item: T) => readonly T[] | undefined);

export type SelectionValue<
	T,
	V,
	Multiple extends boolean,
	ReturnObject extends boolean
> = Multiple extends true
	? ReturnObject extends true
		? T[]
		: V[]
	: ReturnObject extends true
		? T | null
		: V | null;

export type SelectBaseProps<
	T,
	V,
	Multiple extends boolean = false,
	ReturnObject extends boolean = false
> = {
	items: readonly T[];
	modelValue: SelectionValue<T, V, Multiple, ReturnObject>;
	multiple?: Multiple;
	returnObject?: ReturnObject;
	closeOnSelect?: boolean;
	labelKey?: SelectLabelKey<T>;
	valueKey?: SelectValueKey<T, V>;
	itemChildren?: SelectItemChildren<T>;
};
