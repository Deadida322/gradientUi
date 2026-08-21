import { reactive, ref, watch } from 'vue';
import {
	DEFAULT_GRADIENT_MORPH_BLEND_MODE,
	gradientPresets,
	type GradientPresetName
} from '@gradient-ui/gradient-engine/core';
import { DEFAULT_PLUGIN_SETTINGS, type PluginSettings } from '../../protocol';
import { morphPresetDefaults, type ActiveTab } from './constants';
import { clone, toNumber } from './utils';

export const usePluginSettings = () => {
	const state = reactive<PluginSettings>(clone(DEFAULT_PLUGIN_SETTINGS));
	const selectedPreset = ref<GradientPresetName>('brandGlare');
	const activeTab = ref<ActiveTab>('generator');
	const statusText = ref('Ready.');

	const syncThemeSeed = () => {
		state.seed = state.generator.seed;
	};

	const applyPreset = () => {
		const preset = gradientPresets[selectedPreset.value];
		state.generator.recipe = preset.gradient.recipe;
		state.generator.type = preset.gradient.type ?? 'linear';
		state.generator.direction = toNumber(
			preset.gradient.direction ?? 135,
			135
		);
		state.generator.position =
			'position' in preset.gradient
				? (preset.gradient.position ?? 'center')
				: 'center';

		if (preset.dropShadow) {
			const glowX =
				'x' in preset.dropShadow
					? (preset.dropShadow.x as string | number | undefined)
					: undefined;
			state.generator.glowOpacity = preset.dropShadow.opacity ?? 0.62;
			state.generator.glowBlur = toNumber(
				preset.dropShadow.blur ?? 18,
				18
			);
			state.generator.glowX = toNumber(glowX ?? 0, 0);
			state.generator.glowY = toNumber(preset.dropShadow.y ?? 6, 6);
		}
	};

	const applyMorphPreset = () => {
		const preset = morphPresetDefaults[state.generator.morphPreset];

		state.generator.morphBlobCount = preset.blobCount;
		state.generator.morphBlur = preset.blur;
		state.generator.morphContrast = preset.contrast;
		state.generator.morphDuration = preset.duration;
		state.generator.morphOpacity = preset.opacity;
		state.generator.morphScale = preset.scale;
		state.generator.morphBlendMode = DEFAULT_GRADIENT_MORPH_BLEND_MODE;
		state.generator.morphBlobOpacity = 1;
	};

	const assignSettings = (settings: PluginSettings) => {
		const next = {
			...clone(DEFAULT_PLUGIN_SETTINGS),
			...settings,
			generator: {
				...clone(DEFAULT_PLUGIN_SETTINGS.generator),
				...settings.generator
			}
		};

		Object.assign(state, next);
		state.colors = undefined;
		syncThemeSeed();
	};

	watch(() => state.generator.seed, syncThemeSeed);

	return {
		activeTab,
		applyMorphPreset,
		applyPreset,
		assignSettings,
		selectedPreset,
		state,
		statusText
	};
};
