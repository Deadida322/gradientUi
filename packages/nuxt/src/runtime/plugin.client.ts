// nuxt-module-build compiles runtime entries outside the package TS program.
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./options.d.ts" />

import { watch } from 'vue';
import { defineNuxtPlugin } from 'nuxt/app';
import type { GradientUITheme } from '@gradient-ui/core/theme';
import integration from '#gradient-ui-nuxt-options';

interface ColorModeState {
	value: string;
	preference: string;
}

export default defineNuxtPlugin({
	name: 'gradient-ui:client-theme',
	dependsOn: ['gradient-ui:runtime'],
	setup(nuxtApp) {
		if (!integration.colorMode) return;

		const colorMode = nuxtApp.$colorMode as ColorModeState | undefined;
		const theme = nuxtApp.$gradientThemeRuntime as
			| GradientUITheme
			| undefined;
		if (!colorMode || !theme) return;

		const setMode = theme.setMode;
		theme.setMode = (mode) => {
			colorMode.preference = mode;
			return setMode(mode);
		};
		theme.toggleMode = () =>
			theme.setMode(theme.mode.value === 'dark' ? 'light' : 'dark');
		watch(
			() => colorMode.value,
			(value) => {
				if (
					(value === 'light' || value === 'dark') &&
					theme.mode.value !== value
				)
					setMode(value);
			},
			{ immediate: true }
		);
	}
});
