import { inject, provide, type InjectionKey } from 'vue';
import type { PluginAppContext } from './usePluginApp';

const pluginAppKey: InjectionKey<PluginAppContext> = Symbol('plugin-app');

export const providePluginApp = (context: PluginAppContext) => {
	provide(pluginAppKey, context);
};

export const usePluginAppContext = () => {
	const context = inject(pluginAppKey);

	if (!context) {
		throw new Error('Plugin app context is not provided.');
	}

	return context;
};
