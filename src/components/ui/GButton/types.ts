import type { MdiIcon, Sizes } from '@/types/CommonTypes';
import { makeDisabledProps } from '@/use/disabled';
import { makeGradientProps } from '@/use/gradient';
import { makeRoundedProps } from '@/use/rounded';
import { makePLAProps } from '@/use/PLA';
import { propsFactory } from '@/utils/propsFactory';
import { makeSizeProps } from '@/use/size';
import { makeVariantProps } from '@/use/variant';
import type { PropType } from 'vue';

export interface GButtonProps {
	variant?: GButtonVariants;
	active?: boolean;
	rounded?: boolean;
	color?: string;
	appendIcon?: MdiIcon;
	iconButton?: MdiIcon;
	prependIcon?: MdiIcon;
	label?: string;
	disabled?: boolean;
	size?: Sizes;
	isIconButton?: boolean;
}

export type GButtonVariants = 'tonal' | 'text' | 'outlined' | 'default';

export const makeButtonProps = propsFactory({
	...makeVariantProps(),
	...makePLAProps(),
	...makeGradientProps(),
	...makeSizeProps(),
	...makeDisabledProps(),
	...makeRoundedProps(),
	isIconButton: Boolean as PropType<boolean>,
	iconButton: String as PropType<MdiIcon>,
	color: String
});
