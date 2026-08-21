import {
	createGradientModelFromColor,
	type GradientModel
} from '@gradient-ui/gradient-engine/core';
import type { GeneratorSettings } from './protocol';

export const createModelFromGeneratorSettings = (
	settings: GeneratorSettings
): GradientModel =>
	createGradientModelFromColor(settings.seed, {
		colors:
			settings.recipe === 'duotone'
				? [settings.duotoneFrom, settings.duotoneTo]
				: undefined,
		direction: settings.direction,
		position: settings.position,
		recipe: settings.recipe,
		shape: 'circle',
		type: settings.type
	});
