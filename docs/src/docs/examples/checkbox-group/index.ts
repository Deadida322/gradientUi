import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Layout from './layout.vue';
import layoutCode from './layout.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const checkboxGroupUsageExample: DocsLiveExample = {
	id: 'checkbox-group-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const checkboxGroupExamples: DocsLiveExample[] = [
	{
		id: 'layout',
		label: 'Layout',
		component: Layout,
		code: toPublicExampleCode(layoutCode)
	}
];
