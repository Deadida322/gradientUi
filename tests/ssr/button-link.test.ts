import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { createMemoryHistory, createRouter } from 'vue-router';
import { describe, expect, it } from 'vitest';
import { GButton, createGradientUI } from '../../dist/index.mjs';
import type { GButtonProps } from '../../src/components/ui/GButton/types';

const renderButton = async (props: GButtonProps, withRouter = false) => {
	const app = createSSRApp({
		render: () => h(GButton, props, () => 'Navigate')
	});
	app.use(createGradientUI());
	if (withRouter) {
		const router = createRouter({
			history: createMemoryHistory('/app/'),
			routes: [
				{ path: '/', component: { render: () => null } },
				{
					path: '/users/:id',
					name: 'user',
					component: { render: () => null }
				}
			]
		});
		app.use(router);
		await router.push('/');
		await router.isReady();
	}
	return renderToString(app);
};

describe('GButton navigation without a Nuxt dependency', () => {
	it('renders a native button without a destination', async () => {
		expect(await renderButton({})).toMatch(/<button[^>]*type="button"/);
	});

	it('falls back to an anchor for a string destination without a router', async () => {
		const html = await renderButton({ to: '/guide', target: '_blank' });
		expect(html).toMatch(/<a[^>]*href="\/guide"/);
		expect(html).toContain('rel="noopener noreferrer"');
		expect(html).not.toContain(' to=');
	});

	it('resolves named routes and the router base without Nuxt', async () => {
		const html = await renderButton(
			{ to: { name: 'user', params: { id: '42' } } },
			true
		);
		expect(html).toMatch(/<a[^>]*href="\/app\/users\/42"/);
	});

	it('preserves target and explicit rel on router links', async () => {
		const html = await renderButton(
			{ to: '/users/42', target: '_blank', rel: 'external' },
			true
		);
		expect(html).toContain('target="_blank"');
		expect(html).toContain('rel="external"');
	});

	it.each([false, true])(
		'disables navigation with router=%s',
		async (withRouter) => {
			const html = await renderButton(
				{ to: '/users/42', disabled: true },
				withRouter
			);
			expect(html).toMatch(/<button[^>]*disabled/);
			expect(html).not.toContain('href=');
		}
	);

	it('preserves explicit tag overrides', async () => {
		const html = await renderButton(
			{ to: '/users/42', tag: 'button' },
			true
		);
		expect(html).toMatch(/<button[^>]*type="button"/);
		expect(html).not.toContain('href=');
	});

	it('keeps href usable when an object destination cannot be resolved', async () => {
		const html = await renderButton({
			to: { name: 'user' },
			href: '/fallback'
		});
		expect(html).toMatch(/<a[^>]*href="\/fallback"/);
	});
});
