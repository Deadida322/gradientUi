import type { ExtractPublicPropTypes, PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';
import type { MdiIcon } from '@/types/CommonTypes';
import type { GButtonProps } from '@/components/ui/GButton/types';
import {
	makePLAFieldProps,
	makeFieldSizeProps,
	makeFieldStateProps,
	makeValidationProps
} from '@/use/form/props';

import type { FileInputValue, FileRejection, FileValue } from './types';
export type { FileInputValue } from './types';
export const makeFileSelectionProps = propsFactory({
	modelValue: {
		type: [Object, Array] as PropType<FileInputValue>,
		default: null
	},
	multiple: Boolean,
	disabled: Boolean,
	readonly: Boolean,
	clearable: { type: Boolean, default: true },
	accept: String,
	name: String,
	form: String,
	formatRejection: Function as PropType<(rejection: FileRejection) => string>,
	capture: String as PropType<'user' | 'environment'>,
	maxFiles: Number,
	maxFileSize: Number,
	selectionMode: {
		type: String as PropType<'replace' | 'append'>,
		default: 'replace'
	}
});

export const makeImageFileProps = propsFactory({
	minImageWidth: Number,
	maxImageWidth: Number,
	minImageHeight: Number,
	maxImageHeight: Number
});

export const makeFileFieldProps = propsFactory({
	...makePLAFieldProps(),
	...makeFieldSizeProps(),
	...makeFieldStateProps(),
	...makeValidationProps<FileInputValue>(),
	placeholder: String
});

export const makeFileDropzoneProps = propsFactory({
	icon: { type: String as PropType<MdiIcon>, default: 'plus' },
	buttonProps: Object as PropType<
		Pick<GButtonProps, 'variant' | 'color' | 'size' | 'rounded'>
	>,
	browseLabel: { type: String, default: 'Choose files' },
	removeLabel: { type: String, default: 'Remove file' },
	clearLabel: { type: String, default: 'Clear files' }
});

// Compatibility aggregate for existing consumers; internal responsibilities remain separate.
export const makeFileProps = propsFactory({
	...makeFileSelectionProps(),
	...makeImageFileProps(),
	...makeFileFieldProps(),
	...makeFileDropzoneProps()
});

export type FileComponentProps<Multiple extends boolean = boolean> = Omit<
	ExtractPublicPropTypes<ReturnType<typeof makeFileProps>>,
	'modelValue' | 'multiple'
> & {
	multiple?: Multiple;
	modelValue?: FileValue<Multiple>;
};
