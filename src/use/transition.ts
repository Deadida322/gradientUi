import { onBeforeUnmount, onMounted, ref, type PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';

export type GTransitionPreset =
	| 'fade'
	| 'scale'
	| 'slide-x'
	| 'slide-x-reverse'
	| 'slide-y'
	| 'slide-y-reverse'
	| 'dialog'
	| 'overlay'
	| 'expand';

export type GTransitionMode = 'in-out' | 'out-in' | 'default';

export interface GTransitionOptions {
	name?: GTransitionPreset | string;
	appear?: boolean;
	disabled?: boolean;
	mode?: GTransitionMode;
	origin?: string;
	duration?: number | string;
	enterDuration?: number | string;
	leaveDuration?: number | string;
	easing?: string;
	enterEasing?: string;
	leaveEasing?: string;
	distance?: number | string;
	scale?: number | string;
	leaveAbsolute?: boolean;
	hideOnLeave?: boolean;
	css?: boolean;
}

export type GTransitionValue =
	| boolean
	| GTransitionPreset
	| string
	| GTransitionOptions;

export const transitionPresetNames: Record<GTransitionPreset, string> = {
	fade: 'g-fade-transition',
	scale: 'g-scale-transition',
	'slide-x': 'g-slide-x-transition',
	'slide-x-reverse': 'g-slide-x-reverse-transition',
	'slide-y': 'g-slide-y-transition',
	'slide-y-reverse': 'g-slide-y-reverse-transition',
	dialog: 'g-dialog-transition',
	overlay: 'g-overlay-transition',
	expand: 'g-expand-transition'
};

export const makeTransitionProps = propsFactory(
	{
		transition: {
			type: [Boolean, String, Object] as PropType<GTransitionValue>,
			default: undefined
		}
	},
	'transition'
);

export const makeGTransitionProps = propsFactory(
	{
		...makeTransitionProps(),
		name: String as PropType<GTransitionPreset | string>,
		appear: Boolean,
		disabled: Boolean,
		group: Boolean,
		tag: String,
		mode: String as PropType<GTransitionMode>,
		origin: String,
		duration: [Number, String],
		enterDuration: [Number, String],
		leaveDuration: [Number, String],
		easing: String,
		enterEasing: String,
		leaveEasing: String,
		distance: [Number, String],
		scale: [Number, String],
		leaveAbsolute: Boolean,
		hideOnLeave: Boolean,
		css: {
			type: Boolean,
			default: true
		}
	},
	'transition'
);

export function resolveTransitionName(name?: GTransitionPreset | string) {
	if (!name) return '';

	return transitionPresetNames[name as GTransitionPreset] ?? name;
}

export function toTransitionCssSize(value: number | string | undefined) {
	if (value === undefined || value === '') return undefined;

	return typeof value === 'number' ? `${value}px` : value;
}

export function toTransitionCssDuration(value: number | string | undefined) {
	if (value === undefined || value === '') return undefined;

	return typeof value === 'number' ? `${value}ms` : value;
}

export function resolveTransitionOptions(
	transition: GTransitionValue | undefined,
	defaults: GTransitionOptions
): GTransitionOptions {
	if (transition === false) {
		return {
			...defaults,
			disabled: true
		};
	}

	if (transition === true || transition === undefined) {
		return defaults;
	}

	if (typeof transition === 'string') {
		return {
			...defaults,
			name: transition
		};
	}

	return {
		...defaults,
		...transition
	};
}

export function useReducedMotion() {
	const reducedMotion = ref(false);
	let query: MediaQueryList | null = null;

	const updateReducedMotion = () => {
		reducedMotion.value = query?.matches ?? false;
	};

	onMounted(() => {
		if (typeof window === 'undefined' || !window.matchMedia) return;

		query = window.matchMedia('(prefers-reduced-motion: reduce)');
		updateReducedMotion();
		query.addEventListener('change', updateReducedMotion);
	});

	onBeforeUnmount(() => {
		query?.removeEventListener('change', updateReducedMotion);
	});

	return reducedMotion;
}
