import type { DocsReleaseBadgeMeta } from '@docs/types';
import { docsNextReleaseBadge } from './releaseBadges';

export interface DocsNavigationGroup {
	title: string;
	items: {
		label: string;
		to: string;
		badge?: DocsReleaseBadgeMeta;
	}[];
}

export const docsNavigation: DocsNavigationGroup[] = [
	{
		title: 'Guide',
		items: [
			{ label: 'Get started', to: '/docs/get-started' },
			{ label: 'Core concepts', to: '/docs/core-conceptions' },
			{ label: 'Design tokens', to: '/docs/design-tokens' },
			{
				label: 'Gradient engine',
				to: '/docs/gradient-engine',
				badge: docsNextReleaseBadge
			}
		]
	},
	{
		title: 'Integrations',
		items: [
			{ label: 'SSR and Nuxt', to: '/docs/ssr-nuxt' },
			{ label: 'Figma plugin', to: '/docs/figma-plugin' }
		]
	},
	{
		title: 'Reference',
		items: [
			{ label: 'API', to: '/docs/components' },
			{ label: 'Forms', to: '/docs/forms' },
			{ label: 'Directives', to: '/docs/directives' },
			{ label: 'CSS helpers', to: '/docs/css-helpers' }
		]
	}
];
