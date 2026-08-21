import { colorToHex, type ColorInput } from './color';
import {
	createColorSystem,
	type ColorSystem,
	type ThemeColorExtensions
} from './colorSystem';
import {
	createGradientTokens,
	type CreatedGradientTokens,
	type GradientTokenOptions
} from './tokens';
import {
	createSemanticTokens,
	type ThemeMode,
	type ThemeTokens
} from './scheme';

export const DEFAULT_SEED = '#4e51ff';

export interface DesignTokenOptions {
	seed?: ColorInput;
	mode?: ThemeMode;
	colors?: ThemeColorExtensions;
	gradientTokens?: GradientTokenOptions;
}

export interface CreatedDesignTokens {
	seed: string;
	mode: ThemeMode;
	tokens: {
		theme: ThemeTokens;
		colors: ThemeTokens;
		gradients: ThemeTokens;
	};
	colorSystem: ColorSystem;
	gradientTokens: CreatedGradientTokens;
}

export const normalizeDesignTokenSeed = (seed: ColorInput = DEFAULT_SEED) =>
	colorToHex(seed, DEFAULT_SEED);

export const createDesignTokens = (
	options: DesignTokenOptions = {}
): CreatedDesignTokens => {
	const mode = options.mode ?? 'light';
	const seed = normalizeDesignTokenSeed(options.seed);
	const colorSystem = createColorSystem(seed, {
		colors: options.colors
	});

	return {
		colorSystem,
		gradientTokens: createGradientTokens(seed, options.gradientTokens),
		mode,
		seed,
		tokens: {
			theme: createSemanticTokens(seed, mode),
			colors: colorSystem.colors,
			gradients: colorSystem.gradients
		}
	};
};
