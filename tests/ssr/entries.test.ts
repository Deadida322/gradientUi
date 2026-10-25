import { createRequire } from 'node:module';
import { createSSRApp, h, type Component } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { describe, expect, it } from 'vitest';

import { componentNames } from '@gradient-ui/core/component-names';
import * as core from '@gradient-ui/core';

const require = createRequire(import.meta.url);
const publicEntries = [
	'index',
	'component-names',
	'plugin',
	'components',
	'directives',
	'services',
	'ssr',
	'theme',
	'use'
] as const;

describe('published core entries', () => {
	it('keeps the shared file item internal', () => {
		expect(core).not.toHaveProperty('GFileItem');
	});
	it('imports and requires every executable public entry', async () => {
		for (const entry of publicEntries) {
			const specifier =
				entry === 'index'
					? '@gradient-ui/core'
					: `@gradient-ui/core/${entry}`;
			const imported = await import(/* @vite-ignore */ specifier);
			const required = require(specifier);
			expect(Object.keys(imported).length).toBeGreaterThan(0);
			expect(Object.keys(required).length).toBeGreaterThan(0);
		}

		for (const name of componentNames) {
			const specifier = `@gradient-ui/core/components/${name}`;
			const imported = await import(/* @vite-ignore */ specifier);
			const required = require(specifier);
			expect(imported.default ?? imported[name]).toBeTruthy();
			expect(required.default ?? required[name]).toBeTruthy();
		}
	});

	it('renders representative public components without browser globals', async () => {
		const fixtures: Array<{
			component: Component;
			content: string;
			name: string;
			props?: Record<string, unknown>;
		}> = [
			{ component: core.GText, content: 'public text', name: 'GText' },
			{
				component: core.GButton,
				content: 'public button',
				name: 'GButton'
			},
			{
				component: core.GGradient,
				content: 'public gradient',
				name: 'GGradient',
				props: { borderWidth: 1 }
			}
		];

		for (const { component, content, name, props } of fixtures) {
			const render = () => {
				const app = createSSRApp({
					render: () => h(component, props, () => content)
				});
				app.use(core.createGradientUI({ components: false }));
				return renderToString(app);
			};
			const [first, second] = await Promise.all([render(), render()]);
			expect(first, name).toBe(second);
			expect(first, name).toContain(content);
		}
	});
});
