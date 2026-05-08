import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Variants from './variants.vue';
import variantsCode from './variants.vue?raw';
import Colors from './colors.vue';
import colorsCode from './colors.vue?raw';
import States from './states.vue';
import statesCode from './states.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const alertUsageExample: DocsLiveExample = {
	id: 'alert-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const alertExamples: DocsLiveExample[] = [
	{
		id: 'variants',
		label: 'Variants',
		component: Variants,
		code: toPublicExampleCode(variantsCode)
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
		id: 'slots',
		label: 'Slots',
		component: Slots,
		code: toPublicExampleCode(slotsCode)
	}
];
