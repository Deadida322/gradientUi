import type { App, Component, Plugin } from 'vue';
import './style.scss';
import {
	BaseOverlay,
	GAlert,
	GAside,
	GAsideGroup,
	GAsideItem,
	GBadge,
	GButton,
	GCheckbox,
	GCheckboxGroup,
	GChip,
	GDrawer,
	GDropdownGroup,
	GExpansion,
	GExpansionGroup,
	GFAB,
	GForm,
	GGradient,
	GIcon,
	GInput,
	GLoading,
	GMenu,
	GModal,
	GNavbar,
	GNavbarItem,
	GNavbarMenu,
	GNavbarSubItem,
	GNavGroup,
	GNavItem,
	GNavList,
	GProgress,
	GQuickActions,
	GRadio,
	GSelect,
	GSnackbar,
	GSquircle,
	GSwitch,
	GTab,
	GTabList,
	GTabPanel,
	GTabPanels,
	GTable,
	GTabs,
	GText,
	GTextarea,
	GTooltip,
	GTransition,
	GTransitionGroup,
	GExpandTransition,
	vGradientIcon,
	vGradientText,
	vLoading,
	vMask,
	vRipple,
	vTooltip
} from '@/components';
import { installIcons, type IconsOptions } from '@/use/icon';
import {
	createTheme,
	installTheme,
	type GradientUIThemeOptions
} from '@/theme';
import type { ColorInput } from '@/types/Colors';
import {
	installDefaults,
	withGradientDefaults,
	type GradientUIDefaults
} from '@/use/defaults';

export * from '@/components';
export * from '@/directives';
export * from '@/services';
export * from '@/theme';
export * from '@/use';
export { installIcons };
export type { ColorInput };

export interface GradientUIOptions {
	icons?: boolean | Partial<IconsOptions>;
	theme?: false | ColorInput | GradientUIThemeOptions;
	defaults?: GradientUIDefaults;
}

function registerComponent(app: App, name: string, component: Component) {
	app.component(name, withGradientDefaults(name, component));
}

function registerComponents(app: App) {
	registerComponent(app, 'BaseOverlay', BaseOverlay);
	registerComponent(app, 'GAlert', GAlert);
	registerComponent(app, 'GAside', GAside);
	registerComponent(app, 'GAsideGroup', GAsideGroup);
	registerComponent(app, 'GAsideItem', GAsideItem);
	registerComponent(app, 'GBadge', GBadge);
	registerComponent(app, 'GButton', GButton);
	registerComponent(app, 'GCheckbox', GCheckbox);
	registerComponent(app, 'GCheckboxGroup', GCheckboxGroup);
	registerComponent(app, 'GChip', GChip);
	registerComponent(app, 'GDrawer', GDrawer);
	registerComponent(app, 'GDropdownGroup', GDropdownGroup);
	registerComponent(app, 'GExpansion', GExpansion);
	registerComponent(app, 'GExpansionGroup', GExpansionGroup);
	registerComponent(app, 'GFAB', GFAB);
	registerComponent(app, 'GForm', GForm);
	registerComponent(app, 'GGradient', GGradient);
	registerComponent(app, 'GIcon', GIcon as unknown as Component);
	registerComponent(app, 'GInput', GInput);
	registerComponent(app, 'GLoading', GLoading);
	registerComponent(app, 'GMenu', GMenu);
	registerComponent(app, 'GModal', GModal);
	registerComponent(app, 'GNavbar', GNavbar);
	registerComponent(app, 'GNavbarItem', GNavbarItem);
	registerComponent(app, 'GNavbarMenu', GNavbarMenu);
	registerComponent(app, 'GNavbarSubItem', GNavbarSubItem);
	registerComponent(app, 'GNavGroup', GNavGroup);
	registerComponent(app, 'GNavItem', GNavItem);
	registerComponent(app, 'GNavList', GNavList);
	registerComponent(app, 'GProgress', GProgress);
	registerComponent(app, 'GQuickActions', GQuickActions);
	registerComponent(app, 'GRadio', GRadio);
	registerComponent(app, 'GSelect', GSelect);
	registerComponent(app, 'GSnackbar', GSnackbar);
	registerComponent(app, 'GSquircle', GSquircle);
	registerComponent(app, 'GSwitch', GSwitch);
	registerComponent(app, 'GTab', GTab);
	registerComponent(app, 'GTabList', GTabList);
	registerComponent(app, 'GTabPanel', GTabPanel);
	registerComponent(app, 'GTabPanels', GTabPanels);
	registerComponent(app, 'GTable', GTable);
	registerComponent(app, 'GTabs', GTabs);
	registerComponent(app, 'GText', GText);
	registerComponent(app, 'GTextarea', GTextarea);
	registerComponent(app, 'GTooltip', GTooltip);
	registerComponent(app, 'GTransition', GTransition);
	registerComponent(app, 'GTransitionGroup', GTransitionGroup);
	registerComponent(app, 'GExpandTransition', GExpandTransition);
}

function resolveThemeOptions(
	theme: GradientUIOptions['theme']
): GradientUIThemeOptions {
	if (theme == null || theme === false) return {};
	if (typeof theme === 'string' || typeof theme === 'number') {
		return {
			seed: theme
		};
	}
	return theme;
}

export function createGradientUI(
	options: GradientUIOptions = {}
): Plugin<GradientUIOptions | undefined> {
	return {
		install(app: App, inlineOptions: GradientUIOptions = {}) {
			const resolvedOptions: GradientUIOptions = {
				...options,
				...inlineOptions,
				defaults: {
					...(options.defaults ?? {}),
					...(inlineOptions.defaults ?? {})
				}
			};

			installDefaults(app, resolvedOptions.defaults);
			registerComponents(app);

			app.directive('gradient-icon', vGradientIcon);
			app.directive('gradient-text', vGradientText);
			app.directive('loading', vLoading);
			app.directive('mask', vMask);
			app.directive('ripple', vRipple);
			app.directive('tooltip', vTooltip);

			if (resolvedOptions.icons !== false) {
				installIcons(
					app,
					typeof resolvedOptions.icons === 'object'
						? resolvedOptions.icons
						: undefined
				);
			}

			if (resolvedOptions.theme !== false) {
				installTheme(
					app,
					createTheme(resolveThemeOptions(resolvedOptions.theme))
				);
			}
		}
	};
}

export const GradientUI: Plugin<GradientUIOptions | undefined> = {
	install(app: App, options: GradientUIOptions = {}) {
		createGradientUI(options).install?.(app);
	}
};

export default GradientUI;
