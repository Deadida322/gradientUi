import { type Sizes } from '@/types/CommonTypes';
import { makeColorProps } from '@/use/color';
import { makeRoundedProps } from '@/use/rounded';
import { makeSizeProps } from '@/use/size';
import { makeStateProps } from '@/use/state';
import { propsFactory } from '@/utils/propsFactory';
import type { GColor } from '@/use/color';
import type { GGradienStates } from '../GGradient/types';
import type { ExtractPropTypes, PropType } from 'vue';

export type GProgressLabelAlign = 'start' | 'center' | 'end';
export type GProgressView = 'default' | 'striped' | 'segmented' | 'glow';

export interface GProgressProps {
	rounded?: boolean;
	color?: GColor;
	state?: GGradienStates;
	modelValue?: number;
	indeterminate?: boolean;
	noLabel?: boolean;
	size?: Sizes;
	label?: string;
	labelAlign?: GProgressLabelAlign;
	view?: GProgressView;
	segments?: number;
}

export const makeProgressProps = propsFactory({
	...makeColorProps(),
	...makeRoundedProps(),
	...makeSizeProps(),
	...makeStateProps(),
	modelValue: {
		type: Number,
		default: 0
	},
	indeterminate: Boolean,
	noLabel: Boolean,
	label: String,
	labelAlign: {
		type: String as PropType<GProgressLabelAlign>,
		default: 'center'
	},
	view: {
		type: String as PropType<GProgressView>,
		default: 'default'
	},
	segments: {
		type: Number,
		default: 12
	}
});

export type GProgressFactoryProps = ExtractPropTypes<
	ReturnType<typeof makeProgressProps>
>;
