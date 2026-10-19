import { fileURLToPath } from 'node:url';
import { $fetch, setup } from '@nuxt/test-utils/e2e';
import { describe, expect, it } from 'vitest';

describe('@gradient-ui/nuxt options', async () => {
	await setup({
		rootDir: fileURLToPath(
			new URL('../fixtures/nuxt-options', import.meta.url)
		),
		server: true
	});

	it('supports explicit components without module CSS or generated theme styles', async () => {
		const html = await $fetch('/');
		expect(html).toContain('data-testid="explicit-button"');
		expect(html).toContain('Explicit component');
		expect(html).not.toContain('id="g-theme-style"');
		expect(html).not.toContain('id="g-color-style"');
		expect(html).not.toContain('id="g-gradient-style"');
		expect(html).not.toContain('@gradient-ui/core/style.css');
	});
});
