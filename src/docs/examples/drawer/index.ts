import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Placements from './placements.vue';
import placementsCode from './placements.vue?raw';
import Actions from './actions.vue';
import actionsCode from './actions.vue?raw';
import Scrollable from './scrollable.vue';
import scrollableCode from './scrollable.vue?raw';
import Sizes from './sizes.vue';
import sizesCode from './sizes.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@/docs/types';
import { toPublicExampleCode } from '@/docs/utils/code';

export const drawerUsageExample: DocsLiveExample = {
	id: 'drawer-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const drawerExamples: DocsLiveExample[] = [
	{
		id: 'placements',
		label: 'Placements',
		component: Placements,
		code: toPublicExampleCode(placementsCode)
	},
	{
		id: 'actions',
		label: 'Actions',
		component: Actions,
		code: toPublicExampleCode(actionsCode)
	},
	{
		id: 'scrollable',
		label: 'Scrollable',
		component: Scrollable,
		code: toPublicExampleCode(scrollableCode)
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
