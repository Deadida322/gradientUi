import { propsFactory } from '@/utils/propsFactory';
import { makeRoundedProps } from './rounded';
import { makeSizeProps } from './size';
import { makeVariantProps } from './variant';

export const makeActionProps = propsFactory({
	removable: Boolean,
	...makeVariantProps(),
	...makeSizeProps(),
	...makeRoundedProps()
});
