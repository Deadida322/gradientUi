import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Colors from './colors.vue';
import colorsCode from './colors.vue?raw';
import Sizes from './sizes.vue';
import sizesCode from './sizes.vue?raw';
import States from './states.vue';
import statesCode from './states.vue?raw';
import Validation from './validation.vue';
import validationCode from './validation.vue?raw';
import InlineMessage from './inline-message.vue';
import inlineMessageCode from './inline-message.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const switchUsageExample: DocsLiveExample = {
	id: 'switch-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const switchExamples: DocsLiveExample[] = [
	{
		id: 'colors',
		label: 'Colors',
		component: Colors,
		code: toPublicExampleCode(colorsCode)
	},
	{
		id: 'sizes',
		label: 'Sizes',
		component: Sizes,
		code: toPublicExampleCode(sizesCode)
	},
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
		id: 'inline-message',
		label: 'Inline',
		component: InlineMessage,
		code: toPublicExampleCode(inlineMessageCode)
	}
];
