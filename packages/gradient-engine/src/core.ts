import { createPalette, type ColorPalette } from './palette';
import type { ColorInput } from './color';
import { toCssGradient } from './formatters/css';
import { createGradientModel } from './model';
import type { GradientOptions } from './types';

export * from './types';
export { createGradientModel, createGradientModelFromColor } from './model';
export { createRecipeStops, gradientRecipes } from './recipes';
export {
	defineGradientPreset,
	defineGradientPresetRegistry,
	getGradientPreset,
	gradientPresets,
	type GradientPreset,
	type GradientPresetName,
	type GradientPresetRegistry
} from './presets';

export const createGradient = (
	palette: ColorPalette,
	options: GradientOptions = {}
) => toCssGradient(createGradientModel(palette, options));

export const createGradientFromColor = (
	color: ColorInput,
	options: GradientOptions = {}
) => createGradient(createPalette(color), options);
