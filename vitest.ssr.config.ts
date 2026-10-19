import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['tests/ssr/**/*.test.ts'],
		testTimeout: 30_000
	}
});
