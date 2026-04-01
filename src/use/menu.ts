import type { PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';
import type { GGradienStates } from './gradient';

export interface GMenuItemBase {
	id?: string | number;
	disabled?: boolean;
	title?: string;
	label?: string;
	value?: unknown;
	children?: GMenuItemBase[];
}
export const GMenuEmits = {
	select: (_item: GMenuItemBase) => true,
	hover: (_item: GMenuItemBase) => true
};

export const makeGMenuProps = propsFactory({
	items: {
		type: Array as PropType<GMenuItemBase[]>,
		default: () => []
	},

	isSelected: {
		type: Function as PropType<(item: GMenuItemBase) => boolean>,
		default: undefined
	},

	isHighlighted: {
		type: Function as PropType<(item: GMenuItemBase) => boolean>,
		default: undefined
	},

	state: {
		type: String as PropType<GGradienStates>,
		default: undefined
	}
});
