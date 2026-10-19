import { computed } from 'vue';
import { componentCatalog } from '@docs/data/componentApi';

interface DocsSeoEntry {
	title: string;
	description: string;
}

const defaultSeo: DocsSeoEntry = {
	title: 'Gradient UI',
	description:
		'Gradient-aware Vue 3 component library with accessible components, Material You tokens, Nuxt integration and SSR support.'
};
const siteUrl = 'https://gradient-ui-docs.netlify.app';

const pageSeo: Record<string, DocsSeoEntry> = {
	'/docs/get-started': {
		title: 'Get started',
		description:
			'Install Gradient UI, configure themes and icons, and choose full or per-component registration for a Vue 3 application.'
	},
	'/docs/core-conceptions': {
		title: 'Core concepts',
		description:
			'Learn the Gradient UI surface, token, state and gradient model used consistently across the Vue component library.'
	},
	'/docs/design-tokens': {
		title: 'Design tokens',
		description:
			'Explore Gradient UI color, gradient, typography, icon, spacing and component tokens for light and dark themes.'
	},
	'/docs/gradient-engine': {
		title: 'Gradient engine',
		description:
			'Generate deterministic CSS, SVG, canvas, shadow and Material gradient outputs from a shared framework-independent model.'
	},
	'/docs/components': {
		title: 'Vue components',
		description:
			'Browse accessible Gradient UI components for containment, navigation, forms, selection, data display and feedback.'
	},
	'/docs/forms': {
		title: 'Forms',
		description:
			'Build typed Vue forms with Gradient UI fields, validation rules, semantic states and server error handling.'
	},
	'/docs/directives': {
		title: 'Directives',
		description:
			'Use Gradient UI Vue directives for loading, tooltips, masks, ripple, gradient text and specular effects.'
	},
	'/docs/css-helpers': {
		title: 'CSS helpers',
		description:
			'Use Gradient UI layout, spacing, typography, color and responsive CSS helpers without adding runtime JavaScript.'
	},
	'/docs/ssr-nuxt': {
		title: 'SSR and Nuxt',
		description:
			'Configure @gradient-ui/nuxt for SSR-safe themes, component auto-imports, teleports, services, viewport hints and CSP.'
	},
	'/docs/figma-plugin': {
		title: 'Figma plugin',
		description:
			'Generate Gradient UI tokens, native Figma paints, variables, glow layers, previews and experimental morph artwork.'
	},
	'/playground': {
		title: 'Playground',
		description:
			'Explore Gradient UI components, themes, forms and gradient recipes in an interactive Vue playground.'
	},
	'/about': {
		title: 'About',
		description:
			'Learn about the goals and design principles behind the Gradient UI Vue component library.'
	},
	'/validation': {
		title: 'Validation playground',
		description:
			'Test Gradient UI form validation rules, field states and submission behavior.'
	}
};

const resolveSeo = (path: string): DocsSeoEntry => {
	const staticEntry = pageSeo[path];
	if (staticEntry) return staticEntry;

	const componentId = path.match(/^\/docs\/components\/([^/]+)$/)?.[1];
	const component = componentCatalog.find((item) => item.id === componentId);
	if (component) {
		return {
			title: component.title,
			description: `${component.description} Read usage examples, props, slots, events and CSS variables.`
		};
	}

	return defaultSeo;
};

export const useDocsSeo = () => {
	const route = useRoute();
	const seo = computed(() => resolveSeo(route.path));
	const title = computed(() =>
		seo.value.title === defaultSeo.title
			? defaultSeo.title
			: `${seo.value.title} · Gradient UI`
	);
	const canonicalUrl = computed(() =>
		new URL(route.path, siteUrl).toString()
	);

	useSeoMeta({
		title,
		description: () => seo.value.description,
		ogTitle: title,
		ogDescription: () => seo.value.description,
		ogSiteName: 'Gradient UI',
		ogType: 'website',
		ogUrl: canonicalUrl,
		twitterCard: 'summary',
		twitterTitle: title,
		twitterDescription: () => seo.value.description,
		robots: 'index, follow'
	});

	useHead({
		htmlAttrs: { lang: 'en' },
		link: [
			{ rel: 'icon', type: 'image/png', href: '/favicon.png' },
			{ rel: 'apple-touch-icon', href: '/favicon.png' },
			{ rel: 'canonical', href: canonicalUrl }
		],
		meta: [
			{
				name: 'theme-color',
				content: '#704aff'
			}
		]
	});

	return seo;
};
