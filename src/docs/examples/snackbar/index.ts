import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Variants from './variants.vue';
import variantsCode from './variants.vue?raw';
import States from './states.vue';
import statesCode from './states.vue?raw';
import Locations from './locations.vue';
import locationsCode from './locations.vue?raw';
import Component from './component.vue';
import componentCode from './component.vue?raw';
import Transitions from './transitions.vue';
import transitionsCode from './transitions.vue?raw';
import Service from './service.vue';
import serviceCode from './service.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@/docs/types';
import { toPublicExampleCode } from '@/docs/utils/code';

export const snackbarUsageExample: DocsLiveExample = {
	id: 'snackbar-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const snackbarExamples: DocsLiveExample[] = [
	{
		id: 'variants',
		label: 'Variants',
		component: Variants,
		code: toPublicExampleCode(variantsCode)
	},
	{
		id: 'states',
		label: 'States',
		component: States,
		code: toPublicExampleCode(statesCode)
	},
	{
		id: 'locations',
		label: 'Locations',
		component: Locations,
		code: toPublicExampleCode(locationsCode)
	},
	{
		id: 'component',
		label: 'Component layer',
		component: Component,
		code: toPublicExampleCode(componentCode)
	},
	{
		id: 'transitions',
		label: 'Transitions',
		component: Transitions,
		code: toPublicExampleCode(transitionsCode)
	},
	{
		id: 'service',
		label: 'Service',
		component: Service,
		code: toPublicExampleCode(serviceCode)
	},
	{
		id: 'slots',
		label: 'Slots',
		component: Slots,
		code: toPublicExampleCode(slotsCode)
	}
];
