<script setup lang="ts">
	import {
		computed,
		Transition,
		TransitionGroup,
		useAttrs,
		type Component
	} from 'vue';
	import {
		makeGTransitionProps,
		resolveTransitionName,
		resolveTransitionOptions,
		toTransitionCssDuration,
		toTransitionCssSize,
		useReducedMotion,
		type GTransitionOptions
	} from '@/use/transition';

	defineOptions({ inheritAttrs: false });

	const props = defineProps(
		makeGTransitionProps({
			name: 'fade',
			css: true
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
	const transitionComponent = computed<Component>(() =>
		props.group ? TransitionGroup : Transition
	);
	const resolvedTransition = computed(() =>
		resolveTransitionOptions(props.transition, defaultTransition.value)
	);
	const resolvedName = computed(() =>
		isDisabled.value
			? ''
			: resolveTransitionName(resolvedTransition.value.name)
	);
	const isDisabled = computed(
		() =>
			props.disabled ||
			reducedMotion.value ||
			resolvedTransition.value.disabled
	);
	const transitionMode = computed(() =>
		props.group || resolvedTransition.value.mode === 'default'
			? undefined
			: resolvedTransition.value.mode
	);
	const transitionCss = computed(
		() => !isDisabled.value && resolvedTransition.value.css !== false
	);
	const defaultTransition = computed<GTransitionOptions>(() => ({
		name: props.name,
		appear: props.appear,
		mode: props.mode,
		origin: props.origin,
		duration: props.duration,
		enterDuration: props.enterDuration,
		leaveDuration: props.leaveDuration,
		easing: props.easing,
		enterEasing: props.enterEasing,
		leaveEasing: props.leaveEasing,
		distance: props.distance,
		scale: props.scale,
		leaveAbsolute: props.leaveAbsolute,
		hideOnLeave: props.hideOnLeave,
		css: props.css
	}));
	const runtimeStyles = computed(() => {
		const transition = resolvedTransition.value;

		return {
			'--g-transition-enter-duration': toTransitionCssDuration(
				transition.enterDuration ?? transition.duration
			),
			'--g-transition-leave-duration': toTransitionCssDuration(
				transition.leaveDuration ?? transition.duration
			),
			'--g-transition-enter-easing':
				transition.enterEasing ?? transition.easing,
			'--g-transition-leave-easing':
				transition.leaveEasing ?? transition.easing,
			'--g-transition-origin': transition.origin,
			'--g-transition-distance': toTransitionCssSize(transition.distance),
			'--g-transition-scale':
				transition.scale === undefined
					? undefined
					: String(transition.scale)
		};
	});

	interface TransitionElement extends HTMLElement {
		_gTransitionInitialStyles?: {
			position: string;
			top: string;
			left: string;
			width: string;
			height: string;
			display: string;
		};
	}

	function applyRuntimeStyles(el: Element) {
		if (!(el instanceof HTMLElement)) return;

		for (const [property, value] of Object.entries(runtimeStyles.value)) {
			if (value !== undefined) {
				el.style.setProperty(property, value);
			}
		}
	}

	function freezeLeavingLayout(el: TransitionElement) {
		const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = el;

		el._gTransitionInitialStyles = {
			position: el.style.position,
			top: el.style.top,
			left: el.style.left,
			width: el.style.width,
			height: el.style.height,
			display: el.style.display
		};
		el.style.position = 'absolute';
		el.style.top = `${offsetTop}px`;
		el.style.left = `${offsetLeft}px`;
		el.style.width = `${offsetWidth}px`;
		el.style.height = `${offsetHeight}px`;
	}

	function restoreLeavingLayout(el: TransitionElement) {
		const styles = el._gTransitionInitialStyles;
		if (!styles) return;

		el.style.position = styles.position;
		el.style.top = styles.top;
		el.style.left = styles.left;
		el.style.width = styles.width;
		el.style.height = styles.height;
		el.style.display = styles.display;
		delete el._gTransitionInitialStyles;
	}

	function onBeforeEnter(el: Element) {
		applyRuntimeStyles(el);
		emit('before-enter', el);
	}

	function onAfterEnter(el: Element) {
		emit('after-enter', el);
	}

	function onBeforeLeave(el: Element) {
		applyRuntimeStyles(el);
		emit('before-leave', el);
	}

	function onLeave(el: Element) {
		if (!(el instanceof HTMLElement)) {
			emit('leave', el);
			return;
		}

		if (resolvedTransition.value.leaveAbsolute) {
			freezeLeavingLayout(el);
		}

		if (resolvedTransition.value.hideOnLeave) {
			el.style.setProperty('display', 'none', 'important');
		}

		emit('leave', el);
	}

	function onAfterLeave(el: Element) {
		if (el instanceof HTMLElement) {
			restoreLeavingLayout(el);
		}

		emit('after-leave', el);
	}

	function onEnterCancelled(el: Element) {
		emit('enter-cancelled', el);
	}

	function onLeaveCancelled(el: Element) {
		if (el instanceof HTMLElement) {
			restoreLeavingLayout(el);
		}

		emit('leave-cancelled', el);
	}
</script>

<template>
	<component
		:is="transitionComponent"
		v-bind="attrs"
		:name="resolvedName"
		:css="transitionCss"
		:appear="resolvedTransition.appear"
		:mode="transitionMode"
		:tag="props.group ? props.tag : undefined"
		@before-enter="onBeforeEnter"
		@after-enter="onAfterEnter"
		@before-leave="onBeforeLeave"
		@leave="onLeave"
		@after-leave="onAfterLeave"
		@enter-cancelled="onEnterCancelled"
		@leave-cancelled="onLeaveCancelled">
		<slot></slot>
	</component>
</template>
