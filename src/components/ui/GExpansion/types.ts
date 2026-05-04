import type { MdiIcon } from '@/types/CommonTypes';
import { makeColorProps } from '@/use/color';
import { makeDisabledProps } from '@/use/disabled';
import type {
	GGradienPositions,
	GGradienStates
} from '@/components/ui/GGradient/types';
import { makeRoundedProps } from '@/use/rounded';
import { makeSizeProps } from '@/use/size';
import { makeTransitionProps } from '@/use/transition';
import { makeVariantProps } from '@/use/variant';
import { propsFactory } from '@/utils/propsFactory';
import type { ExtractPropTypes, PropType } from 'vue';
import type { GGlow } from '@/use/gradient';

export type ExpansionValue =
	| string
	| number
	| boolean
	| symbol
	| Record<string, unknown>
	| unknown[];

export interface GExpansionSlotProps<T = unknown> {
	expanded: boolean;
	disabled: boolean;
	readonly: boolean;
	value: T | undefined;
	toggle: () => void;
}

export interface GExpansionSlots<T = unknown> {
	default?: (props: GExpansionSlotProps<T>) => unknown;
	title?: (props: GExpansionSlotProps<T>) => unknown;
	text?: (props: GExpansionSlotProps<T>) => unknown;
	actions?: (props: GExpansionSlotProps<T>) => unknown;
}

export type GExpansionEmits = {
	'update:modelValue': [value: boolean];
	click: [event: MouseEvent];
};

export const makeExpansionProps = propsFactory({
	...makeDisabledProps(),
	...makeRoundedProps(),
	...makeSizeProps(),
	...makeVariantProps(),
	...makeColorProps(),
	...makeTransitionProps(),
	title: String,
	text: String,
	modelValue: {
		type: Boolean as PropType<boolean | undefined>,
		default: undefined
	},
	defaultOpen: Boolean,
	value: {
		type: [
			String,
			Number,
			Boolean,
			Object,
			Array
		] as PropType<ExpansionValue>,
		default: undefined
	},
	readonly: Boolean,
	hideActions: Boolean,
	openedIcon: String as PropType<MdiIcon>,
	closedIcon: String as PropType<MdiIcon>,
	eager: Boolean,
	borderWidth: [Number, String],
	glow: [Boolean, Number, String] as PropType<GGlow>,
	animateGlow: Boolean,
	shadow: Boolean,
	state: String as PropType<GGradienStates>,
	placement: String as PropType<GGradienPositions>,
	activeBorderWidth: [Number, String],
	activeGlow: {
		type: [Boolean, Number, String] as PropType<GGlow | undefined>,
		default: undefined
	},
	activeAnimateGlow: {
		type: Boolean as PropType<boolean | undefined>,
		default: undefined
	},
	activeShadow: {
		type: Boolean as PropType<boolean | undefined>,
		default: undefined
	},
	activeState: {
		type: String as PropType<GGradienStates | undefined>,
		default: undefined
	},
	activePlacement: {
		type: String as PropType<GGradienPositions | undefined>,
		default: undefined
	}
});

export type GExpansionProps = ExtractPropTypes<
	ReturnType<typeof makeExpansionProps>
>;
