import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Nested from './nested.vue';
import nestedCode from './nested.vue?raw';
import Selection from './selection.vue';
import selectionCode from './selection.vue?raw';
import States from './states.vue';
import statesCode from './states.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const menuUsageExample: DocsLiveExample = {
	id: 'menu-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const menuExamples: DocsLiveExample[] = [
	{
		id: 'nested',
		label: 'Nested',
		component: Nested,
		code: toPublicExampleCode(nestedCode)
	},
	{
		id: 'selection',
		label: 'Selection',
		component: Selection,
		code: toPublicExampleCode(selectionCode)
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
