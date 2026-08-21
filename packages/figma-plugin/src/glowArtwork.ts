import { createModelFromGeneratorSettings } from './generatorModel';
import { gradientPaintFromModel } from './figmaGradient';
import {
	GENERATOR_PLUGIN_DATA_KEY,
	setGradientRelaunchData
} from './relaunch';
import type { GeneratorSettings } from './protocol';

const DEFAULT_SIZE = {
	height: 160,
	width: 320
};

const getTargetBounds = (node: SceneNode) => ({
	height: Math.max(1, 'height' in node ? node.height : DEFAULT_SIZE.height),
	node,
	width: Math.max(1, 'width' in node ? node.width : DEFAULT_SIZE.width),
	x: 'x' in node ? node.x : figma.viewport.center.x - DEFAULT_SIZE.width / 2,
	y: 'y' in node ? node.y : figma.viewport.center.y - DEFAULT_SIZE.height / 2
});

const createGlowNode = (
	settings: GeneratorSettings,
	bounds: ReturnType<typeof getTargetBounds>
) => {
	const model = createModelFromGeneratorSettings(settings);
	const node = figma.createRectangle();

	node.name = `Gradient UI Glow Backing / ${settings.recipe}`;
	node.resize(bounds.width, bounds.height);
	node.fills = [gradientPaintFromModel(model)];
	node.opacity = Math.min(1, Math.max(0, settings.glowOpacity));
	node.effects = [
		{
			blurType: 'NORMAL',
			radius: Math.max(0, settings.glowBlur),
			type: 'LAYER_BLUR',
			visible: true
		}
	];
	node.setPluginData(GENERATOR_PLUGIN_DATA_KEY, JSON.stringify(settings));
	setGradientRelaunchData(node);

	const parent = bounds.node.parent;

	if (parent && 'insertChild' in parent) {
		const targetIndex = parent.children.indexOf(bounds.node);
		parent.insertChild(Math.max(0, targetIndex), node);
	}

	node.x = bounds.x + settings.glowX;
	node.y = bounds.y + settings.glowY;

	return node;
};

export const createCurrentGlowBacking = (settings: GeneratorSettings) => {
	const selection = figma.currentPage.selection;
	if (!selection.length) return 0;

	const targets = selection.map(getTargetBounds);
	const nodes = targets.map((bounds) => createGlowNode(settings, bounds));

	figma.currentPage.selection = [...selection];

	return nodes.length;
};
