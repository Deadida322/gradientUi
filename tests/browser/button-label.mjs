import assert from 'node:assert/strict';
import console from 'node:console';
import { readFile } from 'node:fs/promises';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { chromium } from 'playwright';
import { GButton, createGradientUI } from '../../dist/index.mjs';

const app = createSSRApp({
	render: () =>
		h('div', [
			h(GButton, { iconButton: 'github', 'aria-label': 'GitHub' }),
			h(GButton, { iconButton: 'npm', 'aria-label': 'npm' }),
			h(GButton, { isIconButton: true, 'aria-label': 'Custom' }, () =>
				h('svg', { width: 32, height: 32 })
			),
			h(GButton, {
				id: 'text-button',
				style: 'width: 120px',
				label: 'A long text label that should use an ellipsis'
			})
		])
});
app.use(createGradientUI());
const html = await renderToString(app);
const browser = await chromium.launch({ headless: true });
try {
	const page = await browser.newPage();
	await page.setContent(html);
	await page.addStyleTag({
		content: await readFile(
			new URL('../../dist/style.css', import.meta.url),
			'utf8'
		)
	});
	for (const label of ['GitHub', 'npm', 'Custom']) {
		const result = await page
			.getByRole('button', { name: label, exact: true })
			.locator('.g-button__label')
			.evaluate((element) => {
				const style = getComputedStyle(element);
				const icon = element.firstElementChild.getBoundingClientRect();
				const box = element.getBoundingClientRect();
				return {
					overflow: style.overflow,
					shrink: style.flexShrink,
					width: box.width,
					height: box.height,
					iconWidth: icon.width,
					iconHeight: icon.height
				};
			});
		assert.equal(
			result.overflow,
			'visible',
			`${label} must not be clipped`
		);
		assert.equal(result.shrink, '0');
		assert.ok(
			result.width >= result.iconWidth &&
				result.height >= result.iconHeight
		);
	}
	const text = await page
		.locator('#text-button .g-button__label')
		.evaluate((element) => ({
			overflow: getComputedStyle(element).overflow,
			ellipsis: getComputedStyle(element).textOverflow,
			truncated: element.scrollWidth > element.clientWidth
		}));
	assert.deepEqual(text, {
		overflow: 'hidden',
		ellipsis: 'ellipsis',
		truncated: true
	});
	console.log('Button icon and text overflow browser checks passed');
} finally {
	await browser.close();
}
