import type { MdiIcon, PXtype } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';
import { makeColorProps } from '@/use/color';
import { makeDensityProps, type GDensity } from '@/use/density';
import { makeDisabledProps } from '@/use/disabled';
import {
	makeMaterialSurfaceProps,
	type MaterialSurfaceProps
} from '@/use/materialSurface';
import { makeRoundedProps } from '@/use/rounded';
import { makeSizeProps } from '@/use/size';
import type { GStateIconMap } from '@/use/stateIcon';
import { makeSurfaceTextureProps, type GSurfaceTexture } from '@/use/surface';
import { propsFactory } from '@/utils/propsFactory';
import type { ExtractPropTypes, PropType } from 'vue';
import type { GGradienStates } from '../GGradient/types';

export type GStepValue =
	| string
	| number
	| boolean
	| symbol
	| Record<string, unknown>
	| unknown[];

export type GStepperOrientation = 'horizontal' | 'vertical';
export type GStepperActivation = 'automatic' | 'manual';
export type GStepperVariant =
	| 'default'
	| 'tonal'
	| 'outlined'
	| 'glass'
	| 'text';
export type GStepperDividerVariant = 'solid' | 'dashed' | 'dotted' | 'gradient';
export interface GStepperDividerOptions {
	variant?: GStepperDividerVariant;
	thickness?: PXtype;
	length?: PXtype;
	color?: GColor;
	activeColor?: GColor;
}
export type GStepPanelVariant =
	| 'default'
	| 'tonal'
	| 'outlined'
	| 'glass'
	| 'gradient';
export type GStepperStepState =
	| 'pending'
	| 'active'
	| 'completed'
	| 'error'
	| 'disabled';
export type GStepperSemanticState = GGradienStates;
export type GStepperStepIconState =
	| GStepperStepState
	| GStepperSemanticState
	| 'loading';
export type GStepperIconMap = GStateIconMap<GStepperStepIconState>;

export interface GStepperItem<T = unknown, V = GStepValue> {
	value: V;
	title: string;
	subtitle?: string;
	icon?: MdiIcon;
	icons?: GStepperIconMap;
	state?: GStepperSemanticState;
	completed?: boolean;
	editable?: boolean;
	disabled?: boolean;
	error?: boolean;
	optional?: boolean;
	loading?: boolean;
	raw?: T;
}

export interface GStepperResolvedItem<
	T = unknown,
	V = GStepValue
> extends GStepperItem<T, V> {
	index: number;
	value: V;
}

export interface GStepperItemSlotProps<T = unknown, V = GStepValue> {
	item: GStepperResolvedItem<T, V>;
	index: number;
	selected: boolean;
	disabled: boolean;
	completed: boolean;
	state: GStepperStepState;
	semanticState: GStepperSemanticState | undefined;
	select: (value: V | undefined, event?: Event) => void;
}

export interface GStepperSlotProps<T = unknown, V = GStepValue> {
	modelValue: V | undefined;
	activeItem: GStepperResolvedItem<T, V> | undefined;
	activeIndex: number;
	items: GStepperResolvedItem<T, V>[];
	canPrev: boolean;
	canNext: boolean;
	isLast: boolean;
	select: (value: V | undefined, event?: Event) => void;
	next: (event?: Event) => void;
	prev: (event?: Event) => void;
	finish: (event?: Event) => void;
}

export interface GStepperSlots<T = unknown, V = GStepValue> {
	default?: (props: GStepperSlotProps<T, V>) => unknown;
	item?: (props: GStepperItemSlotProps<T, V>) => unknown;
	indicator?: (props: GStepperItemSlotProps<T, V>) => unknown;
	title?: (props: GStepperItemSlotProps<T, V>) => unknown;
	subtitle?: (props: GStepperItemSlotProps<T, V>) => unknown;
	panel?: (props: GStepperSlotProps<T, V>) => unknown;
	actions?: (props: GStepperSlotProps<T, V>) => unknown;
}

export interface GStepPanelSlotProps<T = unknown, V = GStepValue> {
	selected: boolean;
	value: V | undefined;
	modelValue: V | undefined;
	item: GStepperResolvedItem<T, V> | undefined;
	index: number;
}

export interface GStepPanelSurfaceProps extends MaterialSurfaceProps {
	color?: GColor;
	state?: GGradienStates;
	variant?: GStepPanelVariant;
	density?: GDensity;
	texture?: GSurfaceTexture;
	rounded?: boolean;
}

export interface GStepPanelSlots<T = unknown, V = GStepValue> {
	default?: (props: GStepPanelSlotProps<T, V>) => unknown;
}

export type GStepperActionsSlotProps<
	T = unknown,
	V = GStepValue
> = GStepperSlotProps<T, V>;

export interface GStepperActionsSlots<T = unknown, V = GStepValue> {
	default?: (props: GStepperActionsSlotProps<T, V>) => unknown;
	prev?: (props: GStepperActionsSlotProps<T, V>) => unknown;
	next?: (props: GStepperActionsSlotProps<T, V>) => unknown;
}

export type GStepperEmits<T = unknown, V = GStepValue> = {
	'update:modelValue': [value: V | undefined];
	select: [
		value: V | undefined,
		item: GStepperResolvedItem<T, V> | undefined,
		event?: Event
	];
	next: [
		value: V | undefined,
		item: GStepperResolvedItem<T, V> | undefined,
		event?: Event
	];
	prev: [
		value: V | undefined,
		item: GStepperResolvedItem<T, V> | undefined,
		event?: Event
	];
	finish: [
		value: V | undefined,
		item: GStepperResolvedItem<T, V> | undefined,
		event?: Event
	];
};

export const makeStepperProps = propsFactory({
	...makeColorProps(),
	...makeDisabledProps(),
	...makeRoundedProps(),
	...makeSizeProps(),
	modelValue: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			GStepValue | undefined
		>,
		default: undefined
	},
	defaultValue: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			GStepValue | undefined
		>,
		default: undefined
	},
	items: {
		type: Array as PropType<readonly GStepperItem[]>,
		default: () => []
	},
	activeColor: {
		type: String as PropType<GColor | undefined>,
		default: undefined
	},
	divider: {
		type: Boolean,
		default: true
	},
	dividerOptions: {
		type: Object as PropType<GStepperDividerOptions | undefined>,
		default: undefined
	},
	activation: {
		type: String as PropType<GStepperActivation>,
		default: 'manual'
	},
	orientation: {
		type: String as PropType<GStepperOrientation>,
		default: 'horizontal'
	},
	variant: {
		type: String as PropType<GStepperVariant>,
		default: 'default'
	},
	linear: {
		type: Boolean,
		default: true
	},
	editable: {
		type: Boolean,
		default: false
	},
	mandatory: {
		type: Boolean,
		default: true
	},
	altLabels: Boolean,
	hideActions: Boolean,
	prevText: {
		type: String,
		default: 'Back'
	},
	nextText: {
		type: String,
		default: 'Next'
	},
	finishText: {
		type: String,
		default: 'Finish'
	}
});

export const makeStepPanelProps = propsFactory({
	...makeMaterialSurfaceProps({
		borderRadius: 12,
		borderWidth: undefined,
		color: undefined,
		placement: 'center'
	}),
	...makeDensityProps(),
	...makeSurfaceTextureProps(),
	value: {
		type: [String, Number, Boolean, Object, Array, Symbol] as PropType<
			GStepValue | undefined
		>,
		default: undefined
	},
	variant: {
		type: String as PropType<GStepPanelVariant>,
		default: 'tonal'
	},
	color: {
		type: String as PropType<GColor | undefined>,
		default: undefined
	},
	state: String as PropType<GGradienStates>,
	eager: Boolean
});

export const makeStepperActionsProps = propsFactory({
	prevText: String,
	nextText: String,
	finishText: String
});

export type GStepperProps = ExtractPropTypes<
	ReturnType<typeof makeStepperProps>
>;
export type GStepPanelProps = ExtractPropTypes<
	ReturnType<typeof makeStepPanelProps>
>;
export type GStepperActionsProps = ExtractPropTypes<
	ReturnType<typeof makeStepperActionsProps>
>;
