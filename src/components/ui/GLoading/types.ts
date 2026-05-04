import type { GColor } from '@/use/color';
import type { GProgressView } from '@/components/ui/GProgress/types';
import { makeTransitionProps } from '@/use/transition';
import { propsFactory } from '@/utils/propsFactory';
import type { ExtractPropTypes, PropType } from 'vue';

export const makeLoadingProps = propsFactory({
	...makeTransitionProps(),
	text: String,
	noText: Boolean,
	show: Boolean,
	color: String as PropType<GColor>,
	dark: Boolean,
	opacity: [Number, String],
	blur: [Number, String],
	progressView: String as PropType<GProgressView>,
	onClose: Function as PropType<() => void>
});

export type GLoadingProps = ExtractPropTypes<
	ReturnType<typeof makeLoadingProps>
>;
