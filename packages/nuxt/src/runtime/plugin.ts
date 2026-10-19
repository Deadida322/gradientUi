// nuxt-module-build compiles runtime entries outside the package TS program.
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./options.d.ts" />

import {
	installGradientUIRuntime,
	resolveThemeOptions
} from '@gradient-ui/core/plugin';
import {
	createTheme,
	installTheme,
	type GradientUITheme
} from '@gradient-ui/core/theme';
import {
	createGradientUIHead,
	installSsrTeleport,
	installSsrViewport,
	type SsrViewport
} from '@gradient-ui/core/ssr';
import {
	getGradientUIServices,
	type GradientUIServices
} from '@gradient-ui/core/services';
import {
	defineNuxtPlugin,
	useHead,
	useRequestHeaders,
	useState
} from 'nuxt/app';
import options from '#gradient-ui-options';
import integration from '#gradient-ui-nuxt-options';

interface ColorModeState {
	value: string;
	preference: string;
	unknown: boolean;
}

/**
 * `@nuxtjs/color-mode` deliberately leaves `value` at its configured default
 * during SSR. The request cookie is stored in `preference` instead. Reading
 * only `value` makes Gradient UI render the default on the server and the
 * cookie value on the client, which is a real hydration mismatch.
 */
const resolveColorMode = (
	colorMode: ColorModeState
): 'light' | 'dark' | null => {
	if (
		colorMode.unknown &&
		(colorMode.preference === 'light' || colorMode.preference === 'dark')
	)
		return colorMode.preference;

	return colorMode.value === 'light' || colorMode.value === 'dark'
		? colorMode.value
		: null;
};

const toNonNegativeFiniteNumber = (value: unknown): number | undefined => {
	if (typeof value !== 'number' && typeof value !== 'string')
		return undefined;
	if (typeof value === 'string' && value.trim() === '') return undefined;
	const number = Number(value);
	return Number.isFinite(number) && number >= 0 ? number : undefined;
};

const resolveSsrViewport = (): SsrViewport => {
	const configuredHeader =
		integration.ssr.viewportWidthHeader.trim().toLowerCase() ||
		'sec-ch-viewport-width';
	const headers = useRequestHeaders([configuredHeader, 'viewport-width']);
	const width =
		toNonNegativeFiniteNumber(
			headers[configuredHeader as Lowercase<string>]
		) ??
		toNonNegativeFiniteNumber(headers['viewport-width']) ??
		toNonNegativeFiniteNumber(integration.ssr.initialWidth) ??
		0;
	const height = toNonNegativeFiniteNumber(integration.ssr.initialHeight);

	return { width, ...(height === undefined ? {} : { height }) };
};

export default defineNuxtPlugin<{
	gradientUI: GradientUIServices;
	gradientThemeRuntime: GradientUITheme | undefined;
}>({
	name: 'gradient-ui:runtime',
	setup(nuxtApp) {
		const viewport = useState<SsrViewport>(
			'gradient-ui:ssr-viewport',
			resolveSsrViewport
		);
		installSsrViewport(nuxtApp.vueApp, viewport.value);
		installGradientUIRuntime(nuxtApp.vueApp, { ...options, theme: false });
		installSsrTeleport(nuxtApp.vueApp, { target: '#teleports' });
		const services = getGradientUIServices(nuxtApp.vueApp);
		if (options.theme === false)
			return {
				provide: {
					gradientUI: services,
					gradientThemeRuntime: undefined
				}
			};

		const themeOptions = resolveThemeOptions(options.theme);
		const theme = createTheme({ ...themeOptions, applyToDom: false });
		installTheme(nuxtApp.vueApp, theme);
		const colorMode = integration.colorMode
			? (nuxtApp.$colorMode as ColorModeState | undefined)
			: undefined;
		if (integration.colorMode && !colorMode) {
			throw new Error(
				'Gradient UI color mode integration requires @nuxtjs/color-mode.'
			);
		}
		const colorModeValue = colorMode ? resolveColorMode(colorMode) : null;
		if (colorModeValue) theme.setMode(colorModeValue);

		useHead(() => {
			const activeMode = colorMode
				? (resolveColorMode(colorMode) ?? theme.mode.value)
				: theme.mode.value;
			const head = createGradientUIHead({
				theme: {
					...themeOptions,
					mode: activeMode,
					seed: theme.seed.value
				},
				...(colorMode
					? {
							modeClasses: {
								light: `${integration.classPrefix}light${integration.classSuffix}`,
								dark: `${integration.classPrefix}dark${integration.classSuffix}`
							}
						}
					: {})
			});

			return {
				htmlAttrs: head.htmlAttrs,
				style: head.style.map(({ id, nonce, textContent }) => ({
					key: id,
					id,
					...(nonce ? { nonce } : {}),
					children: textContent
				}))
			};
		});

		return {
			provide: {
				gradientUI: services,
				gradientThemeRuntime: theme
			}
		};
	}
});
