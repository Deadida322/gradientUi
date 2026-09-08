import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Variants from './variants.vue';
import variantsCode from './variants.vue?raw';
import Layouts from './layouts.vue';
import layoutsCode from './layouts.vue?raw';
import Sizes from './sizes.vue';
import sizesCode from './sizes.vue?raw';
import Gradient from './gradient.vue';
import gradientCode from './gradient.vue?raw';
import Loading from './loading.vue';
import loadingCode from './loading.vue?raw';
import Material from './material.vue';
import materialCode from './material.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const cardUsageExample: DocsLiveExample = {
	id: 'card-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const cardExamples: DocsLiveExample[] = [
	{
		id: 'variants',
		label: 'Variants',
		component: Variants,
		code: toPublicExampleCode(variantsCode)
	},
	{
		id: 'layouts',
		label: 'Layouts',
		component: Layouts,
		code: toPublicExampleCode(layoutsCode)
	},
	{
		id: 'sizes',
		label: 'Size & density',
		component: Sizes,
		code: toPublicExampleCode(sizesCode)
	},
	{
		id: 'gradient',
		label: 'Gradient',
		component: Gradient,
		code: toPublicExampleCode(gradientCode)
	},
	{
		id: 'loading',
		label: 'Loading',
		component: Loading,
		code: toPublicExampleCode(loadingCode)
	},
	{
		id: 'material',
		label: 'Material',
		component: Material,
		code: toPublicExampleCode(materialCode)
	},
	{
		id: 'slots',
		label: 'Slots',
		component: Slots,
		code: toPublicExampleCode(slotsCode)
	}
];
