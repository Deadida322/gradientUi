import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Views from './views.vue';
import viewsCode from './views.vue?raw';
import Customization from './customization.vue';
import customizationCode from './customization.vue?raw';
import Directive from './directive.vue';
import directiveCode from './directive.vue?raw';
import Dark from './dark.vue';
import darkCode from './dark.vue?raw';
import Service from './service.vue';
import serviceCode from './service.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const loadingUsageExample: DocsLiveExample = {
	id: 'loading-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const loadingExamples: DocsLiveExample[] = [
	{
		id: 'views',
		label: 'Progress views',
		component: Views,
		code: toPublicExampleCode(viewsCode)
	},
	{
		id: 'customization',
		label: 'Customization',
		component: Customization,
		code: toPublicExampleCode(customizationCode)
	},
	{
		id: 'directive',
		label: 'Directive',
		component: Directive,
		code: toPublicExampleCode(directiveCode)
	},
	{
		id: 'dark',
		label: 'Dark overlay',
		component: Dark,
		code: toPublicExampleCode(darkCode)
	},
	{
		id: 'service',
		label: 'Service',
		component: Service,
		code: toPublicExampleCode(serviceCode)
	}
];
