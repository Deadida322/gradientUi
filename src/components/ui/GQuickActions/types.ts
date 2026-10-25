import type { MdiIcon, option } from '@/types/CommonTypes';
import type {
	GFABLabelPlacement,
	GFABLocation,
	GFABPosition
} from '../GFAB/types';
import type { GTransitionValue } from '@/use/transition';
import { makeTransitionProps } from '@/use/transition';
import type { PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';

export interface GQuickActionsOption extends option {
	icon: MdiIcon;
	disabled?: boolean;
}

export type GQuickActionsEmits = {
	'update:modelValue': [value: boolean];
	select: [option: GQuickActionsOption, index: number, event: MouseEvent];
	open: [];
	close: [];
};

export type GQuickActionsDirection = 'top' | 'right' | 'bottom' | 'left';

export interface GQuickActionsProps {
	modelValue?: boolean;
	defaultOpen?: boolean;
	openOnClick?: boolean;
	openOnHover?: boolean;
	openOnFocus?: boolean;
	closeOnSelect?: boolean;
	options?: GQuickActionsOption[];
	icon: MdiIcon;
	activeIcon: MdiIcon;
	contained?: boolean;
	position?: GFABPosition;
	location?: GFABLocation;
	direction?: GQuickActionsDirection;
	transition?: GTransitionValue;
	offset?: number | string;
	labelPlacement?: GFABLabelPlacement;
}

export const makeQuickActionsProps = propsFactory({
	...makeTransitionProps(),
	modelValue: { type: Boolean, default: undefined },
	defaultOpen: Boolean,
	openOnClick: { type: Boolean, default: true },
	openOnHover: Boolean,
	openOnFocus: Boolean,
	closeOnSelect: Boolean,
	options: {
		type: Array as PropType<GQuickActionsOption[]>,
		default: () => []
	},
	icon: { type: String as PropType<MdiIcon>, required: true },
	activeIcon: { type: String as PropType<MdiIcon>, required: true },
	contained: Boolean,
	position: { type: String as PropType<GFABPosition>, default: 'fixed' },
	location: {
		type: String as PropType<GFABLocation>,
		default: 'bottom-right'
	},
	direction: String as PropType<GQuickActionsDirection>,
	offset: { type: [Number, String], default: 24 },
	labelPlacement: String as PropType<GFABLabelPlacement>
} as const);
