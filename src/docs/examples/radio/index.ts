import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import IndicatorViews from './indicator-views.vue';
import indicatorViewsCode from './indicator-views.vue?raw';
import Colors from './colors.vue';
import colorsCode from './colors.vue?raw';
import Sizes from './sizes.vue';
import sizesCode from './sizes.vue?raw';
import Layout from './layout.vue';
import layoutCode from './layout.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@/docs/types';
import { toPublicExampleCode } from '@/docs/utils/code';

export const radioUsageExample: DocsLiveExample = {
	id: 'radio-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const radioExamples: DocsLiveExample[] = [
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
		id: 'layout',
		label: 'Layout',
		component: Layout,
		code: toPublicExampleCode(layoutCode)
	},
	{
		id: 'slots',
		label: 'Slots',
		component: Slots,
		code: toPublicExampleCode(slotsCode)
	}
];
