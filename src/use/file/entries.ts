import { computed, toValue, type MaybeRefOrGetter } from 'vue';
import type { FileEntry, FilePreview } from './types';

export const useFileEntries = (
	files: MaybeRefOrGetter<readonly File[]>,
	previews: MaybeRefOrGetter<readonly FilePreview[]>,
	prefix: string
) => {
	const identities = new WeakMap<File, string[]>();
	let sequence = 0;
	return computed<FileEntry[]>(() => {
		const occurrences = new Map<File, number>();
		const urls = new Map(
			toValue(previews).map(({ file, url }) => [file, url])
		);
		return toValue(files).map((file) => {
			const occurrence = occurrences.get(file) ?? 0;
			occurrences.set(file, occurrence + 1);
			const ids = identities.get(file) ?? [];
			identities.set(file, ids);
			const id =
				ids[occurrence] ??
				(ids[occurrence] = `${prefix}-${++sequence}`);
			return { id, file, url: urls.get(file) || undefined };
		});
	});
};
