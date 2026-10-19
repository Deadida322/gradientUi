import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const output = new URL(
	'../fixtures/nuxt-csp/.output/public/index.html',
	import.meta.url
);

describe('@gradient-ui/nuxt static CSP', () => {
	it('keeps generated theme styles allowed without a request nonce', async () => {
		const html = await readFile(output, 'utf8');
		const csp = html.match(
			/<meta[^>]+http-equiv="Content-Security-Policy"[^>]*>/i
		)?.[0];

		expect(csp).toContain('style-src');
		expect(csp).toContain('unsafe-inline');
		expect(html).not.toContain('{{nonce}}');
		for (const id of [
			'g-theme-style',
			'g-color-style',
			'g-gradient-style'
		]) {
			expect(html).toContain(`id="${id}"`);
		}
	});
});
