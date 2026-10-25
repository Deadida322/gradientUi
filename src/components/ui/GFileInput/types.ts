import type { FileComponentProps } from '@/use/file';
export type GFileInputProps<Multiple extends boolean = boolean> =
	FileComponentProps<Multiple>;
export type {
	GFileEmits,
	GFileSlots,
	FileInputValue,
	FileRejection
} from '@/use/file';
