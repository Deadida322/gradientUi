import { fileURLToPath } from 'node:url';
import { $fetch, setup } from '@nuxt/test-utils/e2e';
import { describe, expect, it } from 'vitest';

describe('@gradient-ui/nuxt configFile', async () => {
	await setup({
		rootDir: fileURLToPath(
			new URL('../fixtures/nuxt-config-file', import.meta.url)
		),
		server: true
	});

	it('preserves component-valued icon configuration', async () => {
		const html = await $fetch('/');
		expect(html).toContain('data-testid="config-icon"');
		expect(html).toContain('Config icon: proof');
	});
});
