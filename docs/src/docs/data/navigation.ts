export interface DocsNavigationGroup {
	title: string;
	items: {
		label: string;
		to: string;
	}[];
}

export const docsNavigation: DocsNavigationGroup[] = [
	{
		title: 'Guide',
		items: [
			{ label: 'Get started', to: '/docs/get-started' },
			{ label: 'Core conceptions', to: '/docs/core-conceptions' },
			{ label: 'Design tokens', to: '/docs/design-tokens' }
		]
	},
	{
		title: 'Components',
		items: [
			{ label: 'API', to: '/docs/components' },
			{ label: 'Forms', to: '/docs/forms' },
			{ label: 'Directives', to: '/docs/directives' },
			{ label: 'CSS helpers', to: '/docs/css-helpers' }
		]
	}
];
