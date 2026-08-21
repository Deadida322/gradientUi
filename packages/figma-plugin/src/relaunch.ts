export const GENERATOR_PLUGIN_DATA_KEY = 'gradient-ui.generator';
export const OPEN_GENERATOR_COMMAND = 'open-generator';

export const setGradientRelaunchData = (node: BaseNodeMixin) => {
	node.setRelaunchData({
		[OPEN_GENERATOR_COMMAND]: 'Open this fill in the Gradient UI generator.'
	});
};
