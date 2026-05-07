import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Single from './single.vue';
import singleCode from './single.vue?raw';
import Multiple from './multiple.vue';
import multipleCode from './multiple.vue?raw';
import Mandatory from './mandatory.vue';
import mandatoryCode from './mandatory.vue?raw';
import Gap from './gap.vue';
import gapCode from './gap.vue?raw';
import Readonly from './readonly.vue';
import readonlyCode from './readonly.vue?raw';
import type { DocsLiveExample } from '@/docs/types';
import { toPublicExampleCode } from '@/docs/utils/code';

export const expansionGroupUsageExample: DocsLiveExample = {
	id: 'expansion-group-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const expansionGroupExamples: DocsLiveExample[] = [
	{
		id: 'single',
		label: 'Single',
		component: Single,
		code: toPublicExampleCode(singleCode)
	},
	{
		id: 'multiple',
		label: 'Multiple',
		component: Multiple,
		code: toPublicExampleCode(multipleCode)
	},
	{
		id: 'mandatory',
		label: 'Mandatory',
		component: Mandatory,
		code: toPublicExampleCode(mandatoryCode)
	},
	{
		id: 'gap',
		label: 'Gap',
		component: Gap,
		code: toPublicExampleCode(gapCode)
	},
	{
		id: 'readonly',
		label: 'Readonly',
		component: Readonly,
		code: toPublicExampleCode(readonlyCode)
	}
];
