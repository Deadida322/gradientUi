import { shallowRef, watch, toValue, type MaybeRefOrGetter } from 'vue';
import { onClientMounted } from '@/ssr/use';
import type { FilePreview } from './types';

export const useFilePreview = (files: MaybeRefOrGetter<readonly File[]>) => {
	const previews = shallowRef<FilePreview[]>([]);
	onClientMounted(() => {
		const urls = new Map<File, string>();
		const stop = watch(
			() => [...toValue(files)],
			(next) => {
				for (const [file, url] of urls) {
					if (!next.includes(file)) {
						URL.revokeObjectURL(url);
						urls.delete(file);
					}
				}
				for (const file of next) {
					if (file.type.startsWith('image/') && !urls.has(file))
						urls.set(file, URL.createObjectURL(file));
				}
				previews.value = next.map((file) => ({
					file,
					url: urls.get(file) ?? ''
				}));
			},
			{ immediate: true }
		);
		return () => {
			stop();
			for (const url of urls.values()) URL.revokeObjectURL(url);
		};
	});
	return { previews };
};
