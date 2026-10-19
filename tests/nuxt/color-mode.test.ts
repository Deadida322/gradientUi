import { fileURLToPath } from 'node:url';
import { $fetch, createPage, setup, url } from '@nuxt/test-utils/e2e';
import { describe, expect, it } from 'vitest';
import type { ConsoleMessage, PageError } from 'playwright';

describe('@gradient-ui/nuxt color mode', async () => {
	await setup({
		browser: true,
		rootDir: fileURLToPath(
			new URL('../fixtures/nuxt-color-mode', import.meta.url)
		),
		server: true
	});

	it('uses the color-mode cookie during SSR and toggles after hydration', async () => {
		const html = await $fetch('/', {
			headers: { cookie: 'nuxt-color-mode=dark' }
		});
		expect(html).toContain('g-theme--dark');
		expect(html).toContain('.g-theme--material.g-theme--light');
		expect(html).toContain('.g-theme--material.g-theme--dark');

		const page = await createPage();
		const browserErrors: string[] = [];
		const collectConsoleError = (message: ConsoleMessage) => {
			const text = message.text();
			if (
				message.type() === 'error' ||
				/hydration|mismatch|hydrated but contains/i.test(text)
			)
				browserErrors.push(`console.${message.type()}: ${text}`);
		};
		const collectPageError = (error: PageError) => {
			browserErrors.push(`pageerror: ${error.message}`);
		};
		page.on('console', collectConsoleError);
		page.on('pageerror', collectPageError);
		await page.context().addCookies([
			{
				name: 'nuxt-color-mode',
				value: 'dark',
				url: url('/')
			}
		]);
		await page.goto(url('/'), { waitUntil: 'networkidle' });
		expect(await page.locator('html').getAttribute('class')).toContain(
			'g-theme--dark'
		);
		await page.getByTestId('toggle-theme').click();
		expect(await page.locator('html').getAttribute('class')).toContain(
			'g-theme--light'
		);
		expect(browserErrors).toEqual([]);
		await page.close();
	});
});
