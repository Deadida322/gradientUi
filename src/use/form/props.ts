import type { GGradienStates } from '@/components/ui/GGradient/types';
import type { MdiIcon } from '@/types/CommonTypes';
import type { ValidationRule } from 'gib-validate';
import { makeColorProps } from '@/use/color';
import { makeGlassProps } from '@/use/glass';
import { makeSizeProps } from '@/use/size';
import type { GVariant } from '@/use/variant';
import { propsFactory } from '@/utils/propsFactory';
import type { PropType } from 'vue';
import type { StringeredNumber } from '@/types/CommonTypes';

export type GFieldVariant = Exclude<GVariant, 'gradient'>;

export const makeFieldVariantProps = propsFactory({
	variant: {
		type: String as PropType<GFieldVariant>,
		default: 'default'
	}
});

export const makeFieldFrameProps = propsFactory({
	borderWidth: [Number, String] as PropType<StringeredNumber>
});

export const makePLAFieldProps = propsFactory({
	...makeColorProps(),
	...makeFieldVariantProps(),
	...makeGlassProps(),
	...makeFieldFrameProps(),
	label: String,
	prependIcon: String as PropType<MdiIcon>,
	appendIcon: String as PropType<MdiIcon>
});

export const makeFieldStateProps = propsFactory({
	state: String as PropType<GGradienStates>,
	message: String
});

export const makeFieldSizeProps = propsFactory({
	...makeSizeProps()
});

export function makeValidationProps<T = string>() {
	return propsFactory({
		rules: {
			type: Array as PropType<ValidationRule<T>[]>,
			default: () => []
		}
	})();
}
