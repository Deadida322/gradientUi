import { createRouter, createWebHistory } from 'vue-router';
import DocsLayout from '@docs/DocsLayout.vue';
import DocsGetStarted from '@docs/views/DocsGetStarted.vue';

const routes = [
	{
		path: '/',
		redirect: '/docs/get-started'
	},
	{
		path: '/docs',
		component: DocsLayout,
		children: [
			{
				path: '',
				redirect: '/docs/get-started'
			},
			{
				path: 'get-started',
				name: 'docs-get-started',
				component: DocsGetStarted
			},
			{
				path: 'base-conception',
				redirect: '/docs/core-conceptions'
			},
			{
				path: 'core-conceptions',
				name: 'docs-core-conceptions',
				component: () => import('@docs/views/DocsCoreConceptions.vue')
			},
			{
				path: 'design-tokens',
				name: 'docs-design-tokens',
				component: () => import('@docs/views/DocsDesignTokens.vue')
			},
			{
				path: 'components',
				name: 'docs-components',
				component: () => import('@docs/views/DocsComponents.vue')
			},
			{
				path: 'forms',
				name: 'docs-forms',
				component: () => import('@docs/views/DocsForms.vue')
			},
			{
				path: 'directives',
				name: 'docs-directives',
				component: () => import('@docs/views/DocsDirectives.vue')
			},
			{
				path: 'css-helpers',
				name: 'docs-css-helpers',
				component: () => import('@docs/views/DocsCssHelpers.vue')
			},
			{
				path: 'components/:componentId',
				name: 'docs-component-detail',
				component: () => import('@docs/views/DocsComponentDetail.vue')
			}
		]
	},
	{
		path: '/playground',
		name: 'playground',
		component: () => import('../views/HomeView.vue')
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('../views/AboutView.vue')
	},
	{
		path: '/validation',
		name: 'validation',
		component: () => import('../views/ValidationView.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'docs-not-found',
		component: () => import('@docs/views/DocsNotFound.vue')
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	scrollBehavior(to, _from, savedPosition) {
		if (savedPosition) return savedPosition;

		if (to.hash) {
			return {
				el: to.hash,
				top: 72,
				behavior: 'smooth'
			};
		}

		return {
			top: 0,
			behavior: 'smooth'
		};
	}
});

export default router;
