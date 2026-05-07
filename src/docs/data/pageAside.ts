export interface DocsPageAsideItem {
	label: string;
	href: string;
}

export const docsPageAside: Record<string, DocsPageAsideItem[]> = {
	'/docs/get-started': [
		{ label: 'Install', href: '#install' },
		{ label: 'Register theme and styles', href: '#register-theme' },
		{ label: 'Use components', href: '#use-components' }
	],
	'/docs/core-conceptions': [
		{ label: 'Material You', href: '#material-you' },
		{ label: 'Gradients', href: '#gradients' },
		{ label: 'Composable APIs', href: '#composable-apis' },
		{ label: 'Examples as contracts', href: '#examples-as-contracts' },
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
