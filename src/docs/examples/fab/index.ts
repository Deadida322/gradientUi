import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Extended from './extended.vue';
import extendedCode from './extended.vue?raw';
import LabelPlacement from './label-placement.vue';
import labelPlacementCode from './label-placement.vue?raw';
import Variants from './variants.vue';
import variantsCode from './variants.vue?raw';
import Colors from './colors.vue';
import colorsCode from './colors.vue?raw';
import Sizes from './sizes.vue';
import sizesCode from './sizes.vue?raw';
import Placement from './placement.vue';
import placementCode from './placement.vue?raw';
import States from './states.vue';
import statesCode from './states.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@/docs/types';
import { toPublicExampleCode } from '@/docs/utils/code';

export const fabUsageExample: DocsLiveExample = {
	id: 'fab-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const fabExamples: DocsLiveExample[] = [
	{
		id: 'extended',
		label: 'Extended',
		component: Extended,
		code: toPublicExampleCode(extendedCode)
	},
	{
		id: 'label-placement',
		label: 'Label placement',
		component: LabelPlacement,
		code: toPublicExampleCode(labelPlacementCode)
	},
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
		id: 'sizes',
		label: 'Sizes',
		component: Sizes,
		code: toPublicExampleCode(sizesCode)
	},
	{
		id: 'placement',
		label: 'Placement',
		component: Placement,
		code: toPublicExampleCode(placementCode)
	},
	{
		id: 'states',
		label: 'States',
		component: States,
		code: toPublicExampleCode(statesCode)
	},
	{
		id: 'slots',
		label: 'Slots',
		component: Slots,
		code: toPublicExampleCode(slotsCode)
	}
];
