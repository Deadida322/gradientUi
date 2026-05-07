import type { PLASlots } from '@/types/CommonTypes';
import type { MdiIcon } from '@/types/CommonTypes';
import type { Sizes } from '@/types/CommonTypes';
import type { ValidationRule } from 'gib-validate';
import type { GColor } from '@/use/color';
import type { GGradienStates } from '../GGradient/types';
import type {
	InternalItem,
	SelectBaseProps,
	SelectionValue
} from '@/use/select/types';
import type { SelectMenuItem } from '@/use/select/menuItems';

export type GSelectProps<
	T,
	V,
	Multiple extends boolean = false,
	ReturnObject extends boolean = false
> = SelectBaseProps<T, V, Multiple, ReturnObject> & {
	label?: string;
	color?: GColor;
	placeholder?: string;
	prependIcon?: MdiIcon;
	appendIcon?: MdiIcon;
	disabled?: boolean;
	clearable?: boolean;
	size?: Sizes;
	state?: GGradienStates;
	message?: string;
	rules?: ValidationRule<SelectionValue<T, V, Multiple, ReturnObject>>[];
};

export interface GSelectSlots<T, V> extends PLASlots {
	message?: () => unknown;
	selection?: (props: {
		selection: string;
		selectedItems: InternalItem<T, V>[];
	}) => unknown;
	item?: (props: {
		item: SelectMenuItem<T, V>;
		selected: boolean;
	}) => unknown;
}
