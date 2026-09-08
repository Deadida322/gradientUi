import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Variants from './variants.vue';
import variantsCode from './variants.vue?raw';
import Effects from './effects.vue';
import effectsCode from './effects.vue?raw';
import Content from './content.vue';
import contentCode from './content.vue?raw';
import Orientation from './orientation.vue';
import orientationCode from './orientation.vue?raw';
import Inset from './inset.vue';
import insetCode from './inset.vue?raw';
import StyleProps from './style-props.vue';
import stylePropsCode from './style-props.vue?raw';
import Material from './material.vue';
import materialCode from './material.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const dividerUsageExample: DocsLiveExample = {
	id: 'divider-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const dividerExamples: DocsLiveExample[] = [
	{
		id: 'variants',
		label: 'Variants',
		component: Variants,
		code: toPublicExampleCode(variantsCode)
	},
	{
		id: 'effects',
		label: 'Effects',
		component: Effects,
		code: toPublicExampleCode(effectsCode)
	},
	{
		id: 'content',
		label: 'Content',
		component: Content,
		code: toPublicExampleCode(contentCode)
	},
	{
		id: 'orientation',
		label: 'Orientation',
		component: Orientation,
		code: toPublicExampleCode(orientationCode)
	},
	{
		id: 'inset',
		label: 'Inset',
		component: Inset,
		code: toPublicExampleCode(insetCode)
	},
	{
		id: 'style-props',
		label: 'Style props',
		component: StyleProps,
		code: toPublicExampleCode(stylePropsCode)
	},
	{
		id: 'material',
		label: 'Material',
		component: Material,
		code: toPublicExampleCode(materialCode)
	}
];
