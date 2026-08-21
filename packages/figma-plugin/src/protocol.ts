import type { DesignTokenOptions } from '@gradient-ui/gradient-engine/design-tokens';
import type {
	GradientMorphPreset,
	GradientRecipe,
	GradientType
} from '@gradient-ui/gradient-engine/core';

export type PluginCommand =
	| 'generate-preview'
	| 'sync-variables'
	| 'sync-paint-styles'
	| 'apply-main-gradient'
	| 'apply-current-gradient'
	| 'apply-current-stroke'
	| 'apply-current-glow'
	| 'create-current-preview'
	| 'create-current-morph'
	| 'create-current-morph-svg'
	| 'create-current-morph-raster'
	| 'notify';

export interface GeneratorSettings {
	direction: number;
	duotoneFrom: string;
	duotoneTo: string;
	glowBlur: number;
	glowOpacity: number;
	glowX: number;
	glowY: number;
	morphBlur: number;
	morphBlendMode: 'hard-light' | 'normal' | 'overlay' | 'screen' | 'soft-light';
	morphBlobCount: number;
	morphBlobOpacity: number;
	morphContrast: number;
	morphDuration: number;
	morphOpacity: number;
	morphPreset: GradientMorphPreset;
	morphScale: number;
	position: string;
	recipe: GradientRecipe;
	seed: string;
	type: GradientType;
}

export interface PluginSettings extends DesignTokenOptions {
	seed: string;
	mode: 'light' | 'dark';
	generator: GeneratorSettings;
	includePaintStyles: boolean;
	includeVariables: boolean;
	createPreview: boolean;
}

export type UiToPluginMessage =
	| {
			type: 'run-command';
			command: PluginCommand;
			settings: PluginSettings;
	  }
	| {
			type: 'create-raster-morph';
			command: 'create-current-morph-raster';
			frames: number[][];
			height: number;
			settings: PluginSettings;
			width: number;
	  }
	| {
			type: 'resize';
			width: number;
			height: number;
	  };

export type PluginToUiMessage =
	| {
			type: 'ready';
			settings: PluginSettings;
			selectionCount: number;
	  }
	| {
			type: 'selection-change';
			selectionCount: number;
	  }
	| {
			type: 'result';
			command: PluginCommand;
			message: string;
			payload?: unknown;
	  }
	| {
			type: 'error';
			command?: PluginCommand;
			message: string;
	  };

export const DEFAULT_PLUGIN_SETTINGS: PluginSettings = {
	createPreview: true,
	generator: {
		direction: 135,
		duotoneFrom: '#ff734b',
		duotoneTo: '#00dab0',
		glowBlur: 18,
		glowOpacity: 0.62,
		glowX: 0,
		glowY: 6,
		morphBlendMode: 'hard-light',
		morphBlur: 40,
		morphBlobCount: 5,
		morphBlobOpacity: 1,
		morphContrast: 18,
		morphDuration: 12000,
		morphOpacity: 0.76,
		morphPreset: 'soft',
		morphScale: 1.05,
		position: 'center',
		recipe: 'glare',
		seed: '#704bfd',
		type: 'linear'
	},
	includePaintStyles: true,
	includeVariables: true,
	mode: 'light',
	seed: '#4e51ff'
};
