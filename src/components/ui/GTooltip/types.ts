import { makeFloatingProps } from '@/use/floating';
import { propsFactory } from '@/utils/propsFactory';

export const makeTooltipProps = propsFactory({
	...makeFloatingProps(),
	openDelay: {
		type: Number,
		default: 0
	},
	closeDelay: {
		type: Number,
		default: 0
	}
} as const);

export type GTooltipProps = ReturnType<typeof makeTooltipProps>;
