import type { FileRejection } from './types';

const messages: Record<FileRejection['code'], string> = {
	type: 'File type is not accepted',
	size: 'File is too large',
	count: 'File limit exceeded',
	image: 'Image cannot be decoded or has an unsupported type',
	dimensions: 'Image dimensions are outside the allowed range'
};

export const defaultFileRejectionMessage = (rejection: FileRejection) =>
	messages[rejection.code];
