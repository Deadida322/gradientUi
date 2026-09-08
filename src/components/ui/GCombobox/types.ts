import type { PLASlots } from '@/types/CommonTypes';
import type { MdiIcon } from '@/types/CommonTypes';
import type { Sizes } from '@/types/CommonTypes';
import type { ValidationRule } from 'gib-validate';
import type { GColor } from '@/use/color';
import type { GlassProps } from '@/use/glass';
import type { GFieldVariant } from '@/use/form/props';
import type { StringeredNumber } from '@/types/CommonTypes';
import type { GGradienStates } from '../GGradient/types';
import type {
	InternalItem,
	SelectBaseProps,
	SelectionValue
} from '@/use/select/types';
import type { SelectMenuItem } from '@/use/select/menuItems';
import type {
	ComboboxFilter,
	ComboboxItemFromQuery
} from '@/use/select/comboboxController';

export type GComboboxItemFromQuery<T> = ComboboxItemFromQuery<T>;
export type GComboboxFilter<T, V> = ComboboxFilter<T, V>;

export type GComboboxProps<
	T,
	V,
	Multiple extends boolean = false,
	ReturnObject extends boolean = false
> = SelectBaseProps<T, V, Multiple, ReturnObject> & {
	label?: string;
	color?: GColor;
	variant?: GFieldVariant;
	backdropBlur?: GlassProps['backdropBlur'];
	borderWidth?: StringeredNumber;
	placeholder?: string;
	prependIcon?: MdiIcon;
	appendIcon?: MdiIcon;
	disabled?: boolean;
	clearable?: boolean;
	size?: Sizes;
	state?: GGradienStates;
	message?: string;
	rules?: ValidationRule<SelectionValue<T, V, Multiple, ReturnObject>>[];
	search?: string;
	allowCustom?: boolean;
	itemFromQuery?: GComboboxItemFromQuery<T>;
	filter?: GComboboxFilter<T, V>;
	chips?: boolean;
	addOnBlur?: boolean;
	noDataText?: string;
};

export interface GComboboxSlots<T, V> extends PLASlots {
	message?: () => unknown;
	selection?: (props: {
		selection: string;
		selectedItems: InternalItem<T, V>[];
		remove: (item: InternalItem<T, V>) => void;
	}) => unknown;
	chip?: (props: {
		item: InternalItem<T, V>;
		index: number;
		remove: (item: InternalItem<T, V>) => void;
	}) => unknown;
	item?: (props: {
		item: SelectMenuItem<T, V>;
		selected: boolean;
		query: string;
		custom: boolean;
	}) => unknown;
	noData?: (props: { query: string }) => unknown;
}
