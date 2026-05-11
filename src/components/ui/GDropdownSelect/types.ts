import type {
	SelectBaseProps,
	SelectItemChildren,
	SelectItemKey,
	SelectLabelKey,
	SelectValueKey
} from '@/use/select/types';
import type { SelectMenuItem } from '@/use/select/menuItems';

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

export interface DropdownSelectSlots<T, V> {
	trigger?: () => unknown;
	item?: (props: {
		item: SelectMenuItem<T, V>;
		selected: boolean;
	}) => unknown;
}
