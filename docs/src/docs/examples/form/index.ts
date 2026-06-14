import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Submit from './submit.vue';
import submitCode from './submit.vue?raw';
import ValidationModes from './validation-modes.vue';
import validationModesCode from './validation-modes.vue?raw';
import MixedControls from './mixed-controls.vue';
import mixedControlsCode from './mixed-controls.vue?raw';
import Disabled from './disabled.vue';
import disabledCode from './disabled.vue?raw';
import Errors from './errors.vue';
import errorsCode from './errors.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const formUsageExample: DocsLiveExample = {
	id: 'form-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const formExamples: DocsLiveExample[] = [
	{
		id: 'submit',
		label: 'Submit',
		component: Submit,
		code: toPublicExampleCode(submitCode)
	},
	{
		id: 'validation-modes',
		label: 'Validation modes',
		component: ValidationModes,
		code: toPublicExampleCode(validationModesCode)
	},
	{
		id: 'mixed-controls',
		label: 'Mixed controls',
		component: MixedControls,
		code: toPublicExampleCode(mixedControlsCode)
	},
	{
		id: 'disabled',
		label: 'Disabled',
		component: Disabled,
		code: toPublicExampleCode(disabledCode)
	},
	{
		id: 'errors',
		label: 'Errors',
		component: Errors,
		code: toPublicExampleCode(errorsCode)
	}
];
