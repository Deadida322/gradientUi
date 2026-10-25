import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { describe, expect, it } from 'vitest';
import {
	GBottomNavigation,
	GBottomNavigationItem,
	GNavbar,
	GNavbarItem,
	GTabs,
	GTabList,
	GTab,
	createGradientUI
} from '../../dist/index.mjs';

const render = async (
	variant: 'tonal' | 'glass' | 'gradient',
	disabled = false,
	morph = false
) => {
	const app = createSSRApp({
		render: () =>
			h(
				GBottomNavigation,
				{
					defaultValue: 'home',
					variant,
					disabled,
					morph,
					gradientRecipe: 'orbitalConic'
				},
				() => [
					h(GBottomNavigationItem, {
						value: 'home',
						label: 'Home',
						icon: 'home',
						href: '/home'
					}),
					h(GBottomNavigationItem, {
						value: 'saved',
						label: 'Saved',
						to: '/saved'
					})
				]
			)
	});
	app.use(createGradientUI());
	return renderToString(app);
};
describe('bottom navigation SSR', () => {
	it.each(['tonal', 'glass', 'gradient'] as const)(
		'renders %s material and native destination semantics',
		async (variant) => {
			const html = await render(variant);
			expect(html).toContain('<nav');
			expect(html).toContain(`g-bottom-navigation_${variant}`);
			expect(html).toContain('aria-label="Bottom navigation"');
			expect(html).toContain('aria-current="page"');
			expect(html).toContain('href="/home"');
			expect(html).toContain('href="/saved"');
			expect(html).not.toContain('role="tab"');
			expect(html).toContain('g-navigation-indicator');
		}
	);
	it('renders morph through the existing material surface layers', async () => {
		const html = await render('gradient', false, true);
		expect(html).toContain('g-bottom-navigation__surface-material-morph');
		expect(html).toContain(
			'g-bottom-navigation__surface-material-morph-blob'
		);
	});
	it('disables native navigation when the whole component is disabled', async () => {
		const html = await render('tonal', true);
		expect(html).not.toContain('href="');
		expect(html).toContain('disabled');
	});
	it('shares the indicator renderer with navbar and line tabs', async () => {
		for (const [parent, child, extra] of [
			[GNavbar, GNavbarItem, {}],
			[GTabs, GTab, { orientation: 'vertical' }]
		] as const) {
			const app = createSSRApp({
				render: () =>
					h(parent, { defaultValue: 'a', ...extra }, () =>
						parent === GTabs
							? h(GTabList, {}, () =>
									h(child, { value: 'a', label: 'A' })
								)
							: h(child, { value: 'a', label: 'A' })
					)
			});
			app.use(createGradientUI());
			const html = await renderToString(app);
			expect(html).toContain('g-navigation-indicator');
			if (parent === GTabs)
				expect(html).toContain('g-navigation-indicator_vertical');
		}
	});
});
