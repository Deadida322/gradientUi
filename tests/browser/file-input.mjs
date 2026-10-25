import assert from 'node:assert/strict';
import console from 'node:console';
import { Buffer } from 'node:buffer';
import process from 'node:process';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
await mkdir('.file-controls.local', { recursive: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.addInitScript(() => {
	const active = new Set();
	const create = URL.createObjectURL.bind(URL);
	const revoke = URL.revokeObjectURL.bind(URL);
	URL.createObjectURL = (blob) => {
		const url = create(blob);
		active.add(url);
		return url;
	};
	URL.revokeObjectURL = (url) => {
		active.delete(url);
		revoke(url);
	};
	globalThis.__fileObjectUrls = active;
});
await page.context().addCookies([
	{
		name: 'gradient-ui-docs-theme',
		value: 'dark',
		url: 'http://127.0.0.1:5173'
	}
]);
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
const baseURL = process.env.FILE_INPUT_BASE_URL ?? 'http://127.0.0.1:5173';
const navigate = async (slug) => {
	await page.goto(`${baseURL}/docs/components/${slug}`, {
		waitUntil: 'domcontentloaded'
	});
	await page.waitForFunction(
		() =>
			document.querySelector('.file-example .g-file-control')
				?.__vueParentComponent,
		undefined,
		{ timeout: 60_000 }
	);
	return page.locator('.file-example .g-file-control').first();
};
try {
	const image = await navigate('image-dropzone');
	assert.equal(
		await image.locator('svg.g-file-dropzone__border rect').count(),
		1
	);
	const border = image.locator('.g-file-dropzone__border');
	const restingColor = await border.evaluate(
		(element) => getComputedStyle(element).color
	);
	await image
		.locator('.g-file-dropzone')
		.hover({ position: { x: 12, y: 12 } });
	await page.waitForFunction(
		(resting) =>
			getComputedStyle(
				document.querySelector('.file-example .g-file-dropzone__border')
			).color !== resting,
		restingColor
	);
	assert.equal(
		await image.locator('.g-file-dropzone_dragging').count(),
		0,
		'Hover must work without a drag operation'
	);
	assert.ok(
		await image
			.locator('.g-file-dropzone__border rect')
			.evaluate(
				(element) =>
					parseFloat(getComputedStyle(element).strokeDasharray) >= 16
			)
	);
	await page.waitForFunction(
		() =>
			new DOMMatrix(
				getComputedStyle(
					document.querySelector(
						'.file-example .g-file-dropzone__background'
					)
				).transform
			).a > 1.03
	);
	await page.emulateMedia({ reducedMotion: 'reduce' });
	assert.equal(
		await image
			.locator('.g-file-dropzone__background')
			.evaluate(
				(element) =>
					new DOMMatrix(getComputedStyle(element).transform).a
			),
		1
	);
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	const customIcon = page
		.locator('.file-example-states .g-file-control')
		.filter({ hasText: 'Custom icon' });
	assert.equal(await customIcon.locator('[data-file-icon]').count(), 1);
	assert.equal(
		await page
			.getByRole('button', { name: 'Browse files', exact: true })
			.count(),
		1
	);
	await image
		.locator('.g-file-dropzone')
		.screenshot({ path: '.file-controls.local/empty.png' });
	const svg = Buffer.from(
		'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="24"><rect width="32" height="24" fill="#b8a1ff"/></svg>'
	);
	const chooser = page.waitForEvent('filechooser');
	await image
		.getByRole('button', { name: 'Choose files', exact: true })
		.press('Enter');
	await (
		await chooser
	).setFiles({
		name: 'sample.svg',
		mimeType: 'image/svg+xml',
		buffer: svg
	});
	await image.getByRole('img', { name: 'sample.svg' }).waitFor();
	assert.equal(
		await image.locator('.g-file-dropzone__background img').count(),
		1
	);
	assert.equal(
		await image.locator('.g-file-dropzone__files').count(),
		0,
		'First image is the background, not a duplicate list item'
	);
	assert.equal(
		await image.getByRole('img', { name: 'sample.svg' }).count(),
		1
	);
	await image.locator('input[type=file]').setInputFiles({
		name: 'broken.png',
		mimeType: 'image/png',
		buffer: Buffer.from('broken image')
	});
	await image
		.getByRole('status')
		.filter({ hasText: 'cannot be decoded' })
		.waitFor();
	assert.equal(
		await image.getByRole('img', { name: 'sample.svg' }).count(),
		1,
		'Invalid replacement must preserve selection'
	);
	await image.locator('.g-file-dropzone').evaluate((element) => {
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(
			new File(['not an image'], 'wrong.txt', { type: 'text/plain' })
		);
		element.dispatchEvent(
			new DragEvent('dragenter', {
				bubbles: true,
				cancelable: true,
				dataTransfer
			})
		);
		element.dispatchEvent(
			new DragEvent('drop', {
				bubbles: true,
				cancelable: true,
				dataTransfer
			})
		);
	});
	await image.getByRole('status').filter({ hasText: 'wrong.txt' }).waitFor();
	assert.equal(
		await image.getByRole('img', { name: 'sample.svg' }).count(),
		1
	);
	await image
		.getByRole('button', { name: 'Remove file: sample.svg', exact: true })
		.click();
	await image.locator('.g-file-dropzone__empty').waitFor();
	await page.waitForFunction(() => globalThis.__fileObjectUrls.size === 0);
	// Re-select the same file after removal; a native input reset must not swallow it.
	await image.locator('input[type=file]').setInputFiles({
		name: 'sample.svg',
		mimeType: 'image/svg+xml',
		buffer: svg
	});
	await image.getByRole('img', { name: 'sample.svg' }).waitFor();
	await image
		.locator('.g-file-dropzone')
		.screenshot({ path: '.file-controls.local/preview.png' });
	await image.locator('input[type=file]').setInputFiles({
		name: 'second.svg',
		mimeType: 'image/svg+xml',
		buffer: svg
	});
	await image
		.locator('.g-file-dropzone__files')
		.getByRole('img', { name: 'second.svg' })
		.waitFor();
	assert.equal(
		await image
			.locator('.g-file-dropzone__files .g-file-control__file')
			.count(),
		1
	);
	assert.equal(
		await image
			.locator('.g-file-dropzone__background')
			.getByRole('img', { name: 'sample.svg' })
			.count(),
		1
	);
	await image.screenshot({ path: '.file-controls.local/multiple.png' });
	const fileItem = image.locator('.g-file-item');
	assert.equal(
		await fileItem.count(),
		1,
		'Remaining files use the standalone file item'
	);
	assert.equal(
		await fileItem.locator('.g-button_text').count(),
		1,
		'Remove action uses GButton text variant'
	);
	assert.ok(
		await fileItem.evaluate(
			(element) =>
				getComputedStyle(element).backgroundColor !==
				getComputedStyle(element.closest('.g-file-control'))
					.backgroundColor
		),
		'File item surface must be distinct from the surrounding theme'
	);
	const cover = await image
		.locator('.g-file-dropzone__background')
		.boundingBox();
	const target = await image.locator('.g-file-dropzone').boundingBox();
	assert.ok(
		cover.width >= target.width && cover.height >= target.height,
		'The first image must cover the drop area'
	);
	await image
		.getByRole('button', { name: 'Remove file: sample.svg', exact: true })
		.click();
	await image
		.locator('.g-file-dropzone__background')
		.getByRole('img', { name: 'second.svg' })
		.waitFor();
	assert.equal(
		await image.locator('.g-file-dropzone__files').count(),
		0,
		'Removing the first image promotes the next image'
	);
	const single = page
		.locator('.file-example-states .g-file-control')
		.filter({ hasText: 'Single file' });
	await single.locator('input[type=file]').setInputFiles({
		name: 'single.svg',
		mimeType: 'image/svg+xml',
		buffer: svg
	});
	await single
		.locator('.g-file-dropzone__background')
		.getByRole('img', { name: 'single.svg' })
		.waitFor();
	assert.equal(await single.locator('.g-file-dropzone__files').count(), 0);
	const input = await navigate('file-input');
	assert.equal(
		await input
			.locator('.g-file-control__browse')
			.evaluate((element) => getComputedStyle(element).padding),
		'0px',
		'The native button must not add padding to the field'
	);
	await input.locator('input[type=file]').setInputFiles({
		name: 'report.txt',
		mimeType: 'text/plain',
		buffer: Buffer.from('report')
	});
	await input
		.locator('.g-file-control__browse')
		.filter({ hasText: 'report.txt' })
		.waitFor();
	assert.deepEqual(
		await input.evaluate((element) =>
			new FormData(element.closest('form'))
				.getAll('attachments')
				.map((file) => file.name)
		),
		['report.txt']
	);
	assert.deepEqual(
		await input.evaluate((element) => {
			const original = element.closest('form');
			const external = document.createElement('form');
			external.id = 'external-file-form';
			document.body.append(external);
			const native = element.querySelector('input[type=file]');
			native.setAttribute('form', external.id);
			const associated = new FormData(external)
				.getAll('attachments')
				.map((file) => file.name);
			const previous = new FormData(original).getAll(
				'attachments'
			).length;
			native.removeAttribute('form');
			external.append(element);
			const moved = new FormData(external)
				.getAll('attachments')
				.map((file) => file.name);
			original.append(element);
			external.remove();
			return { associated, previous, moved };
		}),
		{ associated: ['report.txt'], previous: 0, moved: ['report.txt'] },
		'FormData follows external form association and DOM reparenting'
	);
	assert.equal(
		await page
			.locator('.file-example-states form input[type=file]')
			.isDisabled(),
		true
	);
	await input
		.getByRole('button', { name: 'Clear files', exact: true })
		.click();
	await input
		.locator('.g-file-control__browse')
		.filter({ hasText: 'Choose files' })
		.waitFor();
	const dropzone = await navigate('file-dropzone');
	await dropzone.locator('.g-file-dropzone').evaluate((element) => {
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(
			new File(['report'], 'dropped.txt', { type: 'text/plain' })
		);
		element.dispatchEvent(
			new DragEvent('drop', {
				bubbles: true,
				cancelable: true,
				dataTransfer
			})
		);
	});
	await dropzone.getByText('dropped.txt', { exact: true }).waitFor();
	await page.setViewportSize({ width: 390, height: 844 });
	assert.ok(
		await dropzone.evaluate(
			(element) => element.scrollWidth <= element.clientWidth + 1
		),
		'Control must fit on mobile'
	);
	const imageInput = await navigate('image-input');
	const dimensions = page
		.locator('.file-example-states .g-file-control')
		.filter({ hasText: 'Minimum 64 pixels wide' });
	await dimensions.locator('input[type=file]').setInputFiles({
		name: 'small.svg',
		mimeType: 'image/svg+xml',
		buffer: svg
	});
	await dimensions
		.getByRole('status')
		.filter({ hasText: 'dimensions' })
		.waitFor();
	await dimensions.locator('input[type=file]').setInputFiles({
		name: 'large.svg',
		mimeType: 'image/svg+xml',
		buffer: Buffer.from(
			'<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="red"/></svg>'
		)
	});
	await dimensions.getByRole('img', { name: 'large.svg' }).waitFor();
	await imageInput.locator('input[type=file]').setInputFiles({
		name: 'preview.svg',
		mimeType: 'image/svg+xml',
		buffer: svg
	});
	await imageInput.getByRole('img', { name: 'preview.svg' }).waitFor();
	// A real, large raster exercises intrinsic grid sizing, unlike a tiny SVG.
	const largeRaster = await page.evaluate(() => {
		const canvas = document.createElement('canvas');
		canvas.width = 4000;
		canvas.height = 1000;
		const context = canvas.getContext('2d');
		const gradient = context.createLinearGradient(0, 0, 4000, 1000);
		gradient.addColorStop(0, '#416c8d');
		gradient.addColorStop(1, '#d4bd91');
		context.fillStyle = gradient;
		context.fillRect(0, 0, 4000, 1000);
		return canvas.toDataURL('image/png').split(',')[1];
	});
	const longName = `landscape-${'wide-image-'.repeat(12)}4000x1000.png`;
	await imageInput.locator('input[type=file]').setInputFiles({
		name: longName,
		mimeType: 'image/png',
		buffer: Buffer.from(largeRaster, 'base64')
	});
	const inputPreview = imageInput.getByRole('img', { name: longName });
	await inputPreview.waitFor();
	const inputSizing = await inputPreview.evaluate((element) => ({
		width: element.getBoundingClientRect().width,
		height: element.getBoundingClientRect().height,
		parentHeight: element
			.closest('.g-file-item__preview')
			.getBoundingClientRect().height,
		fit: getComputedStyle(element).objectFit,
		shade: getComputedStyle(
			element.closest('.g-file-item__preview'),
			'::after'
		).backgroundImage
	}));
	assert.equal(inputSizing.fit, 'cover');
	assert.ok(
		inputSizing.width <= 64 && inputSizing.height <= 64,
		'Image input uses a compact square thumbnail'
	);
	assert.ok(Math.abs(inputSizing.height - inputSizing.parentHeight) < 2);
	assert.ok(inputSizing.shade.includes('linear-gradient'));
	await imageInput.screenshot({
		path: '.file-controls.local/image-input-compact.png'
	});
	const themeStyles = [];
	for (const theme of ['dark', 'light']) {
		await page
			.context()
			.addCookies([
				{ name: 'gradient-ui-docs-theme', value: theme, url: baseURL }
			]);
		await page.setViewportSize({ width: 1280, height: 900 });
		const themedImage = await navigate('image-dropzone');
		await page.waitForFunction(
			(value) =>
				document.documentElement.classList.contains(
					`g-theme--${value}`
				),
			theme
		);
		await themedImage.locator('input[type=file]').setInputFiles({
			name: longName,
			mimeType: 'image/png',
			buffer: Buffer.from(largeRaster, 'base64')
		});
		await themedImage.getByRole('img', { name: longName }).waitFor();
		const imageSizing = await themedImage
			.locator('.g-file-dropzone__image img')
			.evaluate((element) => ({
				width: element.getBoundingClientRect().width,
				height: element.getBoundingClientRect().height,
				parentWidth: element
					.closest('.g-file-dropzone__background')
					.getBoundingClientRect().width,
				parentHeight: element
					.closest('.g-file-dropzone__background')
					.getBoundingClientRect().height,
				fit: getComputedStyle(element).objectFit,
				position: getComputedStyle(element).objectPosition,
				naturalWidth: element.naturalWidth
			}));
		assert.equal(imageSizing.fit, 'cover');
		assert.equal(imageSizing.position, '50% 50%');
		assert.equal(imageSizing.naturalWidth, 4000);
		assert.ok(Math.abs(imageSizing.width - imageSizing.parentWidth) < 2);
		assert.ok(
			Math.abs(imageSizing.height - imageSizing.parentHeight) < 2,
			'Large raster must be sized to the container, not its intrinsic grid size'
		);
		const caption = themedImage.locator('.g-file-dropzone__caption');
		assert.equal(await caption.getAttribute('title'), longName);
		const captionStyles = await caption.evaluate((element) => ({
			background: getComputedStyle(element).backgroundColor,
			blur: getComputedStyle(element).backdropFilter,
			overflow: getComputedStyle(element).textOverflow,
			truncated: element.scrollWidth > element.clientWidth
		}));
		assert.equal(captionStyles.overflow, 'ellipsis');
		assert.ok(captionStyles.truncated);
		assert.notEqual(captionStyles.blur, 'none');
		const shade = await themedImage
			.locator('.g-file-dropzone__shade')
			.evaluate((element) => getComputedStyle(element).backgroundImage);
		assert.ok(shade.includes('linear-gradient'));
		themeStyles.push({ shade, background: captionStyles.background });
		await themedImage.screenshot({
			path: `.file-controls.local/large-${theme}.png`
		});
		await page.setViewportSize({ width: 390, height: 844 });
		const captionBox = await caption.boundingBox();
		const dropBox = await themedImage
			.locator('.g-file-dropzone')
			.boundingBox();
		assert.ok(
			captionBox.width <= dropBox.width &&
				captionBox.x + captionBox.width <= dropBox.x + dropBox.width
		);
	}
	assert.notEqual(themeStyles[0].shade, themeStyles[1].shade);
	assert.notEqual(themeStyles[0].background, themeStyles[1].background);
	assert.deepEqual(errors, [], 'No browser errors');
	console.log('File controls browser checks passed');
} finally {
	await browser.close();
}
