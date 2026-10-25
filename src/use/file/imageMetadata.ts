export interface ImageMetadata {
	width: number;
	height: number;
}

export const readImageMetadata = (
	file: File,
	signal?: AbortSignal
): Promise<ImageMetadata> =>
	new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const image = new Image();
		const cleanup = () => {
			image.onload = null;
			image.onerror = null;
			URL.revokeObjectURL(url);
			signal?.removeEventListener('abort', onAbort);
		};
		const onAbort = () => {
			cleanup();
			image.src = '';
			reject(new Error('Image inspection cancelled'));
		};
		if (signal?.aborted) {
			onAbort();
			return;
		}
		signal?.addEventListener('abort', onAbort, { once: true });
		image.onload = () => {
			const metadata = {
				width: image.naturalWidth,
				height: image.naturalHeight
			};
			cleanup();
			resolve(metadata);
		};
		image.onerror = () => {
			cleanup();
			reject(new Error('Image cannot be decoded'));
		};
		image.src = url;
	});
