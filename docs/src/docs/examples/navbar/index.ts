import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import LargeLogo from './large-logo.vue';
import largeLogoCode from './large-logo.vue?raw';
import Density from './density.vue';
import densityCode from './density.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const navbarUsageExample: DocsLiveExample = {
	id: 'navbar-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const navbarExamples: DocsLiveExample[] = [
	{
		id: 'large-logo',
		label: 'Large logo',
		component: LargeLogo,
		code: toPublicExampleCode(largeLogoCode)
	},
	{
		id: 'density',
		label: 'Density and states',
		component: Density,
		code: toPublicExampleCode(densityCode)
	}
];
