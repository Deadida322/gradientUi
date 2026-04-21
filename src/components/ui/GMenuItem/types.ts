import { makeDisabledProps } from '@/use/disabled';
import { makeColorProps } from '@/use/color';
import { makeHighlightedProps } from '@/use/highlighted';
import { makeSelectedProps } from '@/use/selected';
import { makePLAProps } from '@/use/PLA';
import { propsFactory } from '@/utils/propsFactory';
import type { GGradienStates } from '@/use/gradient';
import type { GMenuItemBase } from '@/use/menu';
import type { ExtractPropTypes, PropType } from 'vue';

export const makeMenuItemProps = propsFactory({
	...makePLAProps(),
	...makeColorProps(),
	...makeDisabledProps(),
	...makeHighlightedProps(),
	...makeSelectedProps(),
	item: {
		type: Object as PropType<GMenuItemBase | undefined>,
		default: undefined
	},
	isActive: {
		type: Function as PropType<(item: GMenuItemBase) => boolean>,
		default: undefined
	},
	state: {
		type: String as PropType<GGradienStates>,
		default: undefined
	}
});

export type MenuItemProps = ExtractPropTypes<
	ReturnType<typeof makeMenuItemProps>
>;
