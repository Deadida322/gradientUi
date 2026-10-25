import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const spacerUsageExample: DocsLiveExample = {
	id: 'spacer-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};
export const spacerExamples: DocsLiveExample[] = [];
