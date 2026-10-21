import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Placement from './placement.vue';
import placementCode from './placement.vue?raw';
import Controlled from './controlled.vue';
import controlledCode from './controlled.vue?raw';
import Activators from './activators.vue';
import activatorsCode from './activators.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const dropdownUsageExample: DocsLiveExample = {
	id: 'dropdown-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const dropdownExamples: DocsLiveExample[] = [
	{
		id: 'activators',
		label: 'Activators',
		component: Activators,
		code: toPublicExampleCode(activatorsCode)
	},
	{
		id: 'placement',
		label: 'Placement and triggers',
		component: Placement,
		code: toPublicExampleCode(placementCode)
	},
	{
		id: 'controlled',
		label: 'Controlled state',
		component: Controlled,
		code: toPublicExampleCode(controlledCode)
	}
];
