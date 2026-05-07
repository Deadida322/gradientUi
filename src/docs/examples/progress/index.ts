import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Views from './views.vue';
import viewsCode from './views.vue?raw';
import Colors from './colors.vue';
import colorsCode from './colors.vue?raw';
import States from './states.vue';
import statesCode from './states.vue?raw';
import Indeterminate from './indeterminate.vue';
import indeterminateCode from './indeterminate.vue?raw';
import type { DocsLiveExample } from '@/docs/types';
import { toPublicExampleCode } from '@/docs/utils/code';

export const progressUsageExample: DocsLiveExample = {
	id: 'progress-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const progressExamples: DocsLiveExample[] = [
	{
		id: 'views',
		label: 'Views',
		component: Views,
		code: toPublicExampleCode(viewsCode)
	},
	{
		id: 'colors',
		label: 'Colors',
		component: Colors,
		code: toPublicExampleCode(colorsCode)
	},
	{
		id: 'states',
		label: 'States',
		component: States,
		code: toPublicExampleCode(statesCode)
	},
	{
		id: 'indeterminate',
		label: 'Indeterminate',
		component: Indeterminate,
		code: toPublicExampleCode(indeterminateCode)
	}
];
