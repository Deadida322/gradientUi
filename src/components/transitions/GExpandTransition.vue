<script setup lang="ts">
	import { computed, useAttrs } from 'vue';
	import {
		makeGTransitionProps,
		resolveTransitionOptions,
		useReducedMotion,
		type GTransitionOptions
	} from '@/use/transition';

	defineOptions({ inheritAttrs: false });

	const props = defineProps(
		makeGTransitionProps({
			name: 'expand'
		})
	);
	const emit = defineEmits<{
		'before-enter': [el: Element];
		'after-enter': [el: Element];
		'before-leave': [el: Element];
		leave: [el: Element];
		'after-leave': [el: Element];
		'enter-cancelled': [el: Element];
		'leave-cancelled': [el: Element];
	}>();
	const attrs = useAttrs();
	const reducedMotion = useReducedMotion();
	const defaultTransition = computed<GTransitionOptions>(() => ({
		name: props.name,
		appear: props.appear,
		mode: props.mode,
		duration: props.duration,
		enterDuration: props.enterDuration,
		leaveDuration: props.leaveDuration,
		easing: props.easing,
		enterEasing: props.enterEasing,
		leaveEasing: props.leaveEasing
	}));
	const resolvedTransition = computed(() =>
		resolveTransitionOptions(props.transition, defaultTransition.value)
	);
	const isDisabled = computed(
		() =>
			props.disabled ||
			reducedMotion.value ||
			resolvedTransition.value.disabled
	);
	const transitionMode = computed(() =>
		resolvedTransition.value.mode === 'default'
			? undefined
			: resolvedTransition.value.mode
	);

	interface ExpandElement extends HTMLElement {
		_gExpandInitialStyles?: {
			height: string;
			overflow: string;
			transitionDuration: string;
			transitionProperty: string;
			transitionTimingFunction: string;
		};
		_gExpandCancel?: () => void;
	}

	function readCssDuration(el: HTMLElement, token: string, fallback: number) {
		const raw = getComputedStyle(el).getPropertyValue(token).trim();
		return parseDuration(raw, fallback, el);
	}

	function parseDuration(
		value: number | string | undefined,
		fallback: number,
		el: HTMLElement
	): number {
		if (value === undefined || value === '') return fallback;
		if (typeof value === 'number') return value;

		const resolvedValue = resolveCssVar(value, el).trim();

		if (resolvedValue.endsWith('ms')) {
			return Number.parseFloat(resolvedValue);
		}

		if (resolvedValue.endsWith('s')) {
			return Number.parseFloat(resolvedValue) * 1000;
		}

		const parsed = Number.parseFloat(resolvedValue);
		return Number.isNaN(parsed) ? fallback : parsed;
	}

	function resolveCssVar(value: string, el: HTMLElement) {
		const match = value.match(/var\((--[^,)]+)/);
		if (!match) return value;

		return getComputedStyle(el).getPropertyValue(match[1]).trim() || value;
	}

	function getDuration(el: HTMLElement, phase: 'enter' | 'leave') {
		const transition = resolvedTransition.value;
		const fallback = readCssDuration(
			el,
			phase === 'enter'
				? '--g-token-duration-enter'
				: '--g-token-duration-leave',
			phase === 'enter' ? 220 : 180
		);

		return parseDuration(
			phase === 'enter'
				? (transition.enterDuration ?? transition.duration)
				: (transition.leaveDuration ?? transition.duration),
			fallback,
			el
		);
	}

	function getEasing(phase: 'enter' | 'leave') {
		const transition = resolvedTransition.value;
		return (
			(phase === 'enter'
				? transition.enterEasing
				: transition.leaveEasing) ??
			transition.easing ??
			'var(--g-token-easing-standard)'
		);
	}

	function saveInitialStyles(el: ExpandElement) {
		el._gExpandInitialStyles = {
			height: el.style.height,
			overflow: el.style.overflow,
			transitionDuration: el.style.transitionDuration,
			transitionProperty: el.style.transitionProperty,
			transitionTimingFunction: el.style.transitionTimingFunction
		};
	}

	function resetStyles(el: ExpandElement) {
		const initialStyles = el._gExpandInitialStyles;
		if (!initialStyles) return;

		el.style.height = initialStyles.height;
		el.style.overflow = initialStyles.overflow;
		el.style.transitionDuration = initialStyles.transitionDuration;
		el.style.transitionProperty = initialStyles.transitionProperty;
		el.style.transitionTimingFunction =
			initialStyles.transitionTimingFunction;
		delete el._gExpandInitialStyles;
	}

	function cancelRunningTransition(el: ExpandElement) {
		el._gExpandCancel?.();
		delete el._gExpandCancel;
	}

	function prepareTransition(el: ExpandElement, phase: 'enter' | 'leave') {
		const duration = getDuration(el, phase);

		el.style.overflow = 'hidden';
		el.style.transitionProperty = 'height';
		el.style.transitionDuration = `${duration}ms`;
		el.style.transitionTimingFunction = getEasing(phase);

		return duration;
	}

	function waitForHeightTransition(
		el: ExpandElement,
		duration: number,
		done: () => void
	) {
		let finished = false;
		let timeout = 0;

		const finish = () => {
			if (finished) return;
			finished = true;
			window.clearTimeout(timeout);
			el.removeEventListener('transitionend', onTransitionEnd);
			delete el._gExpandCancel;
			done();
		};

		const onTransitionEnd = (event: TransitionEvent) => {
			if (event.target !== el || event.propertyName !== 'height') return;
			finish();
		};

		if (duration <= 0) {
			finish();
			return;
		}

		el.addEventListener('transitionend', onTransitionEnd);
		timeout = window.setTimeout(finish, duration + 80);
		el._gExpandCancel = finish;
	}

	function onBeforeEnter(el: Element) {
		emit('before-enter', el);
	}

	function onEnter(el: Element, done: () => void) {
		if (!(el instanceof HTMLElement)) {
			done();
			return;
		}

		const element = el as ExpandElement;
		cancelRunningTransition(element);
		saveInitialStyles(element);

		if (isDisabled.value) {
			done();
			return;
		}

		element.style.height = '0';
		const duration = prepareTransition(element, 'enter');

		void element.offsetHeight;
		requestAnimationFrame(() => {
			element.style.height = `${element.scrollHeight}px`;
		});
		waitForHeightTransition(element, duration, done);
	}

	function onAfterEnter(el: Element) {
		if (el instanceof HTMLElement) {
			resetStyles(el);
		}

		emit('after-enter', el);
	}

	function onBeforeLeave(el: Element) {
		emit('before-leave', el);
	}

	function onLeave(el: Element, done: () => void) {
		if (!(el instanceof HTMLElement)) {
			done();
			return;
		}

		const element = el as ExpandElement;
		cancelRunningTransition(element);
		saveInitialStyles(element);

		if (isDisabled.value) {
			done();
			return;
		}

		element.style.height = `${element.offsetHeight}px`;
		const duration = prepareTransition(element, 'leave');

		void element.offsetHeight;
		requestAnimationFrame(() => {
			element.style.height = '0';
		});
		emit('leave', el);
		waitForHeightTransition(element, duration, done);
	}

	function onAfterLeave(el: Element) {
		if (el instanceof HTMLElement) {
			resetStyles(el);
		}

		emit('after-leave', el);
	}

	function onEnterCancelled(el: Element) {
		if (el instanceof HTMLElement) {
			cancelRunningTransition(el);
			resetStyles(el);
		}

		emit('enter-cancelled', el);
	}

	function onLeaveCancelled(el: Element) {
		if (el instanceof HTMLElement) {
			cancelRunningTransition(el);
			resetStyles(el);
		}

		emit('leave-cancelled', el);
	}
</script>

<template>
	<transition
		v-bind="attrs"
		:css="false"
		:appear="resolvedTransition.appear"
		:mode="transitionMode"
		@before-enter="onBeforeEnter"
		@enter="onEnter"
		@after-enter="onAfterEnter"
		@before-leave="onBeforeLeave"
		@leave="onLeave"
		@after-leave="onAfterLeave"
		@enter-cancelled="onEnterCancelled"
		@leave-cancelled="onLeaveCancelled">
		<slot></slot>
	</transition>
</template>
