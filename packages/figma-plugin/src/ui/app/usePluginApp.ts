import { useMorphRaster } from '../features/morph/useMorphRaster';
import { useGeneratorPreview } from './useGeneratorPreview';
import { usePluginBridge } from './usePluginBridge';
import { usePluginSettings } from './usePluginSettings';

export const usePluginApp = () => {
	const settings = usePluginSettings();
	const preview = useGeneratorPreview(settings.state, settings.selectedPreset);
	const bridge = usePluginBridge(
		settings.state,
		settings.statusText,
		settings.assignSettings
	);
	const morphRaster = useMorphRaster(
		settings.state,
		settings.statusText,
		bridge.runningCommand,
		preview.morphMarkup
	);

	return {
		...settings,
		...preview,
		...bridge,
		...morphRaster
	};
};

export type PluginAppContext = ReturnType<typeof usePluginApp>;
