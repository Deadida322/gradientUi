import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		hookTimeout: 240_000,
		include: ['tests/nuxt/**/*.test.ts'],
		testTimeout: 30_000
	}
});
