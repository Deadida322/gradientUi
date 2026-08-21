import { ref, type ComputedRef } from 'vue';
import type { PluginCommand, PluginSettings } from '../../../protocol';
import { MORPH_PREVIEW_SIZE, MORPH_RASTER_TIMEOUT } from '../../app/constants';
import { clone } from '../../app/utils';

export const useMorphRaster = (
	state: PluginSettings,
	statusText: { value: string },
	runningCommand: { value: PluginCommand | null },
	morphMarkup: ComputedRef<string>
) => {
	const morphPreviewRef = ref<HTMLElement | null>(null);

	const createMorphRasterMarkup = (timeMs: number) =>
		(
			morphPreviewRef.value?.querySelector('svg')?.outerHTML ?? morphMarkup.value
		)
			.split('animation-delay: var(--g-gradient-morph-delay);')
			.join(
				`animation-delay: calc(var(--g-gradient-morph-delay) - ${Math.round(
					timeMs
				)}ms);
	animation-play-state: paused;`
			);

	const toSvgDataUrl = (svg: string) =>
		`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

	const renderMorphSvgBytes = (timeMs = 0) =>
		new Promise<number[]>((resolve, reject) => {
			let settled = false;
			const timeout = window.setTimeout(() => {
				settled = true;
				reject(new Error('Morph SVG rasterization timed out.'));
			}, MORPH_RASTER_TIMEOUT);
			const image = new Image();
			const svg = createMorphRasterMarkup(timeMs);
			const url = toSvgDataUrl(svg);
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			const width = MORPH_PREVIEW_SIZE.width;
			const height = MORPH_PREVIEW_SIZE.height;

			canvas.width = width;
			canvas.height = height;

			const cleanup = () => {
				settled = true;
				window.clearTimeout(timeout);
			};

			if (!context) {
				cleanup();
				reject(new Error('Cannot create canvas context.'));
				return;
			}

			const finish = () => {
				if (settled) return;

				context.clearRect(0, 0, width, height);
				context.drawImage(image, 0, 0, width, height);

				canvas.toBlob((blob) => {
					cleanup();

					if (!blob) {
						reject(new Error('Cannot rasterize morph SVG frame.'));
						return;
					}

					void blob
						.arrayBuffer()
						.then((buffer) => resolve(Array.from(new Uint8Array(buffer))))
						.catch(reject);
				}, 'image/png');
			};

			image.onerror = () => {
				if (settled) return;

				cleanup();
				reject(new Error('Cannot load morph SVG for rasterization.'));
			};

			image.onload = finish;
			image.src = url;

			if ('decode' in image) {
				void image
					.decode()
					.then(finish)
					.catch(() => undefined);
			}
		});

	const createRasterMorph = async () => {
		if (runningCommand.value) return;

		state.colors = undefined;
		runningCommand.value = 'create-current-morph-raster';
		statusText.value = 'Rendering morph background...';

		try {
			const frameCount = 1;
			const frames: number[][] = [];
			const settings = clone(state);

			for (let index = 0; index < frameCount; index += 1) {
				statusText.value = 'Rendering morph background...';
				const timeMs = (state.generator.morphDuration / frameCount) * index;
				const frame = await renderMorphSvgBytes(timeMs);
				frames.push(frame.map((byte) => Number(byte)));
				await new Promise((resolve) => window.setTimeout(resolve, 0));
			}

			statusText.value = 'Sending morph background to Figma...';
			parent.postMessage(
				{
					pluginMessage: {
						command: 'create-current-morph-raster',
						frames,
						height: MORPH_PREVIEW_SIZE.height,
						settings,
						type: 'create-raster-morph',
						width: MORPH_PREVIEW_SIZE.width
					}
				},
				'*'
			);
		} catch (error: unknown) {
			runningCommand.value = null;
			statusText.value = error instanceof Error ? error.message : String(error);
		}
	};

	return {
		createRasterMorph,
		morphPreviewRef
	};
};
