import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Multiple from './multiple.vue';
import multipleCode from './multiple.vue?raw';
import ReturnObject from './return-object.vue';
import returnObjectCode from './return-object.vue?raw';
import Validation from './validation.vue';
import validationCode from './validation.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@/docs/types';
import { toPublicExampleCode } from '@/docs/utils/code';

export const selectUsageExample: DocsLiveExample = {
	id: 'select-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const selectExamples: DocsLiveExample[] = [
	{
		id: 'multiple',
		label: 'Multiple',
		component: Multiple,
		code: toPublicExampleCode(multipleCode)
	},
	{
		id: 'return-object',
		label: 'Return object',
		component: ReturnObject,
		code: toPublicExampleCode(returnObjectCode)
	},
	{
		id: 'validation',
		label: 'Validation',
		component: Validation,
		code: toPublicExampleCode(validationCode)
	},
	{
		id: 'slots',
		label: 'Slots',
		component: Slots,
		code: toPublicExampleCode(slotsCode)
	}
];
