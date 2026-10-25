import type { GGradienStates } from '@/use/gradient';

export type FileValue<Multiple extends boolean = boolean> =
	Multiple extends true ? File[] : File | null;
export type FileInputValue = FileValue<boolean>;
export interface FileSelectionResult {
	accepted: readonly File[];
	rejected: readonly FileRejection[];
	nextValue: FileInputValue;
}
export interface FileEntry {
	id: string;
	file: File;
	url?: string;
}

export type FileRejectionCode =
	| 'type'
	| 'size'
	| 'count'
	| 'image'
	| 'dimensions';
export interface FileRejection {
	file: File;
	code: FileRejectionCode;
}
export interface FileChange<Multiple extends boolean = boolean> {
	value: FileValue<Multiple>;
	source: 'picker' | 'drop' | 'remove' | 'clear';
}
export type GFileEmits<Multiple extends boolean = boolean> = {
	'update:modelValue': [value: FileValue<Multiple>];
	change: [change: FileChange<Multiple>];
	reject: [rejections: FileRejection[]];
	remove: [file: File];
	clear: [];
	focus: [event: FocusEvent];
	blur: [event: FocusEvent];
};
export interface FilePreview {
	file: File;
	url: string;
}
export interface GFileSlots {
	rejection?: (props: {
		rejection: FileRejection;
		message: string;
		error: true;
	}) => unknown;
	default?: () => unknown;
	prepend?: () => unknown;
	append?: () => unknown;
	message?: () => unknown;
	selection?: (
		props: GFileSlotState & {
			files: readonly File[];
			open: () => void;
		}
	) => unknown;
	file?: (
		props: GFileSlotState & { file: File; url?: string; remove: () => void }
	) => unknown;
	trigger?: (
		props: GFileSlotState & { open: () => void; disabled: boolean }
	) => unknown;
	icon?: (props: GFileSlotState) => unknown;
	background?: (
		props: GFileSlotState & {
			file: File;
			url?: string;
			remove: () => void;
		}
	) => unknown;
}

export interface GFileSlotState {
	error: boolean;
	state?: GGradienStates;
}
