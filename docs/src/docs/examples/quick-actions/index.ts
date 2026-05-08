import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Compact from './compact.vue';
import compactCode from './compact.vue?raw';
import Placements from './placements.vue';
import placementsCode from './placements.vue?raw';
import Transitions from './transitions.vue';
import transitionsCode from './transitions.vue?raw';
import Directions from './directions.vue';
import directionsCode from './directions.vue?raw';
import CustomTransition from './custom-transition.vue';
import customTransitionCode from './custom-transition.vue?raw';
import States from './states.vue';
import statesCode from './states.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const quickActionsUsageExample: DocsLiveExample = {
	id: 'quick-actions-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const quickActionsExamples: DocsLiveExample[] = [
	{
		id: 'compact',
		label: 'Compact actions',
		component: Compact,
		code: toPublicExampleCode(compactCode)
	},
	{
		id: 'placements',
		label: 'Placements',
		component: Placements,
		code: toPublicExampleCode(placementsCode)
	},
	{
		id: 'transitions',
		label: 'Transitions',
		component: Transitions,
		code: toPublicExampleCode(transitionsCode)
	},
	{
		id: 'directions',
		label: 'Directions',
		component: Directions,
		code: toPublicExampleCode(directionsCode)
	},
	{
		id: 'custom-transition',
		label: 'Custom transition',
		component: CustomTransition,
		code: toPublicExampleCode(customTransitionCode)
	},
	{
		id: 'states',
		label: 'Scenarios',
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
