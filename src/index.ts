import type { App, Component, Plugin } from 'vue';
import './style.scss';
import * as components from '@/components';
import { componentNames } from './componentNames';
import { installIcons } from '@/use/icon';
import { withGradientDefaults } from '@/use/defaults';
import { installGradientUIRuntime, type GradientUIOptions } from './plugin';
export type { GradientUIOptions } from './plugin';
import type { ColorInput } from '@/types/Colors';

export * from '@/components';
export * from '@/directives';
export * from '@/services';
export * from '@/ssr';
export * from '@/theme';
export * from '@/use';
export { installIcons };
export type { ColorInput };

export type GradientUIPlugin = Plugin<[options?: GradientUIOptions]>;

const registerComponents = (app: App) => {
	for (const name of componentNames) {
		app.component(
			name,
			withGradientDefaults(name, components[name] as Component)
		);
	}
};

export function createGradientUI(
	options: GradientUIOptions = {}
): GradientUIPlugin {
	return {
		install(app: App, inlineOptions: GradientUIOptions = {}) {
			installGradientUI(app, options, inlineOptions);
		}
	};
}

const installGradientUI = (
	app: App,
	options: GradientUIOptions,
	inlineOptions: GradientUIOptions = {}
) => {
	const resolvedOptions = installGradientUIRuntime(
		app,
		options,
		inlineOptions
	);
	if (resolvedOptions.components !== false) registerComponents(app);
};

export const GradientUI: GradientUIPlugin = {
	install(app: App, options: GradientUIOptions = {}) {
		installGradientUI(app, options);
	}
};

export default GradientUI;
