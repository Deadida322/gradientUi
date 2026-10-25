import type { FileComponentProps } from '@/use/file';
export type GImageInputProps<Multiple extends boolean = boolean> =
	FileComponentProps<Multiple>;
export type {
	GFileEmits,
	GFileSlots,
	FileInputValue,
	FileRejection
} from '@/use/file';
