import Gradient from './gradient.vue';
import gradientCode from './gradient.vue?raw';
import GradientIcon from './gradient-icon.vue';
import gradientIconCode from './gradient-icon.vue?raw';
import GradientSelector from './gradient-selector.vue';
import gradientSelectorCode from './gradient-selector.vue?raw';
import GradientSingleColor from './gradient-single-color.vue';
import gradientSingleColorCode from './gradient-single-color.vue?raw';
import Loading from './loading.vue';
import loadingCode from './loading.vue?raw';
import LoadingBoolean from './loading-boolean.vue';
import loadingBooleanCode from './loading-boolean.vue?raw';
import LoadingDark from './loading-dark.vue';
import loadingDarkCode from './loading-dark.vue?raw';
import Ripple from './ripple.vue';
import rippleCode from './ripple.vue?raw';
import RippleDisabled from './ripple-disabled.vue';
import rippleDisabledCode from './ripple-disabled.vue?raw';
import RippleOptions from './ripple-options.vue';
import rippleOptionsCode from './ripple-options.vue?raw';
import Tooltip from './tooltip.vue';
import tooltipCode from './tooltip.vue?raw';
import TooltipFocus from './tooltip-focus.vue';
import tooltipFocusCode from './tooltip-focus.vue?raw';
import TooltipPlacement from './tooltip-placement.vue';
import tooltipPlacementCode from './tooltip-placement.vue?raw';
import type { DocsLiveExample } from '@/docs/types';
import { toPublicExampleCode } from '@/docs/utils/code';

export const loadingDirectiveExamples: DocsLiveExample[] = [
	{
		id: 'loading-object',
		label: 'Object binding',
		component: Loading,
		code: toPublicExampleCode(loadingCode)
	},
	{
		id: 'loading-boolean',
		label: 'Boolean',
		component: LoadingBoolean,
		code: toPublicExampleCode(loadingBooleanCode)
	},
	{
		id: 'loading-dark',
		label: 'Dark modifier',
		component: LoadingDark,
		code: toPublicExampleCode(loadingDarkCode)
	}
];

export const tooltipDirectiveExamples: DocsLiveExample[] = [
	{
		id: 'tooltip-basic',
		label: 'String',
		component: Tooltip,
		code: toPublicExampleCode(tooltipCode)
	},
	{
		id: 'tooltip-placement',
		label: 'Placement',
		component: TooltipPlacement,
		code: toPublicExampleCode(tooltipPlacementCode)
	},
	{
		id: 'tooltip-focus',
		label: 'Focus',
		component: TooltipFocus,
		code: toPublicExampleCode(tooltipFocusCode)
	}
];

export const gradientDirectiveExamples: DocsLiveExample[] = [
	{
		id: 'gradient-single-color',
		label: 'Single color',
		component: GradientSingleColor,
		code: toPublicExampleCode(gradientSingleColorCode)
	},
	{
		id: 'gradient-text',
		label: 'Text',
		component: Gradient,
		code: toPublicExampleCode(gradientCode)
	},
	{
		id: 'gradient-selector',
		label: 'Selector',
		component: GradientSelector,
		code: toPublicExampleCode(gradientSelectorCode)
	},
	{
		id: 'gradient-icon',
		label: 'Icon',
		component: GradientIcon,
		code: toPublicExampleCode(gradientIconCode)
	}
];

export const rippleDirectiveExamples: DocsLiveExample[] = [
	{
		id: 'ripple-basic',
		label: 'Basic',
		component: Ripple,
		code: toPublicExampleCode(rippleCode)
	},
	{
		id: 'ripple-options',
		label: 'Options',
		component: RippleOptions,
		code: toPublicExampleCode(rippleOptionsCode)
	},
	{
		id: 'ripple-disabled',
		label: 'Disabled',
		component: RippleDisabled,
		code: toPublicExampleCode(rippleDisabledCode)
	}
];
