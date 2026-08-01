export interface DocsPageAsideItem {
	label: string;
	href: string;
}

export const docsPageAside: Record<string, DocsPageAsideItem[]> = {
	'/docs/get-started': [
		{ label: 'Install', href: '#install' },
		{ label: 'Full registration', href: '#register-theme' },
		{ label: 'Plugin options', href: '#plugin-options' },
		{ label: 'Fonts are opt-in', href: '#fonts' },
		{ label: 'Components', href: '#use-components' },
		{ label: 'Directives', href: '#directives' },
		{ label: 'Services', href: '#services' }
	],
	'/docs/core-conceptions': [
		{ label: 'Material You', href: '#material-you' },
		{ label: 'Gradients', href: '#gradients' },
		{ label: 'Composable APIs', href: '#composable-apis' },
		{ label: 'Examples as contracts', href: '#examples-as-contracts' },
		{ label: 'Gradient engine', href: '#gradient-engine' },
		{ label: 'Surface', href: '#surface' },
		{ label: 'GGradient primitive', href: '#g-gradient' }
	],
	'/docs/design-tokens': [
		{ label: 'Token layers', href: '#token-layers' },
		{ label: 'Palette', href: '#palette' },
		{ label: 'Gradients', href: '#gradients' },
		{ label: 'Typography', href: '#typography' },
		{ label: 'Icons', href: '#icons' },
		{ label: 'Common tokens', href: '#common-tokens' }
	],
	'/docs/gradient-engine': [
		{ label: 'Overview', href: '#overview' },
		{ label: 'Workflow', href: '#workflow' },
		{ label: 'API layers', href: '#api-layers' },
		{ label: 'Material integration', href: '#material-integration' },
		{ label: 'Playground', href: '#playground' },
		{ label: 'API surface', href: '#api' },
		{ label: 'Recipes', href: '#recipes' },
		{ label: 'Formats', href: '#formats' }
	],
	'/docs/components': [
		{ label: 'Using components', href: '#using-components' },
		{ label: 'Component groups', href: '#component-groups' },
		{ label: 'Anatomy', href: '#anatomy' },
		{ label: 'Component index', href: '#component-index' }
	],
	'/docs/forms': [
		{ label: 'Form components', href: '#components' },
		{ label: 'Field model', href: '#field-model' },
		{ label: 'Validation', href: '#validation' },
		{ label: 'Rules', href: '#rules' },
		{ label: 'Validation API', href: '#validation-api' },
		{ label: 'Form example', href: '#form-example' },
		{ label: 'Server errors', href: '#server-errors' }
	],
	'/docs/directives': [
		{ label: 'When to use', href: '#when-to-use' },
		{ label: 'Registration', href: '#registration' },
		{ label: 'Loading', href: '#loading' },
		{ label: 'Tooltip', href: '#tooltip' },
		{ label: 'Mask', href: '#mask' },
		{ label: 'Gradient text', href: '#gradient-text' },
		{ label: 'Ripple', href: '#ripple' },
		{ label: 'Specular', href: '#specular' },
		{ label: 'API', href: '#api' }
	],
	'/docs/css-helpers': [
		{ label: 'Usage', href: '#usage' },
		{ label: 'Layout', href: '#layout' },
		{ label: 'Spacing', href: '#spacing' },
		{ label: 'Text and color', href: '#text-and-color' },
		{ label: 'Responsive', href: '#responsive' },
		{ label: 'Breakpoints', href: '#breakpoints' },
		{ label: 'API', href: '#api' }
	]
};
