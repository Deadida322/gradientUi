import { fileURLToPath } from 'node:url';
import { fetch, setup } from '@nuxt/test-utils/e2e';
import { describe, expect, it } from 'vitest';

describe('@gradient-ui/nuxt CSP', async () => {
	await setup({
		rootDir: fileURLToPath(
			new URL('../fixtures/nuxt-csp', import.meta.url)
		),
		server: true
	});

	it('adds the per-request CSP nonce to theme styles', async () => {
		const [first, second] = await Promise.all([fetch('/'), fetch('/')]);
		const assertNonce = (response: typeof first) => {
			const csp = response.headers.get('content-security-policy') ?? '';
			const nonce = /'nonce-([^']+)'/.exec(csp)?.[1];
			expect(nonce).toBeTruthy();
			return response.text().then((body) => {
				for (const id of [
					'g-theme-style',
					'g-color-style',
					'g-gradient-style'
				]) {
					const style = new RegExp(
						`<style\\b(?=[^>]*\\bid="${id}")[^>]*>`,
						'i'
					).exec(body)?.[0];
					expect(style).toContain(`nonce="${nonce}"`);
				}
				return nonce;
			});
		};

		const [firstNonce, secondNonce] = await Promise.all([
			assertNonce(first),
			assertNonce(second)
		]);
		expect(firstNonce).not.toBe(secondNonce);
	});
});
