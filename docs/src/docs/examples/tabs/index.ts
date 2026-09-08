import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Variants from './variants.vue';
import variantsCode from './variants.vue?raw';
import Vertical from './vertical.vue';
import verticalCode from './vertical.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const tabsUsageExample: DocsLiveExample = {
	id: 'tabs-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const tabsExamples: DocsLiveExample[] = [
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
		id: 'slots',
		label: 'Slots',
		component: Slots,
		code: toPublicExampleCode(slotsCode)
	}
];
