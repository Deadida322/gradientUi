import type { ExtractPublicPropTypes, PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';
import { makeStateProps } from '@/use/state';

export const makeFileItemProps = propsFactory({
	...makeStateProps(),
	message: String,
	file: { type: Object as PropType<File>, required: true },
	src: String,
	removable: { type: Boolean, default: true },
	disabled: Boolean,
	removeLabel: { type: String, default: 'Remove file' }
} as const);

export type GFileItemProps = ExtractPublicPropTypes<
	ReturnType<typeof makeFileItemProps>
>;
export type GFileItemEmits = {
	remove: [file: File];
};
