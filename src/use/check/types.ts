import type { GGradienStates } from '@/components/ui/GGradient/types';
import type { Sizes } from '@/types/CommonTypes';
import type {
	SelectionComparatorValue,
	SelectionValue,
	SelectionValueComparator,
	SelectLabelKey,
	SelectValueKey
} from '@/use/select/types';
import type { ValidationRule } from 'gib-validate';
import { makeColorProps, type GColor } from '@/use/color';
import { propsFactory } from '@/utils/propsFactory';
import type { PropType } from 'vue';

export interface CheckFieldProps {
	id?: string;
	name?: string;
	label?: string;
	color?: GColor;
	disabled?: boolean;
	size?: Sizes;
	state?: GGradienStates;
	indicatorView?: CheckIndicatorView;
	message?: string;
	inline?: boolean;
}

export type CheckIndicatorView =
	| 'default'
	| 'squircle'
	| 'diamond'
	| 'soft'
	| 'blob'
	| 'cut-corner';

export interface CheckOption<T> {
	label: string;
	value: T;
	disabled?: boolean;
}

export interface CheckboxProps extends CheckFieldProps {
	rules?: ValidationRule<boolean>[];
}

export interface SwitchProps extends CheckFieldProps {
	rules?: ValidationRule<boolean>[];
}

export interface SelectionGroupProps<TModel> extends CheckFieldProps {
	vertical?: boolean;
	rules?: ValidationRule<TModel>[];
}

export interface CheckOptionItemSlotProps<T> {
	item: T;
	checked: boolean;
}

export type CheckComparatorValue<TModel> = SelectionComparatorValue<TModel>;

export type CheckValueComparator<TModel> = SelectionValueComparator<TModel>;

export type CheckSelectionProps<
	T,
	V,
	Multiple extends boolean,
	ReturnObject extends boolean
> = SelectionGroupProps<SelectionValue<T, V, Multiple, ReturnObject>> & {
	modelValue: SelectionValue<T, V, Multiple, ReturnObject>;
	options: readonly T[];
	name?: string;
	labelKey?: SelectLabelKey<T>;
	valueKey?: SelectValueKey<T, V>;
	returnObject?: ReturnObject;
	valueComparator?: CheckValueComparator<
		SelectionValue<T, V, Multiple, ReturnObject>
	>;
};

export const makeCheckFieldProps = propsFactory({
	...makeColorProps(),
	id: String,
	name: String,
	label: String,
	disabled: Boolean,
	size: {
		type: String as PropType<Sizes>,
		default: 'm'
	},
	state: String as PropType<GGradienStates>,
	indicatorView: {
		type: String as PropType<CheckIndicatorView>,
		default: 'default'
	},
	message: String,
	inline: Boolean
});

export const makeCheckGroupVisualProps = propsFactory({
	...makeColorProps(),
	label: String,
	message: String,
	disabled: Boolean,
	size: {
		type: String as PropType<Sizes>,
		default: 'm'
	},
	state: String as PropType<GGradienStates>,
	indicatorView: {
		type: String as PropType<CheckIndicatorView>,
		default: 'default'
	},
	vertical: Boolean,
	focused: Boolean
});

export const makeCheckControlBaseProps = propsFactory({
	...makeCheckFieldProps({
		disabled: false,
		size: 'm',
		inline: false
	}),
	inputType: {
		type: String as PropType<'checkbox' | 'radio'>,
		required: true
	},
	checked: Boolean,
	focused: Boolean
});

export const makeCheckGroupBaseProps = propsFactory({
	...makeCheckGroupVisualProps({
		disabled: false,
		size: 'm',
		vertical: false,
		focused: false
	})
});

export function makeCheckBooleanControlProps() {
	return propsFactory({
		...makeCheckFieldProps({
			disabled: false,
			size: 'm',
			inline: false
		}),
		rules: {
			type: Array as PropType<ValidationRule<boolean>[]>,
			default: () => []
		}
	})();
}

export interface CheckControlSlots {
	default?: () => unknown;
	message?: () => unknown;
}

export interface CheckGroupSlots {
	default?: () => unknown;
	label?: () => unknown;
	message?: () => unknown;
}

export interface CheckOptionGroupSlots<T> extends CheckGroupSlots {
	item?: (props: CheckOptionItemSlotProps<T>) => unknown;
}

export type CheckControlEmits<T> = {
	change: [value: T, event: Event];
	focus: [event: FocusEvent];
	blur: [event: FocusEvent];
};

export type CheckGroupEmits<T> = {
	'update:modelValue': [value: T];
	change: [value: T, event: Event];
	focus: [event: FocusEvent];
	blur: [event: FocusEvent];
};

export type CheckGroupRootEmits = {
	focusin: [event: FocusEvent];
	focusout: [event: FocusEvent];
	pointerdown: [event: PointerEvent];
	pointerup: [event: PointerEvent];
	pointercancel: [event: PointerEvent];
};

export type CheckControlRootEmits = CheckGroupRootEmits;
