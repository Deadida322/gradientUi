import {
	createDesignTokens,
	type CreatedDesignTokens
} from '@gradient-ui/gradient-engine/design-tokens';
import { createModelFromGeneratorSettings } from './generatorModel';
import type { PluginSettings } from './protocol';

export interface PluginTokenSet {
	current: CreatedDesignTokens;
	dark: CreatedDesignTokens;
	light: CreatedDesignTokens;
}

const withMainGradientToken = (
	tokens: CreatedDesignTokens,
	settings: PluginSettings
) => {
	const model = createModelFromGeneratorSettings(settings.generator);
	const stops = model.stops
		.map((stop) => `${stop.color} ${stop.position}%`)
		.join(', ');
	const value =
		model.type === 'radial'
			? `radial-gradient(${model.shape ?? 'circle'} ${model.size ?? 'farthest-corner'} at ${model.position ?? 'center'}, ${stops})`
			: model.type === 'conic'
				? `conic-gradient(from ${model.direction}deg at ${model.position ?? 'center'}, ${stops})`
				: `linear-gradient(${model.direction}deg, ${stops})`;

	tokens.tokens.gradients.main = value;
	tokens.gradientTokens.gradients.main = {
		cssVar: '--g-gradient-main',
		model,
		stops: model.stops,
		value
	};
	tokens.gradientTokens.cssVars['--g-gradient-main'] = value;

	return tokens;
};

export const createPluginTokens = (
	settings: PluginSettings
): CreatedDesignTokens =>
	withMainGradientToken(
		createDesignTokens({
			colors: settings.colors,
			gradientTokens: settings.gradientTokens ?? {
				effects: true,
				recipes: ['glare', 'soft', 'mesh']
			},
			mode: settings.mode,
			seed: settings.seed
		}),
		settings
	);

export const createPluginTokenSet = (
	settings: PluginSettings
): PluginTokenSet => ({
	current: createPluginTokens(settings),
	dark: createPluginTokens({ ...settings, mode: 'dark' }),
	light: createPluginTokens({ ...settings, mode: 'light' })
});
