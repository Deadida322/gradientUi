import type { PLAProps } from '@/CommonTypes';

export interface GTextProps extends PLAProps {
	tagName?: string;
	label?: string;
	type?: TextType;
}

export type TextType =
	| 'h-1'
	| 'h-2'
	| 'h-3'
	| 'h-4'
	| 'h-5'
	| 'h-6'
	| 'small'
	| 'caption'
	| 'subtitle-1'
	| 'subtitle-2';
