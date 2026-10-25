import type { FileRejection } from './types';

export const matchesFileAccept = (file: File, accept?: string): boolean => {
	const patterns = accept
		?.split(',')
		.map((value) => value.trim().toLowerCase())
		.filter(Boolean);
	if (!patterns?.length) return true;
	const name = file.name.toLowerCase();
	const mime = file.type.toLowerCase();
	return patterns.some((pattern) => {
		if (pattern.startsWith('.')) return name.endsWith(pattern);
		if (pattern.endsWith('/*'))
			return mime.startsWith(pattern.slice(0, -1));
		return mime === pattern;
	});
};

export interface FileAcceptanceOptions {
	accept?: string;
	maxFileSize?: number;
	capacity: number;
	imageOnly?: boolean;
}
export const acceptFiles = (
	files: readonly File[],
	options: FileAcceptanceOptions
) => {
	const accepted: File[] = [];
	const rejected: FileRejection[] = [];
	for (const file of files) {
		const code =
			options.imageOnly && !file.type.startsWith('image/')
				? 'image'
				: !matchesFileAccept(file, options.accept)
					? 'type'
					: options.maxFileSize !== undefined &&
						  file.size > options.maxFileSize
						? 'size'
						: accepted.length >= options.capacity
							? 'count'
							: undefined;
		if (code) rejected.push({ file, code });
		else accepted.push(file);
	}
	return { accepted, rejected };
};
