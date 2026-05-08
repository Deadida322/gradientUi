import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import IndicatorViews from './indicator-views.vue';
import indicatorViewsCode from './indicator-views.vue?raw';
import Colors from './colors.vue';
import colorsCode from './colors.vue?raw';
import Sizes from './sizes.vue';
import sizesCode from './sizes.vue?raw';
import States from './states.vue';
import statesCode from './states.vue?raw';
import InlineMessage from './inline-message.vue';
import inlineMessageCode from './inline-message.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const checkboxUsageExample: DocsLiveExample = {
	id: 'checkbox-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const checkboxExamples: DocsLiveExample[] = [
	{
		id: 'indicator-views',
		label: 'Indicator views',
		component: IndicatorViews,
		code: toPublicExampleCode(indicatorViewsCode)
	},
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
		id: 'inline-message',
		label: 'Inline',
		component: InlineMessage,
		code: toPublicExampleCode(inlineMessageCode)
	}
];
