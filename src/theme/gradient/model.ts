import { createPalette, type ColorPalette } from '../palette';
import {
	DEFAULT_GRADIENT_DIRECTION,
	DEFAULT_GRADIENT_POSITION,
	DEFAULT_GRADIENT_SIZE
} from './constants';
import { createRecipeStops } from './recipes';
import type { GradientModel, GradientOptions } from './types';
import type { ColorInput } from '@/types/Colors';

export const createGradientModel = (
	palette: ColorPalette,
	options: GradientOptions = {}
): GradientModel => {
	const shade = options.shade ?? 500;
	const recipe = options.recipe ?? 'glare';
	const type = options.type ?? 'linear';

	return {
		type,
		stops: createRecipeStops(palette[shade], recipe, options.colors),
		direction: options.direction ?? DEFAULT_GRADIENT_DIRECTION,
		shape: options.shape ?? 'ellipse',
		position: options.position ?? DEFAULT_GRADIENT_POSITION,
		size: options.size ?? DEFAULT_GRADIENT_SIZE
	};
};

export const createGradientModelFromColor = (
	color: ColorInput,
	options: GradientOptions = {}
) => createGradientModel(createPalette(color), options);
