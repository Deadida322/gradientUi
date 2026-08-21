import { gradientPresets } from '@gradient-ui/gradient-engine/core';
import type {
	GradientMorphPreset,
	GradientPresetName,
	GradientRecipe,
	GradientType
} from '@gradient-ui/gradient-engine/core';
import type { PluginSettings } from '../../protocol';

export type ActiveTab = 'generator' | 'morph' | 'tokens';

export type Option<T extends string> = {
	label: string;
	value: T;
	color?: string;
};

export const recipes = [
	{ label: 'Glare', value: 'glare' },
	{ label: 'Monochrome', value: 'monochrome' },
	{ label: 'Complementary', value: 'complementary' },
	{ label: 'Split complementary', value: 'split-complementary' },
	{ label: 'Analogous', value: 'analogous' },
	{ label: 'Triadic', value: 'triadic' },
	{ label: 'Tetradic', value: 'tetradic' },
	{ label: 'Rectangle', value: 'rectangle' },
	{ label: 'Square', value: 'square' },
	{ label: 'Duotone', value: 'duotone' }
] as const satisfies readonly Option<GradientRecipe>[];

export const gradientTypes = [
	{ label: 'Linear', value: 'linear' },
	{ label: 'Radial', value: 'radial' },
	{ label: 'Conic', value: 'conic' }
] as const satisfies readonly Option<GradientType>[];

export const seeds = [
	{ label: 'Primary violet', value: '#704bfd', color: '#704bfd' },
	{ label: 'Electric blue', value: '#4e51ff', color: '#4e51ff' },
	{ label: 'Cyan', value: '#00bcd4', color: '#00bcd4' },
	{ label: 'Pink', value: '#ff00aa', color: '#ff00aa' },
	{ label: 'Orange', value: '#ff9800', color: '#ff9800' },
	{ label: 'Green', value: '#2e7d32', color: '#2e7d32' }
] as const satisfies readonly Option<string>[];

export const positions = [
	{ label: 'Center', value: 'center' },
	{ label: 'Top', value: 'top' },
	{ label: 'Right', value: 'right' },
	{ label: 'Bottom', value: 'bottom' },
	{ label: 'Left', value: 'left' },
	{ label: 'Top left', value: 'top left' },
	{ label: 'Top right', value: 'top right' },
	{ label: 'Bottom left', value: 'bottom left' },
	{ label: 'Bottom right', value: 'bottom right' }
] as const satisfies readonly Option<string>[];

export const morphPresets = [
	{ label: 'Soft', value: 'soft' },
	{ label: 'Liquid', value: 'liquid' },
	{ label: 'Ripple', value: 'ripple' }
] as const satisfies readonly Option<GradientMorphPreset>[];

export const morphPresetDefaults = {
	soft: {
		blobCount: 5,
		blur: 40,
		contrast: 18,
		duration: 12000,
		opacity: 0.76,
		scale: 1.05
	},
	liquid: {
		blobCount: 6,
		blur: 46,
		contrast: 22,
		duration: 9200,
		opacity: 0.82,
		scale: 1.18
	},
	ripple: {
		blobCount: 7,
		blur: 34,
		contrast: 20,
		duration: 7200,
		opacity: 0.78,
		scale: 0.94
	}
} satisfies Record<
	GradientMorphPreset,
	{
		blobCount: number;
		blur: number;
		contrast: number;
		duration: number;
		opacity: number;
		scale: number;
	}
>;

export const morphBlendModes = [
	{ label: 'Screen', value: 'screen' },
	{ label: 'Hard light', value: 'hard-light' },
	{ label: 'Overlay', value: 'overlay' },
	{ label: 'Soft light', value: 'soft-light' },
	{ label: 'Normal', value: 'normal' }
] as const satisfies readonly Option<PluginSettings['generator']['morphBlendMode']>[];

export const presetItems = Object.entries(gradientPresets).map(
	([value, preset]) => ({
		label: preset.label,
		value: value as GradientPresetName
	})
);

export const MORPH_PREVIEW_SIZE = {
	height: 360,
	width: 540
};

export const MORPH_RASTER_TIMEOUT = 15000;
