import type { PluginToUiMessage, UiToPluginMessage } from '../protocol';
import { createCurrentMorphRasterFrames } from '../morphArtwork';
import { saveSettings } from '../settings';

type RasterMorphMessage = UiToPluginMessage & { type: 'create-raster-morph' };

export const createRasterMorphFromMessage = async (
	message: RasterMorphMessage,
	postMessage: (message: PluginToUiMessage) => void
) => {
	await figma.loadAllPagesAsync();
	await saveSettings(message.settings);
	const count = await createCurrentMorphRasterFrames(
		message.settings.generator,
		message.frames.map((frame) => Uint8Array.from(frame)),
		{
			height: message.height,
			width: message.width
		}
	);

	postMessage({
		command: message.command,
		message: `Created ${count} morph background${count === 1 ? '' : 's'}.`,
		type: 'result'
	});
};
