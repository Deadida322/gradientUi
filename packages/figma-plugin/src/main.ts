import type { PluginToUiMessage, UiToPluginMessage } from './protocol';
import { getInitialSettings } from './commands/initialSettings';
import { createRasterMorphFromMessage } from './commands/rasterMorph';
import { runCommand } from './commands/runCommand';

const postMessage = (message: PluginToUiMessage) => {
	figma.ui.postMessage(message);
};

const postSelectionChange = () => {
	postMessage({
		selectionCount: figma.currentPage.selection.length,
		type: 'selection-change'
	});
};

figma.showUI(__html__, {
	height: 640,
	themeColors: true,
	width: 720
});

void getInitialSettings()
	.then((settings) => {
		postMessage({
			selectionCount: figma.currentPage.selection.length,
			settings,
			type: 'ready'
		});
	})
	.catch((error: unknown) => {
		postMessage({
			message: error instanceof Error ? error.message : String(error),
			type: 'error'
		});
	});

figma.on('selectionchange', postSelectionChange);

figma.ui.onmessage = (message: UiToPluginMessage) => {
	if (message.type === 'resize') {
		figma.ui.resize(message.width, message.height);
		return;
	}

	if (message.type === 'create-raster-morph') {
		void createRasterMorphFromMessage(message, postMessage).catch(
			(error: unknown) => {
				postMessage({
					command: message.command,
					message: error instanceof Error ? error.message : String(error),
					type: 'error'
				});
			}
		);
		return;
	}

	void runCommand(message.command, message, postMessage).catch((error: unknown) => {
		postMessage({
			command: message.command,
			message: error instanceof Error ? error.message : String(error),
			type: 'error'
		});
	});
};
