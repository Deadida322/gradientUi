import Usage from './usage.vue';
import usageCode from './usage.vue?raw';
import Variants from './variants.vue';
import variantsCode from './variants.vue?raw';
import Shapes from './shapes.vue';
import shapesCode from './shapes.vue?raw';
import Sizes from './sizes.vue';
import sizesCode from './sizes.vue?raw';
import Image from './image.vue';
import imageCode from './image.vue?raw';
import Group from './group.vue';
import groupCode from './group.vue?raw';
import GroupGlass from './group-glass.vue';
import groupGlassCode from './group-glass.vue?raw';
import Gradient from './gradient.vue';
import gradientCode from './gradient.vue?raw';
import type { DocsLiveExample } from '@docs/types';
import { toPublicExampleCode } from '@docs/utils/code';

export const avatarUsageExample: DocsLiveExample = {
	id: 'avatar-usage',
	label: 'Usage',
	component: Usage,
	code: toPublicExampleCode(usageCode)
};

export const avatarGroupUsageExample: DocsLiveExample = {
	id: 'avatar-group-usage',
	label: 'Usage',
	component: Group,
	code: toPublicExampleCode(groupCode)
};

export const avatarExamples: DocsLiveExample[] = [
	{
		id: 'variants',
		label: 'Variants',
		component: Variants,
		code: toPublicExampleCode(variantsCode)
	},
	{
		id: 'shapes',
		label: 'Shapes',
		component: Shapes,
		code: toPublicExampleCode(shapesCode)
	},
	{
		id: 'sizes',
		label: 'Sizes',
		component: Sizes,
		code: toPublicExampleCode(sizesCode)
	},
	{
		id: 'image',
		label: 'Image',
		component: Image,
		code: toPublicExampleCode(imageCode)
	},
	{
		id: 'group',
		label: 'Group',
		component: Group,
		code: toPublicExampleCode(groupCode)
	},
	{
		id: 'gradient',
		label: 'Gradient',
		component: Gradient,
		code: toPublicExampleCode(gradientCode)
	}
];

export const avatarGroupExamples: DocsLiveExample[] = [
	{
		id: 'group',
		label: 'Group',
		component: Group,
		code: toPublicExampleCode(groupCode)
	},
	{
		id: 'glass',
		label: 'Glass',
		component: GroupGlass,
		code: toPublicExampleCode(groupGlassCode)
	}
];
