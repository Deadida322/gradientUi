import type {
	PluginCommand,
	PluginToUiMessage,
	UiToPluginMessage
} from '../protocol';
import {
	applyCurrentGradientStrokeToSelection,
	applyCurrentGradientToSelection,
	applyMainGradientToSelection
} from '../selection';
import { createCurrentGlowBacking } from '../glowArtwork';
import { createPluginTokenSet } from '../tokenFactory';
import { createCurrentGradientPreview, createPreviewPage } from '../preview';
import {
	createCurrentMorphArtwork,
	createCurrentMorphSvg
} from '../morphArtwork';
import { saveSettings } from '../settings';
import { syncPaintStyleSet } from '../paintStyles';
import { syncVariableModes } from '../variables';

type RunCommandMessage = UiToPluginMessage & { type: 'run-command' };

export const runCommand = async (
	command: PluginCommand,
	message: RunCommandMessage,
	postMessage: (message: PluginToUiMessage) => void
) => {
	await figma.loadAllPagesAsync();
	await saveSettings(message.settings);
	const tokenSet = createPluginTokenSet(message.settings);
	const tokens = tokenSet.current;

	if (command === 'sync-variables') {
		const count = await syncVariableModes(tokenSet);
		postMessage({
			command,
			message: `Synced ${count} light/dark color variables.`,
			type: 'result'
		});
		return;
	}

	if (command === 'sync-paint-styles') {
		const count = await syncPaintStyleSet(tokenSet);
		postMessage({
			command,
			message: `Synced ${count} paint styles.`,
			type: 'result'
		});
		return;
	}

	if (command === 'generate-preview') {
		const count = await createPreviewPage(tokens);
		postMessage({
			command,
			message: `Created preview with ${count} nodes.`,
			type: 'result'
		});
		return;
	}

	if (command === 'apply-main-gradient') {
		const count = applyMainGradientToSelection(tokens);
		postMessage({
			command,
			message: `Applied gradient to ${count} selected layers.`,
			type: 'result'
		});
		return;
	}

	if (command === 'apply-current-gradient') {
		const count = applyCurrentGradientToSelection(
			message.settings.generator
		);
		postMessage({
			command,
			message: `Applied current gradient to ${count} selected layers.`,
			type: 'result'
		});
		return;
	}

	if (command === 'apply-current-stroke') {
		const count = applyCurrentGradientStrokeToSelection(
			message.settings.generator
		);
		postMessage({
			command,
			message: `Applied gradient stroke to ${count} selected layers.`,
			type: 'result'
		});
		return;
	}

	if (command === 'apply-current-glow') {
		const count = createCurrentGlowBacking(message.settings.generator);
		postMessage({
			command,
			message: `Created ${count} native blurred glow backing${count === 1 ? '' : 's'}.`,
			type: 'result'
		});
		return;
	}

	if (command === 'create-current-preview') {
		const count = await createCurrentGradientPreview(
			message.settings.generator
		);
		postMessage({
			command,
			message: `Created ${count} current gradient preview.`,
			type: 'result'
		});
		return;
	}

	if (command === 'create-current-morph') {
		const count = await createCurrentMorphArtwork(
			message.settings.generator
		);
		postMessage({
			command,
			message: `Created morph variants with ${count} layers.`,
			type: 'result'
		});
		return;
	}

	if (command === 'create-current-morph-svg') {
		const count = createCurrentMorphSvg(message.settings.generator);
		postMessage({
			command,
			message: `Created engine morph SVG with ${count} node.`,
			type: 'result'
		});
		return;
	}
};
