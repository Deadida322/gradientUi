import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Variants from './variants.vue';
import variantsCode from './variants.vue?raw';
import Colors from './colors.vue';
import colorsCode from './colors.vue?raw';
import Radius from './radius.vue';
import radiusCode from './radius.vue?raw';
import Placement from './placement.vue';
import placementCode from './placement.vue?raw';
import States from './states.vue';
import statesCode from './states.vue?raw';
import Effects from './effects.vue';
import effectsCode from './effects.vue?raw';
import Icons from './icons.vue';
import iconsCode from './icons.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const buttonUsageExample: DocsLiveExample = {
	id: 'button-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const buttonExamples: DocsLiveExample[] = [
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
		id: 'radius',
		label: 'Radius',
		component: Radius,
		code: toPublicExampleCode(radiusCode)
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
		id: 'effects',
		label: 'Effects',
		component: Effects,
		code: toPublicExampleCode(effectsCode)
	},
	{
		id: 'icons',
		label: 'Icons',
		component: Icons,
		code: toPublicExampleCode(iconsCode)
	},
	{
		id: 'slots',
		label: 'Slots',
		component: Slots,
		code: toPublicExampleCode(slotsCode)
	}
];
