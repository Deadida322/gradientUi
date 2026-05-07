import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Variants from './variants.vue';
import variantsCode from './variants.vue?raw';
import Controlled from './controlled.vue';
import controlledCode from './controlled.vue?raw';
import Group from './group.vue';
import groupCode from './group.vue?raw';
import Gradient from './gradient.vue';
import gradientCode from './gradient.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@/docs/types';
import { toPublicExampleCode } from '@/docs/utils/code';

export const expansionUsageExample: DocsLiveExample = {
	id: 'expansion-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const expansionExamples: DocsLiveExample[] = [
	{
		id: 'variants',
		label: 'Variants',
		component: Variants,
		code: toPublicExampleCode(variantsCode)
	},
	{
		id: 'controlled',
		label: 'Controlled',
		component: Controlled,
		code: toPublicExampleCode(controlledCode)
	},
	{
		id: 'group',
		label: 'Group',
		component: Group,
		code: toPublicExampleCode(groupCode)
	},
	{
		id: 'gradient',
		label: 'Gradient',
		component: Gradient,
		code: toPublicExampleCode(gradientCode)
	},
	{
		id: 'slots',
		label: 'Slots',
		component: Slots,
		code: toPublicExampleCode(slotsCode)
	}
];
