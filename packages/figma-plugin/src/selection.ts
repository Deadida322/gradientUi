import type { CreatedDesignTokens } from '@gradient-ui/gradient-engine/design-tokens';
import { gradientPaintFromModel } from './figmaGradient';
import { createModelFromGeneratorSettings } from './generatorModel';
import { GENERATOR_PLUGIN_DATA_KEY, setGradientRelaunchData } from './relaunch';
import type { GeneratorSettings } from './protocol';

const canSetFills = (node: SceneNode): node is GeometryMixin & SceneNode =>
	'fills' in node;

const canSetStrokes = (node: SceneNode): node is GeometryMixin & SceneNode =>
	'strokes' in node;

export const applyMainGradientToSelection = (tokens: CreatedDesignTokens) => {
	const main =
		tokens.gradientTokens.gradients.glare ??
		Object.values(tokens.gradientTokens.gradients).find(
			(gradient) => gradient.model
		);

	if (!main?.model) {
		throw new Error('No native gradient model was generated.');
	}

	let count = 0;

	for (const node of figma.currentPage.selection) {
		if (!canSetFills(node)) continue;

		const paint = gradientPaintFromModel(main.model);
		node.fills = [paint];
		node.setPluginData('gradient-ui.gradient', main.cssVar);
		node.setPluginData('gradient-ui.seed', tokens.seed);
		setGradientRelaunchData(node);
		count += 1;
	}

	return count;
};

export const applyCurrentGradientToSelection = (
	settings: GeneratorSettings
) => {
	const model = createModelFromGeneratorSettings(settings);
	let count = 0;

	for (const node of figma.currentPage.selection) {
		if (!canSetFills(node)) continue;

		const paint = gradientPaintFromModel(model);
		node.fills = [paint];
		node.setPluginData(GENERATOR_PLUGIN_DATA_KEY, JSON.stringify(settings));
		node.setPluginData('gradient-ui.seed', settings.seed);
		setGradientRelaunchData(node);
		count += 1;
	}

	return count;
};

export const applyCurrentGradientStrokeToSelection = (
	settings: GeneratorSettings
) => {
	const model = createModelFromGeneratorSettings(settings);
	const paint = gradientPaintFromModel(model);
	let count = 0;

	for (const node of figma.currentPage.selection) {
		if (!canSetStrokes(node)) continue;

		node.strokes = [paint];

		if ('strokeWeight' in node && node.strokeWeight === 0) {
			node.strokeWeight = 2;
		}

		node.setPluginData(GENERATOR_PLUGIN_DATA_KEY, JSON.stringify(settings));
		node.setPluginData('gradient-ui.seed', settings.seed);
		setGradientRelaunchData(node);
		count += 1;
	}

	return count;
};
