import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Variants from './variants.vue';
import variantsCode from './variants.vue?raw';
import Colors from './colors.vue';
import colorsCode from './colors.vue?raw';
import Dot from './dot.vue';
import dotCode from './dot.vue?raw';
import Locations from './locations.vue';
import locationsCode from './locations.vue?raw';
import Inline from './inline.vue';
import inlineCode from './inline.vue?raw';
import Sizes from './sizes.vue';
import sizesCode from './sizes.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const badgeUsageExample: DocsLiveExample = {
	id: 'badge-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const badgeExamples: DocsLiveExample[] = [
	{
		id: 'variants',
		label: 'Variants',
		component: Variants,
		code: toPublicExampleCode(variantsCode)
	},
	{
		id: 'colors',
		label: 'Colors',
		component: Colors,
		code: toPublicExampleCode(colorsCode)
	},
	{
		id: 'dot',
		label: 'Dot',
		component: Dot,
		code: toPublicExampleCode(dotCode)
	},
	{
		id: 'locations',
		label: 'Locations',
		component: Locations,
		code: toPublicExampleCode(locationsCode)
	},
	{
		id: 'inline',
		label: 'Inline',
		component: Inline,
		code: toPublicExampleCode(inlineCode)
	},
	{
		id: 'sizes',
		label: 'Sizes',
		component: Sizes,
		code: toPublicExampleCode(sizesCode)
	},
	{
		id: 'slots',
		label: 'Slots',
		component: Slots,
		code: toPublicExampleCode(slotsCode)
	}
];
