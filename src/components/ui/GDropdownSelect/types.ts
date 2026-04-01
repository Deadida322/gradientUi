import type {
	SelectBaseProps,
	SelectItemChildren,
	SelectItemKey,
	SelectLabelKey,
	SelectValueKey
} from '@/use/select/types';

export type DropdownSelectItemKey<T> = SelectItemKey<T>;
export type DropdownSelectLabelKey<T> = SelectLabelKey<T>;
export type DropdownSelectValueKey<T, V> = SelectValueKey<T, V>;
export type DropdownSelectItemChildren<T> = SelectItemChildren<T>;

export type DropdownSelectProps<
	T,
	V,
	Multiple extends boolean = false,
	ReturnObject extends boolean = false
> = SelectBaseProps<T, V, Multiple, ReturnObject>;
