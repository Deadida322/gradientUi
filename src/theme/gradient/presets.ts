import type {
	GradientAnimationOptions,
	GradientAnimationPreset,
	GradientOptions,
	GradientRecipe,
	GradientShadowOptions,
	GradientType
} from './types';

export interface GradientPreset {
	label: string;
	description?: string;
	gradient: Omit<GradientOptions, 'shade' | 'colors'> & {
		recipe: GradientRecipe;
		type?: GradientType;
	};
	shadow?: GradientShadowOptions;
	dropShadow?: GradientShadowOptions;
	animation?: Omit<GradientAnimationOptions, 'name' | 'selector'> & {
		preset: GradientAnimationPreset;
	};
}

export type GradientPresetRegistry = Record<string, GradientPreset>;

export const defineGradientPreset = <T extends GradientPreset>(preset: T) =>
	preset;

export const defineGradientPresetRegistry = <T extends GradientPresetRegistry>(
	presets: T
) => presets;

export const gradientPresets = defineGradientPresetRegistry({
	brandGlare: defineGradientPreset({
		label: 'Brand glare',
		description:
			'Classic Gradient UI glare with a vivid complementary highlight.',
		gradient: {
			recipe: 'glare',
			type: 'linear',
			direction: 135
		},
		shadow: {
			layers: 2,
			opacity: 0.24,
			blur: 16,
			y: 6,
			spread: -3
		},
		dropShadow: {
			layers: 3,
			opacity: 0.38,
			blur: 16,
			y: 6
		},
		animation: {
			preset: 'shift',
			duration: 6000,
			easing: 'ease-in-out'
		}
	}),
	softMono: defineGradientPreset({
		label: 'Soft mono',
		description: 'Quiet monochrome ramp for subtle surfaces.',
		gradient: {
			recipe: 'monochrome',
			type: 'linear',
			direction: 145
		},
		shadow: {
			layers: 2,
			opacity: 0.18,
			blur: 18,
			y: 7,
			spread: -4
		},
		dropShadow: {
			layers: 2,
			opacity: 0.26,
			blur: 16,
			y: 6
		},
		animation: {
			preset: 'pulse',
			duration: 7200,
			easing: 'ease-in-out'
		}
	}),
	neonDuo: defineGradientPreset({
		label: 'Neon duo',
		description: 'Punchy duotone setup with stronger glow defaults.',
		gradient: {
			recipe: 'duotone',
			type: 'linear',
			direction: 120
		},
		shadow: {
			layers: 2,
			opacity: 0.32,
			blur: 18,
			y: 7,
			spread: -3
		},
		dropShadow: {
			layers: 3,
			opacity: 0.52,
			blur: 18,
			y: 7
		},
		animation: {
			preset: 'shift',
			duration: 5200,
			easing: 'ease-in-out'
		}
	}),
	orbitalConic: defineGradientPreset({
		label: 'Orbital conic',
		description: 'Smooth mirrored conic gradient for badges and marks.',
		gradient: {
			recipe: 'triadic',
			type: 'conic',
			direction: 35,
			position: 'center'
		},
		shadow: {
			layers: 2,
			opacity: 0.24,
			blur: 16,
			y: 6,
			spread: -3
		},
		dropShadow: {
			layers: 3,
			opacity: 0.36,
			blur: 16,
			y: 6
		},
		animation: {
			preset: 'rotate',
			duration: 9000
		}
	}),
	auroraRadial: defineGradientPreset({
		label: 'Aurora radial',
		description: 'Radial analogous gradient with slow hue motion.',
		gradient: {
			recipe: 'analogous',
			type: 'radial',
			direction: 0,
			position: 'top left',
			shape: 'circle'
		},
		shadow: {
			layers: 2,
			opacity: 0.22,
			blur: 18,
			y: 7,
			spread: -4
		},
		dropShadow: {
			layers: 3,
			opacity: 0.32,
			blur: 18,
			y: 7
		},
		animation: {
			preset: 'hue-rotate',
			duration: 8000,
			easing: 'ease-in-out'
		}
	})
});

export type GradientPresetName = keyof typeof gradientPresets;

export const getGradientPreset = (
	name: GradientPresetName | string,
	registry: GradientPresetRegistry = gradientPresets
) => registry[name] ?? gradientPresets.brandGlare;
