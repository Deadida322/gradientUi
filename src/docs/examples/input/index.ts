import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import States from './states.vue';
import statesCode from './states.vue?raw';
import Validation from './validation.vue';
import validationCode from './validation.vue?raw';
import Mask from './mask.vue';
import maskCode from './mask.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@/docs/types';
import { toPublicExampleCode } from '@/docs/utils/code';

export const inputUsageExample: DocsLiveExample = {
	id: 'input-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const inputExamples: DocsLiveExample[] = [
	{
		id: 'states',
		label: 'States',
		component: States,
		code: toPublicExampleCode(statesCode)
	},
	{
		id: 'validation',
		label: 'Validation',
		component: Validation,
		code: toPublicExampleCode(validationCode)
	},
	{
		id: 'mask',
		label: 'Mask',
		component: Mask,
		code: toPublicExampleCode(maskCode)
	},
	{
		id: 'slots',
		label: 'Slots',
		component: Slots,
		code: toPublicExampleCode(slotsCode)
	}
];
