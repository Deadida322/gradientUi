import type { MdiIcon } from '@/types/CommonTypes';
import type { RouterTo } from '@/use/routerLink';
import type { GColor } from '@/use/color';
import { makeColorProps } from '@/use/color';
import { makeDisabledProps } from '@/use/disabled';
import { propsFactory } from '@/utils/propsFactory';
import type { ExtractPropTypes, PropType } from 'vue';
import { makeGlassProps } from '@/use/glass';

export type AsideValue =
	| string
	| number
	| boolean
	| symbol
	| Record<string, unknown>
	| unknown[];

export type AsideAlign = 'start' | 'center' | 'end';
export type AsidePlacement = 'left' | 'right';
export type AsidePosition = 'static' | 'absolute' | 'fixed';
export type AsideIndicator = 'dot' | 'line';
export type AsideSurface = 'transparent' | 'glass';

export interface GAsideSlotProps<T = AsideValue> {
	modelValue: T | undefined;
	select: (value: T) => void;
}

export interface GAsideSlots<T = AsideValue> {
	default?: (props: GAsideSlotProps<T>) => unknown;
	header?: (props: GAsideSlotProps<T>) => unknown;
	footer?: (props: GAsideSlotProps<T>) => unknown;
}

export interface GAsideItemSlotProps<T = AsideValue> {
	selected: boolean;
	disabled: boolean;
	value: T | undefined;
	modelValue: T | undefined;
	isSelected: (value: T | undefined) => boolean;
	select: (value: T | undefined, event?: Event) => void;
}

export interface GAsideItemSlots<T = AsideValue> {
	default?: (props: GAsideItemSlotProps<T>) => unknown;
	prepend?: (props: GAsideItemSlotProps<T>) => unknown;
	append?: (props: GAsideItemSlotProps<T>) => unknown;
}

export interface GAsideGroupSlotProps<T = AsideValue> {
	selected: boolean;
	open: boolean;
	disabled: boolean;
	value: T | undefined;
	modelValue: T | undefined;
	isSelected: (value: T | undefined) => boolean;
	select: (value: T | undefined, event?: Event) => void;
	toggle: () => void;
}

export interface GAsideGroupSlots<T = AsideValue> {
	label?: (props: GAsideGroupSlotProps<T>) => unknown;
	append?: (props: GAsideGroupSlotProps<T>) => unknown;
	default?: (props: GAsideGroupSlotProps<T>) => unknown;
}

export type GAsideEmits<T = AsideValue> = {
	'update:modelValue': [value: T | undefined];
	select: [value: T | undefined, event?: Event];
};

export const makeAsideProps = propsFactory({
	...makeGlassProps(),
	...makeColorProps(),
	modelValue: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			AsideValue | undefined
		>,
		default: undefined
	},
	defaultValue: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			AsideValue | undefined
		>,
		default: undefined
	},
	activeColor: {
		type: String as PropType<GColor | undefined>,
		default: undefined
	},
	placement: {
		type: String as PropType<AsidePlacement>,
		default: 'right'
	},
	align: {
		type: String as PropType<AsideAlign>,
		default: 'end'
	},
	position: {
		type: String as PropType<AsidePosition>,
		default: 'static'
	},
	indicator: {
		type: String as PropType<AsideIndicator>,
		default: 'line'
	},
	surface: {
		type: String as PropType<AsideSurface>,
		default: 'transparent'
	},
	radius: {
		type: [String, Number] as PropType<string | number | undefined>,
		default: undefined
	},
	top: [String, Number],
	offset: [String, Number],
	width: [String, Number],
	ariaLabel: String
});

export const makeAsideItemProps = propsFactory({
	...makeDisabledProps(),
	label: String,
	value: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			AsideValue | undefined
		>,
		default: undefined
	},
	to: [String, Object] as PropType<RouterTo>,
	href: String,
	target: String,
	rel: String,
	prependIcon: String as PropType<MdiIcon>,
	appendIcon: String as PropType<MdiIcon>
});

export const makeAsideGroupProps = propsFactory({
	...makeDisabledProps(),
	label: String,
	value: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			AsideValue | undefined
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

export type GAsideProps = ExtractPropTypes<ReturnType<typeof makeAsideProps>>;
export type GAsideItemProps = ExtractPropTypes<
	ReturnType<typeof makeAsideItemProps>
>;
export type GAsideGroupProps = ExtractPropTypes<
	ReturnType<typeof makeAsideGroupProps>
>;
