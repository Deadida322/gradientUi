import assert from 'node:assert/strict';
import console from 'node:console';
import { fileURLToPath } from 'node:url';
import { mkdir } from 'node:fs/promises';
import { createServer } from 'vite';
import vue from '@vitejs/plugin-vue';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('../../', import.meta.url));
const server = await createServer({
	configFile: false,
	root: `${root}tests/fixtures/navigation`,
	logLevel: 'error',
	plugins: [vue()],
	css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } },
	resolve: {
		alias: {
			'@': `${root}src`,
			'@gradient-ui/gradient-engine': `${root}packages/gradient-engine/src`
		}
	},
	server: { host: '127.0.0.1', port: 0, fs: { allow: [root] } }
});
await server.listen();
const browser = await chromium.launch({ headless: true });
try {
	const page = await browser.newPage({
		viewport: { width: 900, height: 1100 }
	});
	const errors = [];
	page.on('pageerror', (error) => errors.push(error.message));
	const url = `http://127.0.0.1:${server.httpServer.address().port}`;
	await page.goto(url);
	await page.locator('.bottom-fixture nav').waitFor();
	const aligned = async (container, selected, vertical = false) =>
		page.waitForFunction(
			({ container, selected, vertical }) => {
				const indicator = document.querySelector(
					`${container} .g-navigation-indicator`
				);
				const item = document.querySelector(selected);
				if (
					!indicator ||
					!item ||
					getComputedStyle(indicator).opacity !== '1'
				)
					return false;
				const a = indicator.getBoundingClientRect();
				const b = item.getBoundingClientRect();
				return vertical
					? Math.abs(a.top - b.top) < 2 &&
							Math.abs(a.height - b.height) < 2
					: Math.abs(a.left - b.left) < 2 &&
							Math.abs(a.width - b.width) < 2;
			},
			{ container, selected, vertical }
		);
	const bottom = page.locator('.bottom-fixture nav');
	await aligned('.bottom-fixture', '.bottom-fixture [aria-current="page"]');
	await page.evaluate(() => document.fonts.ready);
	await mkdir('.bottom-navigation.local', { recursive: true });
	await page.screenshot({
		path: '.bottom-navigation.local/preview.png',
		fullPage: true
	});
	await bottom.getByRole('button', { name: 'search', exact: true }).click();
	assert.equal(await page.locator('#selected').textContent(), 'search');
	await aligned('.bottom-fixture', '.bottom-fixture [aria-current="page"]');
	await page.keyboard.press('End');
	assert.equal(
		await page.evaluate(() =>
			document.activeElement.getAttribute('aria-label')
		),
		'saved'
	);
	assert.equal(
		await page.locator('#selected').textContent(),
		'search',
		'Focus does not select destinations'
	);
	await page.keyboard.press('Space');
	assert.equal(await page.locator('#selected').textContent(), 'saved');
	await page.keyboard.press('ArrowRight');
	assert.equal(
		await page.evaluate(() =>
			document.activeElement.getAttribute('aria-label')
		),
		'home'
	);
	await page.locator('#reorder').click();
	await bottom.getByRole('button', { name: 'home', exact: true }).focus();
	await page.keyboard.press('Home');
	assert.equal(
		await page.evaluate(() =>
			document.activeElement.getAttribute('aria-label')
		),
		'saved',
		'Keyboard order follows reordered DOM'
	);
	await aligned('.bottom-fixture', '.bottom-fixture [aria-current="page"]');
	await page.locator('#labels').click();
	assert.equal(
		await bottom.locator('.g-bottom-navigation-item__label').count(),
		0
	);
	assert.equal(
		await bottom
			.getByRole('button', { name: 'saved', exact: true })
			.count(),
		1
	);
	await page.locator('#disable').click();
	assert.ok(
		await bottom
			.locator('button')
			.evaluateAll((elements) => elements.every((el) => el.disabled))
	);
	await page.locator('#disable').click();
	await page.setViewportSize({ width: 390, height: 1100 });
	await aligned('.bottom-fixture', '.bottom-fixture [aria-current="page"]');
	assert.ok(
		await bottom.evaluate((el) => el.scrollWidth <= el.clientWidth + 1)
	);
	await page.locator('#remove').click();
	await page.waitForFunction(
		() =>
			getComputedStyle(
				document.querySelector(
					'.bottom-fixture .g-navigation-indicator'
				)
			).opacity === '0'
	);
	const tabs = page.getByRole('tablist', { name: 'Horizontal tabs' });
	await tabs.getByRole('tab', { name: 'First', exact: true }).focus();
	await page.keyboard.press('ArrowRight');
	await aligned('.tabs-fixture', '.tabs-fixture [aria-selected="true"]');
	assert.equal(
		await tabs
			.getByRole('tab', { name: 'Second', exact: true })
			.getAttribute('aria-selected'),
		'true'
	);
	const vertical = page.getByRole('tablist', { name: 'Vertical tabs' });
	await vertical.getByRole('tab', { name: 'First', exact: true }).focus();
	await page.keyboard.press('ArrowDown');
	await aligned(
		'.vertical-fixture',
		'.vertical-fixture [aria-selected="true"]',
		true
	);
	assert.equal(
		await page.locator('.pill-fixture .g-navigation-indicator').count(),
		0
	);
	await page
		.locator('.navbar-fixture')
		.getByRole('menuitem', { name: 'Second' })
		.click();
	await aligned('.navbar-fixture', '.navbar-fixture [aria-current="page"]');
	assert.ok(
		(await page
			.locator(
				'.morph-fixture .g-bottom-navigation__surface-material-morph-blob'
			)
			.count()) > 0
	);
	assert.ok(
		(
			await page
				.locator('.glass-fixture')
				.evaluate((el) => getComputedStyle(el).backdropFilter)
		).includes('blur')
	);
	assert.equal(
		await page
			.locator('.links-fixture')
			.getByRole('link', { name: 'Linked' })
			.getAttribute('href'),
		'/saved'
	);
	await page.emulateMedia({ reducedMotion: 'reduce' });
	assert.equal(
		await page
			.locator('.tabs-fixture .g-navigation-indicator')
			.evaluate((el) => getComputedStyle(el).transitionDuration),
		'0s'
	);
	await page.goto(`${url}/?router`);
	await page
		.locator('.links-fixture')
		.getByRole('link', { name: 'Linked' })
		.click();
	await aligned('.links-fixture', '.links-fixture [aria-current="page"]');
	assert.deepEqual(errors, []);
	console.log(
		'BottomNavigation, navbar and horizontal/vertical tabs browser checks passed'
	);
} finally {
	await browser.close();
	await server.close();
}
