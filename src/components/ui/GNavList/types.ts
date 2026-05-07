import type { MdiIcon } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';
import { makeColorProps } from '@/use/color';
import { makeDisabledProps } from '@/use/disabled';
import { propsFactory } from '@/utils/propsFactory';
import type { RouteLocationRaw } from 'vue-router';
import type { ExtractPropTypes, PropType } from 'vue';

export type NavValue =
	| string
	| number
	| boolean
	| symbol
	| Record<string, unknown>
	| unknown[];

export type NavListAlign = 'start' | 'center' | 'end';
export type NavListPlacement = 'left' | 'right';
export type NavListIndicator = 'dot' | 'line';
export type NavListSurface = 'transparent' | 'glass';

export interface GNavListSlotProps<T = NavValue> {
	modelValue: T | undefined;
	select: (value: T) => void;
}

export interface GNavListSlots<T = NavValue> {
	default?: (props: GNavListSlotProps<T>) => unknown;
	header?: (props: GNavListSlotProps<T>) => unknown;
	footer?: (props: GNavListSlotProps<T>) => unknown;
}

export interface GNavItemSlotProps<T = NavValue> {
	selected: boolean;
	disabled: boolean;
	value: T | undefined;
	modelValue: T | undefined;
	isSelected: (value: T | undefined) => boolean;
	select: (value: T | undefined, event?: Event) => void;
}

export interface GNavItemSlots<T = NavValue> {
	default?: (props: GNavItemSlotProps<T>) => unknown;
	prepend?: (props: GNavItemSlotProps<T>) => unknown;
	append?: (props: GNavItemSlotProps<T>) => unknown;
}

export interface GNavGroupSlotProps<T = NavValue> {
	selected: boolean;
	open: boolean;
	disabled: boolean;
	value: T | undefined;
	modelValue: T | undefined;
	isSelected: (value: T | undefined) => boolean;
	select: (value: T | undefined, event?: Event) => void;
	toggle: () => void;
}

export interface GNavGroupSlots<T = NavValue> {
	label?: (props: GNavGroupSlotProps<T>) => unknown;
	append?: (props: GNavGroupSlotProps<T>) => unknown;
	default?: (props: GNavGroupSlotProps<T>) => unknown;
}

export type GNavListEmits<T = NavValue> = {
	'update:modelValue': [value: T | undefined];
	select: [value: T | undefined, event?: Event];
};

export const makeNavListProps = propsFactory({
	...makeColorProps(),
	modelValue: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			NavValue | undefined
		>,
		default: undefined
	},
	defaultValue: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			NavValue | undefined
		>,
		default: undefined
	},
	activeColor: {
		type: String as PropType<GColor | undefined>,
		default: undefined
	},
	placement: {
		type: String as PropType<NavListPlacement>,
		default: 'left'
	},
	align: {
		type: String as PropType<NavListAlign>,
		default: 'start'
	},
	indicator: {
		type: String as PropType<NavListIndicator>,
		default: 'line'
	},
	surface: {
		type: String as PropType<NavListSurface>,
		default: 'transparent'
	},
	width: {
		type: [String, Number],
		default: '100%'
	},
	ariaLabel: String
});

export const makeNavItemProps = propsFactory({
	...makeDisabledProps(),
	label: String,
	value: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			NavValue | undefined
		>,
		default: undefined
	},
	to: [String, Object] as PropType<RouteLocationRaw>,
	href: String,
	target: String,
	rel: String,
	prependIcon: String as PropType<MdiIcon>,
	appendIcon: String as PropType<MdiIcon>
});

export const makeNavGroupProps = propsFactory({
	...makeDisabledProps(),
	label: String,
	value: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			NavValue | undefined
		>,
		default: undefined
	},
	collapsible: {
		type: Boolean,
		default: false
	},
	defaultOpen: {
		type: Boolean,
		default: true
	},
	appendIcon: {
		type: String as PropType<MdiIcon>,
		default: 'chevron-down'
	}
});

export type GNavListProps = ExtractPropTypes<
	ReturnType<typeof makeNavListProps>
>;
export type GNavItemProps = ExtractPropTypes<
	ReturnType<typeof makeNavItemProps>
>;
export type GNavGroupProps = ExtractPropTypes<
	ReturnType<typeof makeNavGroupProps>
>;
