import { fileURLToPath } from 'node:url';
import { $fetch, createPage, setup, url } from '@nuxt/test-utils/e2e';
import type { ConsoleMessage, PageError } from 'playwright';
import { describe, expect, it } from 'vitest';

describe('@gradient-ui/nuxt SSR fixture', async () => {
	await setup({
		browser: true,
		rootDir: fileURLToPath(new URL('../fixtures/nuxt', import.meta.url)),
		server: true
	});

	it('renders components and request-local theme head', async () => {
		const html = await $fetch('/');

		expect(html).toContain('SSR button');
		expect(html).toContain('SSR content');
		expect(html).toContain('data-testid="ssr-image"');
		expect(html).toContain('SSR image overlay');
		expect(html).toContain('g-img__image');
		expect(html).toContain('SSR teleported modal');
		expect(html).toContain('data-shared-services="true"');
		expect(html).toContain('id="g-theme-style"');
		expect(html).toContain('id="g-color-style"');
		expect(html).toContain('id="g-gradient-style"');
		expect(html).toContain('.g-theme--material.g-theme--light');
		expect(html).toContain('.g-theme--material.g-theme--dark');
	});

	it('keeps SSR viewport headers isolated between concurrent requests', async () => {
		const [small, large, fallback] = await Promise.all([
			$fetch('/', { headers: { 'sec-ch-viewport-width': '320' } }),
			$fetch('/', { headers: { 'sec-ch-viewport-width': '1440' } }),
			$fetch('/', { headers: { 'sec-ch-viewport-width': 'invalid' } })
		]);

		expect(small).toContain('data-ssr-viewport-width="320"');
		expect(large).toContain('data-ssr-viewport-width="1440"');
		expect(fallback).toContain('data-ssr-viewport-width="1024"');
		expect(small).toContain('data-ssr-viewport-height="768"');
	});

	it('renders overlays at the server target before hydration', async () => {
		const page = await createPage();
		await page.route('**/*', (route) =>
			route.request().resourceType() === 'script'
				? route.abort()
				: route.continue()
		);
		await page.goto(url('/'), { waitUntil: 'networkidle' });
		expect(await page.locator('#teleports .g-modal').count()).toBe(1);
		expect(await page.locator('#__nuxt .g-modal').count()).toBe(0);
		expect(await page.locator('main').getAttribute('data-hydrated')).toBe(
			'false'
		);
		await page.close();
	});

	it('hydrates client-only behavior without errors', async () => {
		const page = await createPage();
		const browserErrors: string[] = [];
		const collectConsoleError = (message: ConsoleMessage) => {
			const text = message.text();
			if (
				message.type() === 'error' ||
				/hydration|mismatch|hydrated but contains/i.test(text)
			) {
				browserErrors.push(`console.${message.type()}: ${text}`);
			}
		};
		const collectPageError = (error: PageError) => {
			browserErrors.push(`pageerror: ${error.message}`);
		};

		page.on('console', collectConsoleError);
		page.on('pageerror', collectPageError);

		const response = await page.goto(url('/'), {
			waitUntil: 'networkidle'
		});
		expect(response?.status()).toBe(200);
		await page.locator('main[data-hydrated="true"]').waitFor();
		await page.getByTestId('ssr-image').locator('img').waitFor();

		for (const id of [
			'g-theme-style',
			'g-color-style',
			'g-gradient-style'
		]) {
			expect(await page.locator(`#${id}`).count()).toBe(1);
		}

		await page.locator('#teleports > .base-overlay .g-modal').waitFor();
		expect(await page.locator('#__nuxt .g-modal').count()).toBe(0);
		await page.getByRole('button', { name: 'Close modal' }).click();
		await page.locator('.g-modal').waitFor({ state: 'detached' });

		await page.getByTestId('open-drawer').click();
		await page.getByRole('dialog', { name: 'Hydration drawer' }).waitFor();
		await page.getByRole('button', { name: 'Close drawer' }).click();
		await page.locator('.g-drawer').waitFor({ state: 'detached' });

		await page.getByTestId('tooltip-target').hover();
		await page.getByRole('tooltip').waitFor();
		await page.getByTestId('directive-tooltip-target').hover();
		await page.getByText('Directive tooltip', { exact: true }).waitFor();

		await page
			.locator('#directive-loading-target')
			.getByText('Directive loading', { exact: true })
			.waitFor();
		await page.getByTestId('show-snackbar').click();
		await page.getByText('Hydrated snackbar').waitFor();
		await page.getByTestId('show-loading').click();
		await page
			.locator('#service-loading-target')
			.getByText('Hydrated loading', { exact: true })
			.waitFor();

		expect(browserErrors).toEqual([]);
		await page.close();
	});
});
