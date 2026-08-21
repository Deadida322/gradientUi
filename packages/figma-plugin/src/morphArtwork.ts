import {
	createGradientMorphBlobs,
	toGradientMorphMarkup
} from '@gradient-ui/gradient-engine/effects';
import { colorInputToRgb } from './figmaColor';
import { gradientPaintFromModel } from './figmaGradient';
import { createModelFromGeneratorSettings } from './generatorModel';
import { GENERATOR_PLUGIN_DATA_KEY, setGradientRelaunchData } from './relaunch';
import type { GeneratorSettings } from './protocol';

const DEFAULT_SIZE = {
	height: 360,
	width: 540
};

type MorphPhase = 'End' | 'Mid' | 'Start';

const phases = ['Start', 'Mid', 'End'] as const satisfies readonly MorphPhase[];

const blendModeMap = {
	color: 'COLOR',
	'color-burn': 'COLOR_BURN',
	'color-dodge': 'COLOR_DODGE',
	darken: 'DARKEN',
	difference: 'DIFFERENCE',
	exclusion: 'EXCLUSION',
	'hard-light': 'HARD_LIGHT',
	hue: 'HUE',
	lighten: 'LIGHTEN',
	luminosity: 'LUMINOSITY',
	multiply: 'MULTIPLY',
	normal: 'NORMAL',
	overlay: 'OVERLAY',
	saturation: 'SATURATION',
	screen: 'SCREEN',
	'soft-light': 'SOFT_LIGHT'
} as const satisfies Record<GeneratorSettings['morphBlendMode'], BlendMode>;

const createBlobPaint = (color: string, opacity: number): GradientPaint => {
	const rgb = colorInputToRgb(color);
	const visibleAlpha = Math.min(1, Math.max(0, opacity));

	return {
		gradientStops: [
			{
				color: {
					...rgb,
					a: visibleAlpha
				},
				position: 0
			},
			{
				color: {
					...rgb,
					a: 0
				},
				position: 0.72
			},
			{
				color: {
					...rgb,
					a: 0
				},
				position: 1
			}
		],
		gradientTransform: [
			[1, 0, 0],
			[0, 1, 0]
		],
		type: 'GRADIENT_RADIAL'
	};
};

const createMorphBlobs = (settings: GeneratorSettings) => {
	const model = createModelFromGeneratorSettings(settings);

	return createGradientMorphBlobs(model, {
		blendMode: settings.morphBlendMode,
		blobCount: settings.morphBlobCount,
		blobOpacity: settings.morphBlobOpacity,
		blur: settings.morphBlur,
		contrast: settings.morphContrast,
		duration: settings.morphDuration,
		opacity: settings.morphOpacity,
		preset: settings.morphPreset,
		scale: settings.morphScale
	});
};

const appendMorphBlob = (
	frame: FrameNode,
	settings: GeneratorSettings,
	blob: ReturnType<typeof createGradientMorphBlobs>[number],
	index: number,
	phase: MorphPhase = 'Start'
) => {
	const transform = getPhaseTransform(blob, phase);
	const ellipse = figma.createEllipse();
	const baseSize = (DEFAULT_SIZE.width * blob.size) / 100;
	const size = baseSize * transform.scale;
	const centerX = (DEFAULT_SIZE.width * (blob.x + transform.dx)) / 100;
	const centerY = (DEFAULT_SIZE.height * (blob.y + transform.dy)) / 100;
	const opacity = Math.min(
		1,
		Math.max(0, blob.opacity * settings.morphOpacity)
	);

	frame.appendChild(ellipse);
	ellipse.name = `Morph blob ${index + 1}`;
	ellipse.resize(size, size);
	ellipse.x = centerX - size / 2;
	ellipse.y = centerY - size / 2;
	ellipse.rotation = transform.rotation;
	ellipse.fills = [createBlobPaint(blob.color, opacity)];
	ellipse.effects = [
		{
			blurType: 'NORMAL',
			radius: settings.morphBlur + blob.blur,
			type: 'LAYER_BLUR',
			visible: true
		}
	];
	ellipse.blendMode = blendModeMap[settings.morphBlendMode];
	ellipse.setPluginData('gradient-ui.morph-blob', JSON.stringify(blob));
};

const getPhaseTransform = (
	blob: ReturnType<typeof createGradientMorphBlobs>[number],
	phase: MorphPhase
) => {
	if (phase === 'Mid') {
		return {
			dx: blob.dx,
			dy: blob.dy,
			rotation: blob.rotateMid,
			scale: blob.scaleMid
		};
	}

	if (phase === 'End') {
		return {
			dx: blob.dx2,
			dy: blob.dy2,
			rotation: blob.rotateTo,
			scale: blob.scaleTo
		};
	}

	return {
		dx: 0,
		dy: 0,
		rotation: 0,
		scale: 0.92
	};
};

const createMorphVariant = (
	settings: GeneratorSettings,
	phase: MorphPhase,
	index: number
) => {
	const model = createModelFromGeneratorSettings(settings);
	const blobs = createMorphBlobs(settings);
	const frame = figma.createFrame();

	frame.name = `State=${phase}`;
	frame.resize(DEFAULT_SIZE.width, DEFAULT_SIZE.height);
	frame.x = figma.viewport.center.x - DEFAULT_SIZE.width / 2 + index * 420;
	frame.y = figma.viewport.center.y - DEFAULT_SIZE.height / 2;
	frame.cornerRadius = 24;
	frame.clipsContent = true;
	frame.fills = [gradientPaintFromModel(model)];
	frame.setPluginData(GENERATOR_PLUGIN_DATA_KEY, JSON.stringify(settings));
	setGradientRelaunchData(frame);

	for (const [blobIndex, blob] of blobs.entries()) {
		appendMorphBlob(frame, settings, blob, blobIndex, phase);
	}

	return frame;
};

export const createCurrentMorphFrame = (settings: GeneratorSettings) => {
	const model = createModelFromGeneratorSettings(settings);
	const blobs = createMorphBlobs(settings);
	const frame = figma.createFrame();
	const overlay = figma.createRectangle();

	frame.name = `Gradient UI Morph Frame / ${settings.recipe}`;
	frame.resize(DEFAULT_SIZE.width, DEFAULT_SIZE.height);
	frame.x = figma.viewport.center.x - DEFAULT_SIZE.width / 2;
	frame.y = figma.viewport.center.y - DEFAULT_SIZE.height / 2;
	frame.cornerRadius = 24;
	frame.clipsContent = true;
	frame.fills = [gradientPaintFromModel(model)];
	frame.setPluginData(GENERATOR_PLUGIN_DATA_KEY, JSON.stringify(settings));
	setGradientRelaunchData(frame);

	frame.appendChild(overlay);
	overlay.name = 'Morph dark overlay';
	overlay.resize(DEFAULT_SIZE.width, DEFAULT_SIZE.height);
	overlay.x = 0;
	overlay.y = 0;
	overlay.fills = [
		{
			color: {
				b: 0.22,
				g: 0.12,
				r: 0.1
			},
			opacity: 0.42,
			type: 'SOLID'
		}
	];

	for (const [index, blob] of blobs.entries()) {
		appendMorphBlob(frame, settings, blob, index, 'Mid');
	}

	figma.currentPage.selection = [frame];
	figma.viewport.scrollAndZoomIntoView([frame]);

	return blobs.length + 2;
};

export const createCurrentMorphArtwork = async (
	settings: GeneratorSettings
) => {
	const variants = phases.map((phase, index) =>
		createMorphVariant(settings, phase, index)
	);
	const components = variants.map((variant) =>
		figma.createComponentFromNode(variant)
	);
	const componentSet = figma.combineAsVariants(components, figma.currentPage);
	const transitionDuration = Math.max(
		0.2,
		Math.min(2.4, settings.morphDuration / phases.length / 1000)
	);

	componentSet.name = `Gradient UI Morph / ${settings.recipe}`;
	componentSet.x = figma.viewport.center.x - componentSet.width / 2;
	componentSet.y = figma.viewport.center.y - componentSet.height / 2;
	componentSet.setPluginData(
		GENERATOR_PLUGIN_DATA_KEY,
		JSON.stringify(settings)
	);
	setGradientRelaunchData(componentSet);

	await Promise.all(
		components.map((component, index) =>
			component.setReactionsAsync([
				{
					actions: [
						{
							destinationId:
								components[(index + 1) % components.length]
									?.id ?? null,
							navigation: 'CHANGE_TO',
							transition: {
								duration: transitionDuration,
								easing: {
									type: 'EASE_IN_AND_OUT'
								},
								type: 'SMART_ANIMATE'
							},
							type: 'NODE'
						}
					],
					trigger: {
						timeout: 1,
						type: 'AFTER_TIMEOUT'
					}
				}
			])
		)
	);

	figma.currentPage.selection = [componentSet];
	figma.viewport.scrollAndZoomIntoView([componentSet]);

	return phases.length * (settings.morphBlobCount + 1);
};

export const createCurrentMorphSvg = (settings: GeneratorSettings) => {
	const model = createModelFromGeneratorSettings(settings);
	const svg = toGradientMorphMarkup(model, {
		blobCount: settings.morphBlobCount,
		blobOpacity: settings.morphBlobOpacity,
		blendMode: settings.morphBlendMode,
		blur: settings.morphBlur,
		contrast: settings.morphContrast,
		duration: settings.morphDuration,
		id: 'gradient-ui-morph',
		opacity: settings.morphOpacity,
		preset: settings.morphPreset,
		scale: settings.morphScale,
		rx: 24,
		height: DEFAULT_SIZE.height,
		width: DEFAULT_SIZE.width
	});
	const node = figma.createNodeFromSvg(svg);

	node.name = `Gradient UI Morph SVG / ${settings.recipe}`;
	node.x = figma.viewport.center.x - node.width / 2;
	node.y = figma.viewport.center.y - node.height / 2;
	node.setPluginData(GENERATOR_PLUGIN_DATA_KEY, JSON.stringify(settings));
	setGradientRelaunchData(node);

	figma.currentPage.selection = [node];
	figma.viewport.scrollAndZoomIntoView([node]);

	return 1;
};

export const createCurrentMorphRasterFrames = async (
	settings: GeneratorSettings,
	frames: readonly Uint8Array[],
	size = DEFAULT_SIZE
) => {
	if (frames.length === 1 && frames[0]) {
		const image = figma.createImage(frames[0]);
		const frame = figma.createFrame();

		frame.name = `Gradient UI Morph Background / ${settings.recipe}`;
		frame.resize(size.width, size.height);
		frame.x = figma.viewport.center.x - size.width / 2;
		frame.y = figma.viewport.center.y - size.height / 2;
		frame.cornerRadius = 24;
		frame.clipsContent = true;
		frame.fills = [
			{
				imageHash: image.hash,
				scaleMode: 'FILL',
				type: 'IMAGE'
			}
		];
		frame.setPluginData(
			GENERATOR_PLUGIN_DATA_KEY,
			JSON.stringify(settings)
		);
		setGradientRelaunchData(frame);

		figma.currentPage.selection = [frame];
		figma.viewport.scrollAndZoomIntoView([frame]);

		return 1;
	}

	const components = await Promise.all(
		frames.map(async (bytes, index) => {
			const image = figma.createImage(bytes);
			const frame = figma.createFrame();

			frame.name = `State=${index + 1}`;
			frame.resize(size.width, size.height);
			frame.x =
				figma.viewport.center.x -
				size.width / 2 +
				index * (size.width + 48);
			frame.y = figma.viewport.center.y - size.height / 2;
			frame.cornerRadius = 24;
			frame.clipsContent = true;
			frame.fills = [
				{
					imageHash: image.hash,
					scaleMode: 'FILL',
					type: 'IMAGE'
				}
			];
			frame.setPluginData(
				GENERATOR_PLUGIN_DATA_KEY,
				JSON.stringify(settings)
			);
			setGradientRelaunchData(frame);

			return figma.createComponentFromNode(frame);
		})
	);
	const componentSet = figma.combineAsVariants(components, figma.currentPage);
	const transitionDuration = Math.max(
		0.08,
		Math.min(0.4, settings.morphDuration / frames.length / 1000)
	);

	componentSet.name = `Gradient UI Morph Raster / ${settings.recipe}`;
	componentSet.x = figma.viewport.center.x - componentSet.width / 2;
	componentSet.y = figma.viewport.center.y - componentSet.height / 2;
	componentSet.setPluginData(
		GENERATOR_PLUGIN_DATA_KEY,
		JSON.stringify(settings)
	);
	setGradientRelaunchData(componentSet);

	await Promise.all(
		components.map((component, index) =>
			component.setReactionsAsync([
				{
					actions: [
						{
							destinationId:
								components[(index + 1) % components.length]
									?.id ?? null,
							navigation: 'CHANGE_TO',
							transition: {
								duration: transitionDuration,
								easing: {
									type: 'LINEAR'
								},
								type: 'SMART_ANIMATE'
							},
							type: 'NODE'
						}
					],
					trigger: {
						timeout: 0.08,
						type: 'AFTER_TIMEOUT'
					}
				}
			])
		)
	);

	figma.currentPage.selection = [componentSet];
	figma.viewport.scrollAndZoomIntoView([componentSet]);

	return frames.length;
};
