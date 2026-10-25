import assert from 'node:assert/strict';
import console from 'node:console';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
try {
	const css = await readFile(
		new URL('../../dist/style.css', import.meta.url),
		'utf8'
	);
	await page.setContent(`
        <div id="fixtures">
            <button id="plain-button">App button</button>
            <a id="plain-link" href="#plain">App link</a>
            <button id="focus-button" class="g-native-probe">Focus</button>
            <button id="disabled-button" class="g-native-probe" disabled>Disabled</button>
            <button id="override-button" class="app-override g-native-probe">Override</button>
            <details><summary class="g-native-probe">Details</summary>Content</details>
        </div>
    `);
	const plainBefore = await page
		.locator('#plain-button, #plain-link')
		.evaluateAll((elements) =>
			elements.map((element) => {
				const style = getComputedStyle(element);
				return {
					padding: style.padding,
					border: style.borderWidth,
					decoration: style.textDecorationLine,
					color: style.color
				};
			})
		);
	await page.addStyleTag({ content: css });
	await page.addStyleTag({
		content: '.app-override { padding: 9px; color: rgb(12, 34, 56); }'
	});
	const plainAfter = await page
		.locator('#plain-button, #plain-link')
		.evaluateAll((elements) =>
			elements.map((element) => {
				const style = getComputedStyle(element);
				return {
					padding: style.padding,
					border: style.borderWidth,
					decoration: style.textDecorationLine,
					color: style.color
				};
			})
		);
	assert.deepEqual(
		plainAfter,
		plainBefore,
		'Native application controls outside the library namespace must keep their defaults'
	);
	for (const component of [
		'g-native-probe',
		'g-card',
		'g-avatar',
		'g-text',
		'g-divider',
		'g-gradient'
	]) {
		const styles = await page.evaluate((className) => {
			const container = document.getElementById('fixtures');
			return ['div', 'button', 'a', 'fieldset', 'h2', 'p'].map((tag) => {
				const element = document.createElement(tag);
				element.className = className;
				element.textContent = 'Content';
				if (tag === 'a') element.setAttribute('href', '#test');
				container.append(element);
				const style = getComputedStyle(element);
				return {
					tag,
					padding: style.padding,
					margin: style.margin,
					border: style.borderWidth,
					font: style.font,
					color: style.color,
					decoration: style.textDecorationLine,
					background: style.backgroundColor,
					textAlign: style.textAlign
				};
			});
		}, component);
		for (const actual of styles.slice(1))
			assert.deepEqual(
				actual,
				{ ...styles[0], tag: actual.tag },
				`${component} must not inherit ${actual.tag} defaults`
			);
	}
	const fieldPadding = await page.evaluate(() => {
		const button = document.createElement('button');
		button.className = 'g-field-base__native g-file-control__browse';
		document.body.append(button);
		return getComputedStyle(button).padding;
	});
	assert.equal(
		fieldPadding,
		'0px',
		'File input browse controls have no native padding'
	);
	assert.equal(
		await page
			.locator('#override-button')
			.evaluate((element) => getComputedStyle(element).padding),
		'9px'
	);
	await page.locator('#focus-button').focus();
	assert.notEqual(
		await page
			.locator('#focus-button')
			.evaluate((element) => getComputedStyle(element).outlineStyle),
		'none',
		'Native focus outlines must not be cleared'
	);
	assert.equal(await page.locator('#disabled-button').isDisabled(), true);
	await page.locator('summary').click();
	assert.equal(
		await page.locator('details').getAttribute('open'),
		'',
		'Native summary interaction is preserved'
	);
	console.log('Native tag reset browser checks passed');
} finally {
	await browser.close();
}
