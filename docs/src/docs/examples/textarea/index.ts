import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Rows from './rows.vue';
import rowsCode from './rows.vue?raw';
import Validation from './validation.vue';
import validationCode from './validation.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const textareaUsageExample: DocsLiveExample = {
	id: 'textarea-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const textareaExamples: DocsLiveExample[] = [
	{
		id: 'rows',
		label: 'Rows',
		component: Rows,
		code: toPublicExampleCode(rowsCode)
	},
	{
		id: 'validation',
		label: 'Validation',
		component: Validation,
		code: toPublicExampleCode(validationCode)
	}
];
