import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import States from './states.vue';
import statesCode from './states.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';
export const imageDropzoneUsageExample: DocsLiveExample = {
	id: 'image-dropzone-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};
export const imageDropzoneExamples: DocsLiveExample[] = [
	{
		id: 'image-dropzone-states',
		label: 'States',
		component: States,
		code: toPublicExampleCode(statesCode)
	}
];
