import type { CreatedDesignTokens } from '@gradient-ui/gradient-engine/design-tokens';
import { gradientPaintFromModel } from './figmaGradient';
import { createModelFromGeneratorSettings } from './generatorModel';
import { solidPaintFromChannels } from './figmaColor';
import { getThemeGradientEntries } from './themeGradients';
import {
	GENERATOR_PLUGIN_DATA_KEY,
	setGradientRelaunchData
} from './relaunch';
import type { GeneratorSettings } from './protocol';

const PREVIEW_PAGE_NAME = 'Gradient UI Tokens';
const TEXT_FONT: FontName = { family: 'Inter', style: 'Regular' };
let isTextFontLoaded = false;

const createText = async (characters: string, x: number, y: number) => {
	if (!isTextFontLoaded) {
		await figma.loadFontAsync(TEXT_FONT);
		isTextFontLoaded = true;
	}

	const text = figma.createText();
	text.characters = characters;
	text.fontSize = 12;
	text.x = x;
	text.y = y;
	text.fills = [{ color: { b: 0.12, g: 0.1, r: 0.09 }, type: 'SOLID' }];
	return text;
};

const createSwatch = (
	name: string,
	paint: Paint,
	x: number,
	y: number,
	size = { height: 64, width: 96 }
) => {
	const frame = figma.createFrame();
	frame.name = name;
	frame.resize(size.width, size.height);
	frame.x = x;
	frame.y = y;
	frame.fills = [paint];
	frame.cornerRadius = 12;
	return frame;
};

const getOrCreatePreviewPage = async () => {
	const pages = figma.root.children;
	const existing = pages.find((page) => page.name === PREVIEW_PAGE_NAME);

	if (existing) return existing;

	const page = figma.createPage();
	page.name = PREVIEW_PAGE_NAME;
	return page;
};

export const createPreviewPage = async (tokens: CreatedDesignTokens) => {
	const page = await getOrCreatePreviewPage();
	await figma.setCurrentPageAsync(page);

	for (const node of [...page.children]) {
		node.remove();
	}

	await createText(`Gradient UI / ${tokens.seed} / ${tokens.mode}`, 32, 32);

	let index = 0;
	for (const [name, value] of Object.entries(tokens.tokens.colors).slice(0, 40)) {
		const x = 32 + (index % 8) * 120;
		const y = 72 + Math.floor(index / 8) * 104;
		createSwatch(name, solidPaintFromChannels(value), x, y);
		await createText(name, x, y + 70);
		index += 1;
	}

	const gradientY = 72 + Math.ceil(index / 8) * 104 + 32;
	await createText('Gradient recipes', 32, gradientY);

	let gradientIndex = 0;
	for (const [name, gradient] of Object.entries(tokens.gradientTokens.gradients)) {
		if (!gradient.model) continue;

		const x = 32 + gradientIndex * 160;
		const size = { height: 64, width: 96 };
		createSwatch(
			name,
			gradientPaintFromModel(gradient.model),
			x,
			gradientY + 32,
			size
		);
		await createText(name, x, gradientY + 104);
		gradientIndex += 1;
	}

	const themeGradientY = gradientY + 136;
	await createText('Theme gradients', 32, themeGradientY);

	let themeGradientIndex = 0;
	for (const gradient of getThemeGradientEntries(tokens)) {
		const x = 32 + (themeGradientIndex % 8) * 120;
		const y = themeGradientY + 32 + Math.floor(themeGradientIndex / 8) * 104;
		createSwatch(
			gradient.name,
			gradientPaintFromModel(gradient.model),
			x,
			y
		);
		await createText(gradient.name, x, y + 70);
		themeGradientIndex += 1;
	}

	const createdNodes = [...page.children];

	if (createdNodes.length > 0) {
		figma.viewport.scrollAndZoomIntoView(createdNodes);
	}

	return createdNodes.length;
};

export const createCurrentGradientPreview = async (
	settings: GeneratorSettings
) => {
	const page = figma.currentPage;
	const model = createModelFromGeneratorSettings(settings);
	const x = figma.viewport.center.x - 180;
	const y = figma.viewport.center.y - 120;
	const size = { height: 220, width: 360 };
	const frame = createSwatch(
		`Gradient UI / ${settings.recipe}`,
		gradientPaintFromModel(model),
		x,
		y,
		size
	);
	frame.setPluginData(GENERATOR_PLUGIN_DATA_KEY, JSON.stringify(settings));
	setGradientRelaunchData(frame);

	await createText(
		`${settings.recipe} / ${settings.type} / ${settings.seed}`,
		x,
		y + 236
	);

	page.selection = [frame];
	figma.viewport.scrollAndZoomIntoView([frame]);

	return 1;
};
