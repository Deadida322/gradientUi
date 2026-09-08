import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Multiple from './multiple.vue';
import multipleCode from './multiple.vue?raw';
import Custom from './custom.vue';
import customCode from './custom.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const comboboxUsageExample: DocsLiveExample = {
	id: 'combobox-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const comboboxExamples: DocsLiveExample[] = [
	{
		id: 'multiple',
		label: 'Multiple',
		component: Multiple,
		code: toPublicExampleCode(multipleCode)
	},
	{
		id: 'custom',
		label: 'Custom values',
		component: Custom,
		code: toPublicExampleCode(customCode)
	},
	{
		id: 'slots',
		label: 'Slots',
		component: Slots,
		code: toPublicExampleCode(slotsCode)
	}
];
