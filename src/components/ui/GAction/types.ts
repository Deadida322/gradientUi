import { makeDisabledProps } from '@/use/disabled';
import { makeSizeProps } from '@/use/size';
import { makeVariantProps } from '@/use/variant';
import { propsFactory } from '@/utils/propsFactory';

export const makeActionProps = propsFactory({
	...makeSizeProps(),
	...makeDisabledProps(),
	...makeVariantProps()
});
