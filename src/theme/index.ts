// Low-level color primitives
export {
	colorToHex,
	getContrastingColor,
	parseColor,
	rgbToChannels,
	rgbToHex,
	type RgbColor
} from './color';

// Tonal palettes
export {
	COLOR_SHADES,
	ON_SHADE_TONES,
	SHADE_TONES,
	createOnPalette,
	createPalette,
	createPalettePair,
	type ColorPalette,
	type ColorPalettePair,
	type ColorShade
} from './palette';

// Gradients
export * as gradientAnimation from './gradient/animation';
export * as gradientCore from './gradient/core';
export * as gradientEffects from './gradient/effects';
export * as gradientFormatters from './gradient/formatters';
export * as gradientMaterial from './gradient/material';
export {
	createGradient,
	createGradientModel,
	createGradientModelFromColor,
	createGradientFromColor,
	createGradientMaterial,
	createGradientPreset,
	createGradientTokens,
	createLinearGradient,
	defineGradientPreset,
	defineGradientPresetRegistry,
	getGradientPreset,
	gradientPresets,
	toCssGradient,
	toGradientAnimationCSS,
	toGradientBoxShadow,
	toGradientDropShadow,
	createGradientMorphBlobs,
	toGradientMorphCSS,
	toGradientMorphFilter,
	toGradientMorphFilterMarkup,
	toCanvasGradient,
	toSvgGradient,
	toSvgGradientMarkup,
	toSvgPathAnimationMarkup,
	toSvgSourceAnimationMarkup,
	type GradientAnimationOptions,
	type GradientAnimationPreset,
	type CanvasGradientOptions,
	type CreatedGradientPreset,
	type CreatedGradientTokens,
	type CreatedGradientMaterial,
	type GradientAnimationTokenEntry,
	type GradientDirection,
	type GradientEffectTokenEntry,
	type GradientModel,
	type GradientMaterialOptions,
	type GradientMorphBlob,
	type GradientMorphOptions,
	type GradientMorphPreset,
	type GradientOptions,
	type GradientPreset,
	type GradientPresetName,
	type GradientPresetRegistry,
	type GradientRecipe,
	type GradientShadowOptions,
	type GradientShape,
	type GradientStop,
	type GradientTokenEntry,
	type GradientTokenOptions,
	type GradientTokenRecipe,
	type GradientType,
	type SvgGradientOptions,
	type SvgPathAnimationOptions,
	type SvgSourceAnimationOptions
} from './gradient';

// Generated token systems
export {
	createColorSystem,
	type ColorSystem,
	type ColorSystemOptions
} from './colorSystem';
export { createSemanticTokens } from './scheme';

// Vue theme service
export {
	DEFAULT_SEED,
	createDefaultDarkTheme,
	createDefaultLightTheme,
	createDefaultTheme,
	createTheme,
	installTheme,
	provideTheme,
	useTheme,
	type CreateDefaultThemeOptions,
	type GeneratedTheme,
	type GradientUITheme,
	type GradientUIThemeOptions,
	type SeedTheme,
	type ThemeMode
} from './default';
export type {
	ThemeColorDefinition,
	ThemeColorExtensions,
	ThemeColorValue,
	ThemeTokens
} from './types';
