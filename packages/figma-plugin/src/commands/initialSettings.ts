import { loadSettings } from '../settings';
import { GENERATOR_PLUGIN_DATA_KEY, OPEN_GENERATOR_COMMAND } from '../relaunch';
import type { GeneratorSettings, PluginSettings } from '../protocol';

const getSelectionGeneratorSettings = () => {
	const node = figma.currentPage.selection.find((entry) =>
		entry.getPluginData(GENERATOR_PLUGIN_DATA_KEY)
	);
	const stored = node?.getPluginData(GENERATOR_PLUGIN_DATA_KEY);

	if (!stored) return null;

	try {
		return JSON.parse(stored) as GeneratorSettings;
	} catch {
		return null;
	}
};

export const getInitialSettings = async (): Promise<PluginSettings> => {
	const settings = await loadSettings();
	const generator = getSelectionGeneratorSettings();

	if (figma.command !== OPEN_GENERATOR_COMMAND && !generator) return settings;

	return generator
		? {
				...settings,
				generator,
				seed: generator.seed
			}
		: settings;
};
