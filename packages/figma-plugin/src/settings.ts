import {
	DEFAULT_PLUGIN_SETTINGS,
	type PluginSettings
} from './protocol';

const SETTINGS_KEY = 'gradient-ui.settings';

export const loadSettings = async (): Promise<PluginSettings> => {
	const stored = await figma.clientStorage.getAsync(SETTINGS_KEY);

	return {
		...DEFAULT_PLUGIN_SETTINGS,
		...(typeof stored === 'object' && stored !== null ? stored : {})
	};
};

export const saveSettings = (settings: PluginSettings) =>
	figma.clientStorage.setAsync(SETTINGS_KEY, settings);
