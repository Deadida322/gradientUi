import type { MdiIcon } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';
import { makeColorProps } from '@/use/color';
import { makeDisabledProps } from '@/use/disabled';
import { propsFactory } from '@/utils/propsFactory';
import type { ExtractPropTypes, PropType } from 'vue';

export type NavbarValue =
	| string
	| number
	| boolean
	| symbol
	| Record<string, unknown>
	| unknown[];

export type NavbarDensity = 'comfortable' | 'compact' | 'prominent';

export interface GNavbarSlotProps<T = NavbarValue> {
	modelValue: T | undefined;
	select: (value: T) => void;
}

export interface GNavbarSlots<T = NavbarValue> {
	default?: (props: GNavbarSlotProps<T>) => unknown;
	prepend?: (props: GNavbarSlotProps<T>) => unknown;
	append?: (props: GNavbarSlotProps<T>) => unknown;
}

export interface GNavbarItemSlotProps<T = NavbarValue> {
	selected: boolean;
	disabled: boolean;
	value: T | undefined;
	modelValue: T | undefined;
	isSelected: (value: T | undefined) => boolean;
	select: (value: T | undefined, event?: Event) => void;
	closeDropdown: () => void;
}

export interface GNavbarItemSlots<T = NavbarValue> {
	default?: (props: GNavbarItemSlotProps<T>) => unknown;
	prepend?: (props: GNavbarItemSlotProps<T>) => unknown;
	append?: (props: GNavbarItemSlotProps<T>) => unknown;
}

export interface GNavbarGroupSlots<
	T = NavbarValue
> extends GNavbarItemSlots<T> {
	dropdown?: (props: GNavbarItemSlotProps<T>) => unknown;
}

export type GNavbarEmits<T = NavbarValue> = {
	'update:modelValue': [value: T | undefined];
	select: [value: T | undefined, event?: Event];
};

export const makeNavbarProps = propsFactory({
	...makeColorProps(),
	modelValue: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			NavbarValue | undefined
		>,
		default: undefined
	},
	defaultValue: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			NavbarValue | undefined
		>,
		default: undefined
	},
	activeColor: {
		type: String as PropType<GColor | undefined>,
		default: undefined
	},
	hideOnScroll: Boolean,
	density: {
		type: String as PropType<NavbarDensity>,
		default: 'comfortable'
	},
	elevated: Boolean,
	ariaLabel: String
});

export const makeNavbarItemProps = propsFactory({
	...makeDisabledProps(),
	label: String,
	value: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			NavbarValue | undefined
		>,
		default: undefined
	},
	href: String,
	target: String,
	rel: String,
	prependIcon: String as PropType<MdiIcon>,
	appendIcon: String as PropType<MdiIcon>,
	openedIcon: {
		type: String as PropType<MdiIcon>,
		default: 'chevron-down'
	},
	closedIcon: {
		type: String as PropType<MdiIcon>,
		default: 'chevron-down'
	},
	exact: Boolean
});

export const makeNavbarGroupProps = propsFactory({
	...makeNavbarItemProps(),
	closeOnSelect: {
		type: Boolean,
		default: true
	}
});

export const makeNavbarSubItemProps = propsFactory({
	...makeDisabledProps(),
	label: String,
	value: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			NavbarValue | undefined
		>,
		default: undefined
	},
	href: String,
	target: String,
	rel: String,
	prependIcon: String as PropType<MdiIcon>,
	appendIcon: String as PropType<MdiIcon>
});

export type GNavbarProps = ExtractPropTypes<ReturnType<typeof makeNavbarProps>>;
export type GNavbarItemProps = ExtractPropTypes<
	ReturnType<typeof makeNavbarItemProps>
>;
export type GNavbarGroupProps = ExtractPropTypes<
	ReturnType<typeof makeNavbarGroupProps>
>;
export type GNavbarSubItemProps = ExtractPropTypes<
	ReturnType<typeof makeNavbarSubItemProps>
>;
