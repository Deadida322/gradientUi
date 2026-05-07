import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Placements from './placements.vue';
import placementsCode from './placements.vue?raw';
import Delays from './delays.vue';
import delaysCode from './delays.vue?raw';
import Floating from './floating.vue';
import floatingCode from './floating.vue?raw';
import Directive from './directive.vue';
import directiveCode from './directive.vue?raw';
import Programmatic from './programmatic.vue';
import programmaticCode from './programmatic.vue?raw';
import type { DocsLiveExample } from '@/docs/types';
import { toPublicExampleCode } from '@/docs/utils/code';

export const tooltipUsageExample: DocsLiveExample = {
	id: 'tooltip-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const tooltipExamples: DocsLiveExample[] = [
	{
		id: 'placements',
		label: 'Placements',
		component: Placements,
		code: toPublicExampleCode(placementsCode)
	},
	{
		id: 'delays',
		label: 'Delays',
		component: Delays,
		code: toPublicExampleCode(delaysCode)
	},
	{
		id: 'floating',
		label: 'Floating',
		component: Floating,
		code: toPublicExampleCode(floatingCode)
	},
	{
		id: 'directive',
		label: 'Directive',
		component: Directive,
		code: toPublicExampleCode(directiveCode)
	},
	{
		id: 'programmatic',
		label: 'Programmatic',
		component: Programmatic,
		code: toPublicExampleCode(programmaticCode)
	}
];
