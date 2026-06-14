import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Alignment from './alignment.vue';
import alignmentCode from './alignment.vue?raw';
import StickyFixed from './sticky-fixed.vue';
import stickyFixedCode from './sticky-fixed.vue?raw';
import Variants from './variants.vue';
import variantsCode from './variants.vue?raw';
import Density from './density.vue';
import densityCode from './density.vue?raw';
import Elevation from './elevation.vue';
import elevationCode from './elevation.vue?raw';
import States from './states.vue';
import statesCode from './states.vue?raw';
import Expansion from './expansion.vue';
import expansionCode from './expansion.vue?raw';
import MergedCells from './merged-cells.vue';
import mergedCellsCode from './merged-cells.vue?raw';
import Slots from './slots.vue';
import slotsCode from './slots.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const tableUsageExample: DocsLiveExample = {
	id: 'table-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const tableExamples: DocsLiveExample[] = [
	{
		id: 'variants',
		label: 'Variants',
		component: Variants,
		code: toPublicExampleCode(variantsCode)
	},
	{
		id: 'density',
		label: 'Density',
		component: Density,
		code: toPublicExampleCode(densityCode)
	},
	{
		id: 'elevation',
		label: 'Elevation',
		component: Elevation,
		code: toPublicExampleCode(elevationCode)
	},
	{
		id: 'alignment',
		label: 'Alignment',
		component: Alignment,
		code: toPublicExampleCode(alignmentCode)
	},
	{
		id: 'sticky-fixed',
		label: 'Sticky & fixed',
		component: StickyFixed,
		code: toPublicExampleCode(stickyFixedCode)
	},
	{
		id: 'states',
		label: 'States',
		component: States,
		code: toPublicExampleCode(statesCode)
	},
	{
		id: 'expansion',
		label: 'Expansion',
		component: Expansion,
		code: toPublicExampleCode(expansionCode)
	},
	{
		id: 'merged-cells',
		label: 'Merged cells',
		component: MergedCells,
		code: toPublicExampleCode(mergedCellsCode)
	},
	{
		id: 'slots',
		label: 'Slots',
		component: Slots,
		code: toPublicExampleCode(slotsCode)
	}
];
