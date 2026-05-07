import type { MdiIcon } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';
import { makeColorProps } from '@/use/color';
import { makeDisabledProps } from '@/use/disabled';
import { makeRoundedProps } from '@/use/rounded';
import { makeSizeProps } from '@/use/size';
import { propsFactory } from '@/utils/propsFactory';
import type { ExtractPropTypes, PropType } from 'vue';

export type GTabValue =
	| string
	| number
	| boolean
	| symbol
	| Record<string, unknown>
	| unknown[];

export type GTabsActivation = 'automatic' | 'manual';
export type GTabsOrientation = 'horizontal' | 'vertical';
export type GTabsVariant = 'line' | 'pill' | 'tonal';

export interface GTabsSlotProps<T = GTabValue> {
	modelValue: T | undefined;
	select: (value: T, event?: Event) => void;
}

export interface GTabsSlots<T = GTabValue> {
	default?: (props: GTabsSlotProps<T>) => unknown;
}

export interface GTabSlotProps<T = GTabValue> {
	selected: boolean;
	disabled: boolean;
	value: T | undefined;
	modelValue: T | undefined;
	select: (value: T | undefined, event?: Event) => void;
}

export interface GTabSlots<T = GTabValue> {
	default?: (props: GTabSlotProps<T>) => unknown;
	prepend?: (props: GTabSlotProps<T>) => unknown;
	append?: (props: GTabSlotProps<T>) => unknown;
}

export interface GTabPanelSlotProps<T = GTabValue> {
	selected: boolean;
	value: T | undefined;
	modelValue: T | undefined;
}

export interface GTabPanelSlots<T = GTabValue> {
	default?: (props: GTabPanelSlotProps<T>) => unknown;
}

export type GTabsEmits<T = GTabValue> = {
	'update:modelValue': [value: T | undefined];
	select: [value: T | undefined, event?: Event];
};

export const makeTabsProps = propsFactory({
	...makeColorProps(),
	...makeDisabledProps(),
	...makeRoundedProps(),
	...makeSizeProps(),
	modelValue: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			GTabValue | undefined
		>,
		default: undefined
	},
	defaultValue: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			GTabValue | undefined
		>,
		default: undefined
	},
	activeColor: {
		type: String as PropType<GColor | undefined>,
		default: undefined
	},
	activation: {
		type: String as PropType<GTabsActivation>,
		default: 'automatic'
	},
	orientation: {
		type: String as PropType<GTabsOrientation>,
		default: 'horizontal'
	},
	variant: {
		type: String as PropType<GTabsVariant>,
		default: 'line'
	},
	mandatory: {
		type: Boolean,
		default: true
	}
});

export const makeTabListProps = propsFactory({
	ariaLabel: String,
	grow: Boolean
});

export const makeTabProps = propsFactory({
	...makeDisabledProps(),
	label: String,
	value: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			GTabValue | undefined
		>,
		default: undefined
	},
	prependIcon: String as PropType<MdiIcon>,
	appendIcon: String as PropType<MdiIcon>
});

export const makeTabPanelsProps = propsFactory({
	transition: {
		type: Boolean,
		default: false
	}
});

export const makeTabPanelProps = propsFactory({
	value: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			GTabValue | undefined
		>,
		default: undefined
	},
	eager: Boolean
});

export type GTabsProps = ExtractPropTypes<ReturnType<typeof makeTabsProps>>;
export type GTabListProps = ExtractPropTypes<
	ReturnType<typeof makeTabListProps>
>;
export type GTabProps = ExtractPropTypes<ReturnType<typeof makeTabProps>>;
export type GTabPanelsProps = ExtractPropTypes<
	ReturnType<typeof makeTabPanelsProps>
>;
export type GTabPanelProps = ExtractPropTypes<
	ReturnType<typeof makeTabPanelProps>
>;
