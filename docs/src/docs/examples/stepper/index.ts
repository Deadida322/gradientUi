import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Variants from './variants.vue';
import variantsCode from './variants.vue?raw';
import Vertical from './vertical.vue';
import verticalCode from './vertical.vue?raw';
import Panels from './panels.vue';
import panelsCode from './panels.vue?raw';
import States from './states.vue';
import statesCode from './states.vue?raw';
import Dividers from './dividers.vue';
import dividersCode from './dividers.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const stepperUsageExample: DocsLiveExample = {
	id: 'stepper-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const stepperExamples: DocsLiveExample[] = [
	{
		id: 'variants',
		label: 'Variants',
		component: Variants,
		code: toPublicExampleCode(variantsCode)
	},
	{
		id: 'vertical',
		label: 'Vertical',
		component: Vertical,
		code: toPublicExampleCode(verticalCode)
	},
	{
		id: 'panels',
		label: 'Panels',
		component: Panels,
		code: toPublicExampleCode(panelsCode)
	},
	{
		id: 'states',
		label: 'States',
		component: States,
		code: toPublicExampleCode(statesCode)
	},
	{
		id: 'dividers',
		label: 'Dividers',
		component: Dividers,
		code: toPublicExampleCode(dividersCode)
	},
	{
		id: 'slots',
		label: 'Slots',
		component: Slots,
		code: toPublicExampleCode(slotsCode)
	}
];
