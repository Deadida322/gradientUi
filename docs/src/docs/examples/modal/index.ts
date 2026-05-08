import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Actions from './actions.vue';
import actionsCode from './actions.vue?raw';
import Persistent from './persistent.vue';
import persistentCode from './persistent.vue?raw';
import Fullscreen from './fullscreen.vue';
import fullscreenCode from './fullscreen.vue?raw';
import Sizes from './sizes.vue';
import sizesCode from './sizes.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const modalUsageExample: DocsLiveExample = {
	id: 'modal-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const modalExamples: DocsLiveExample[] = [
	{
		id: 'actions',
		label: 'Actions',
		component: Actions,
		code: toPublicExampleCode(actionsCode)
	},
	{
		id: 'persistent',
		label: 'Persistent',
		component: Persistent,
		code: toPublicExampleCode(persistentCode)
	},
	{
		id: 'fullscreen',
		label: 'Fullscreen',
		component: Fullscreen,
		code: toPublicExampleCode(fullscreenCode)
	},
	{
		id: 'sizes',
		label: 'Sizes',
		component: Sizes,
		code: toPublicExampleCode(sizesCode)
	}
];
