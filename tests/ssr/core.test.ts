/* eslint-disable vue/one-component-per-file */
import { createSSRApp, defineComponent, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { describe, expect, it } from 'vitest';
import * as ssrEntry from '../../dist/ssr.mjs';
import * as useEntry from '../../dist/use.mjs';
import {
	canUseDom,
	createGradientUIHead,
	createClientElementRegistry,
	getClientDocument,
	getClientRuntime,
	getClientWindow,
	mountClientComponent,
	mountClientStyle,
	resolveClientTarget,
	runOnClient,
	installSsrViewport
} from '../../dist/ssr.mjs';
import { useBreakpoints } from '../../dist/use.mjs';
import {
	GButton,
	GCheckbox,
	GExpansion,
	GModal,
	GSnackbar,
	GText,
	createDefaultTheme,
	createGradientUI,
	getGradientUIServices,
	useLoading,
	useSnackbar,
	useTheme
} from '../../dist/index.mjs';

const ThemeProbe = defineComponent({
	name: 'ThemeProbe',
	setup() {
		const theme = useTheme();
		expect(theme?.result.value).toBeTruthy();
		expect(theme?.result.value.cssText).toMatch(/--g-theme-/);
		const snackbar = useSnackbar();
		expect(useSnackbar()).toBe(snackbar);
		expect(snackbar.show('server no-op').id).toBe(-1);
		const loading = useLoading();
		expect(useLoading()).toBe(loading);
		loading.show({ text: 'server no-op' });
		return () => h('span', { class: 'theme-probe' }, theme?.mode.value);
	}
});

const Root = defineComponent({
	name: 'SSRSmokeRoot',
	setup: () => () =>
		h('main', [
			h(ThemeProbe),
			h(GText, { type: 'subtitle-1', label: 'SSR subtitle' }),
			h(GButton, { borderWidth: 0.5 }, { default: () => 'Button' }),
			h(GCheckbox, { label: 'Checkbox', modelValue: true }),
			h(
				GExpansion,
				{ defaultOpen: true },
				{
					default: () => 'Expansion content',
					header: () => 'Expansion header'
				}
			),
			h(GModal, { modelValue: true }, { default: () => 'Modal content' }),
			h(GSnackbar, {
				defaultOpen: true,
				text: 'Direct SSR snackbar',
				timeout: 30_000
			})
		])
});

const render = async () => {
	const app = createSSRApp(Root);
	app.use(createGradientUI({ theme: { mode: 'dark', seed: '#6750a4' } }));
	return renderToString(app);
};

const renderViewport = async (
	viewport: { width?: number; height?: number },
	overrides?: { initialWidth?: number; initialHeight?: number }
) => {
	const Probe = defineComponent({
		name: 'ViewportProbe',
		setup() {
			const breakpoints = useBreakpoints(undefined, overrides);
			return () =>
				h(
					'span',
					`${breakpoints.width.value}x${breakpoints.height.value}:${breakpoints.name.value}`
				);
		}
	});
	const app = createSSRApp(Probe);
	installSsrViewport(app, viewport);
	return renderToString(app);
};

describe('@gradient-ui/core SSR', () => {
	it('exposes deterministic SSR-safe behavior', async () => {
		const generatedTheme = createDefaultTheme('#6750a4', 'dark');
		expect(generatedTheme.classes).toEqual([
			'g-theme--material',
			'g-theme--dark'
		]);
		expect(generatedTheme.cssText).toMatch(/\.g-theme--material/);
		expect(generatedTheme.themeCSS).toBeNull();

		for (const name of [
			'canUseDom',
			'mountClientComponent',
			'mountClientStyle'
		] as const) {
			expect(typeof ssrEntry[name]).toBe('function');
		}
		for (const name of [
			'useSsrId',
			'defineAppScopedState',
			'onClientMounted',
			'useHydrated',
			'useSsrTeleport'
		] as const) {
			expect(typeof ssrEntry[name]).toBe('function');
			expect(typeof useEntry[name]).toBe('function');
		}

		expect(canUseDom()).toBe(false);
		expect(getClientWindow()).toBeNull();
		expect(getClientDocument()).toBeNull();
		expect(getClientRuntime()).toBeNull();
		expect(runOnClient(() => 'client')).toBeNull();
		expect(resolveClientTarget()).toBeNull();
		expect(mountClientComponent(ThemeProbe)).toBeNull();
		expect(mountClientStyle('server-style', 'body {}')).toBeNull();

		let registryFactoryCalled = false;
		const registry = createClientElementRegistry();
		registry.mount('server-entry', () => {
			registryFactoryCalled = true;
			throw new Error('client element factory must not run during SSR');
		})();
		registry.clear();
		expect(registryFactoryCalled).toBe(false);

		const [first, second] = await Promise.all([render(), render()]);
		expect(first).toBe(second);
		expect(first).toMatch(/Expansion content/);
		expect(first).toMatch(/g-gradient-border-layer/);
		expect(first).toContain('maskUnits="userSpaceOnUse"');
		expect(first).toContain('--g-gradient-container-radius:');
		expect(first).not.toContain('viewBox="0 0 1 1"');
		expect(first).toMatch(
			/<span class="g-text__label g-title__label"[^>]*>[^]*?SSR subtitle/
		);
		expect(first).toMatch(/Modal content/);
		expect(first).toMatch(/Direct SSR snackbar/);
		expect(first).not.toMatch(/crypto|randomUUID|undefined/);

		const firstApp = createSSRApp(Root);
		const secondApp = createSSRApp(Root);
		firstApp.use(createGradientUI());
		secondApp.use(createGradientUI());
		expect(getGradientUIServices(firstApp)).toBe(
			getGradientUIServices(firstApp)
		);
		expect(getGradientUIServices(firstApp)).not.toBe(
			getGradientUIServices(secondApp)
		);
		expect(() => useSnackbar()).toThrow(/requires Vue setup context/);
		expect(() => useLoading()).toThrow(/requires Vue setup context/);
	});

	it('keeps initial viewport state isolated per SSR application', async () => {
		const [small, large] = await Promise.all([
			renderViewport({ width: 640, height: 480 }),
			renderViewport({ width: 1440, height: 900 })
		]);

		expect(small).toContain('640x480:sm');
		expect(large).toContain('1440x900:lg');
		expect(
			await renderViewport(
				{ width: 640, height: 480 },
				{ initialWidth: 900, initialHeight: 700 }
			)
		).toContain('900x700:md');
		expect(await renderViewport({})).toContain('0x0:sm');
	});

	it('creates pure head descriptors with stable style ids', async () => {
		const createHead = (seed: string, nonce: string) =>
			createGradientUIHead({
				theme: { mode: 'dark', seed },
				modeClasses: { light: 'light-mode', dark: 'dark-mode' },
				nonce
			});
		const [first, second] = await Promise.all([
			Promise.resolve(createHead('#6750a4', 'first-nonce')),
			Promise.resolve(createHead('#006e1c', 'second-nonce'))
		]);

		expect(first.htmlAttrs.class).toEqual([
			'g-theme--material',
			'dark-mode'
		]);
		expect(first.style.map((style) => style.id)).toEqual([
			'g-theme-style',
			'g-color-style',
			'g-gradient-style'
		]);
		expect(
			first.style.every((style) => style.nonce === 'first-nonce')
		).toBe(true);
		expect(first.style[0]?.textContent).toContain(
			'.g-theme--material.light-mode'
		);
		expect(first.style[0]?.textContent).toContain(
			'.g-theme--material.dark-mode'
		);
		expect(
			second.style.every((style) => style.nonce === 'second-nonce')
		).toBe(true);
		expect(second.style[0]?.textContent).not.toBe(
			first.style[0]?.textContent
		);
		expect(
			createGradientUIHead({ includeModeClass: false }).htmlAttrs.class
		).toEqual(['g-theme--material']);
	});
});
