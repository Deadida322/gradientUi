import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Variants from './variants.vue';
import variantsCode from './variants.vue?raw';
import Morph from './morph.vue';
import morphCode from './morph.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';
export const bottomNavigationUsageExample: DocsLiveExample = {
	id: 'bottom-navigation-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};
export const bottomNavigationExamples: DocsLiveExample[] = [
	{
		id: 'variants',
		label: 'Materials',
		component: Variants,
		code: toPublicExampleCode(variantsCode)
	},
	{
		id: 'morph',
		label: 'Morph',
		component: Morph,
		code: toPublicExampleCode(morphCode)
	}
];
