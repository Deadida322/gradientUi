import { computed } from 'vue';
import {
	createGradientModelFromColor,
	gradientPresets
} from '@gradient-ui/gradient-engine/core';
import { toGradientMorphMarkup } from '@gradient-ui/gradient-engine/effects';
import { toCssGradient } from '@gradient-ui/gradient-engine/formatters';
import type { PluginSettings } from '../../protocol';
import { MORPH_PREVIEW_SIZE } from './constants';
import type { usePluginSettings } from './usePluginSettings';

export const useGeneratorPreview = (
	state: PluginSettings,
	selectedPreset: ReturnType<typeof usePluginSettings>['selectedPreset']
) => {
	const currentPreset = computed(() => gradientPresets[selectedPreset.value]);

	const model = computed(() =>
		createGradientModelFromColor(state.generator.seed, {
			colors:
				state.generator.recipe === 'duotone'
					? [state.generator.duotoneFrom, state.generator.duotoneTo]
					: undefined,
			direction: state.generator.direction,
			position: state.generator.position,
			recipe: state.generator.recipe,
			shape: 'circle',
			type: state.generator.type
		})
	);

	const cssGradient = computed(() => toCssGradient(model.value));

	const previewStyle = computed(() => ({
		backgroundImage: cssGradient.value
	}));
	const glowPreviewStyle = computed(() => ({
		backgroundImage: cssGradient.value,
		filter: `blur(${state.generator.glowBlur}px)`,
		opacity: state.generator.glowOpacity,
		transform: `translate(${state.generator.glowX}px, ${state.generator.glowY}px)`
	}));
	const morphOptions = computed(() => ({
		blendMode: state.generator.morphBlendMode,
		blobCount: state.generator.morphBlobCount,
		blobOpacity: state.generator.morphBlobOpacity,
		blur: state.generator.morphBlur,
		contrast: state.generator.morphContrast,
		duration: state.generator.morphDuration,
		id: 'gradient-ui-builder-morph',
		opacity: state.generator.morphOpacity,
		preset: state.generator.morphPreset,
		scale: state.generator.morphScale
	}));
	const morphMarkup = computed(() =>
		toGradientMorphMarkup(model.value, {
			...morphOptions.value,
			height: MORPH_PREVIEW_SIZE.height,
			rx: 24,
			width: MORPH_PREVIEW_SIZE.width
		})
	);

	return {
		currentPreset,
		glowPreviewStyle,
		morphMarkup,
		previewStyle
	};
};
