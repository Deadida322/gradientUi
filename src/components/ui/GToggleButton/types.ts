import type { MdiIcon, Sizes } from '@/types/CommonTypes';
import type { GGradienStates } from '../GGradient/types';
import type { ValidationRule } from '@/use/validation';
import { makeCheckFieldProps } from '@/use/check';
import { makeColorProps } from '@/use/color';
import { makeRoundedProps } from '@/use/rounded';
import { propsFactory } from '@/utils/propsFactory';
import { makeVariantProps, type GVariant } from '@/use/variant';
import type { PropType } from 'vue';

export interface GToggleButtonProps {
	id?: string;
	label?: string;
	message?: string;
	disabled?: boolean;
	size?: Sizes;
	state?: GGradienStates;
	activeVariant?: GVariant;
	inline?: boolean;
	color?: string;
	variant?: GVariant;
	rounded?: boolean;
	prepend?: MdiIcon;
	append?: MdiIcon;
	rules?: ValidationRule<boolean>[];
}

export interface GToggleButtonSlots {
	default?: () => unknown;
	prepend?: () => unknown;
	append?: () => unknown;
	message?: () => unknown;
}

export const makeToggleButtonProps = propsFactory({
	...makeCheckFieldProps({
		disabled: false,
		size: 'm',
		inline: false
	}),
	...makeColorProps(),
	...makeVariantProps(),
	...makeRoundedProps(),
	activeVariant: String as PropType<GVariant>,
	prepend: String as PropType<MdiIcon>,
	append: String as PropType<MdiIcon>,
	rules: {
		type: Array as PropType<ValidationRule<boolean>[]>,
		default: () => []
	}
});
