<template>
	<Transition
		:css="false"
		@enter="enter"
		@leave="leave">
		<slot></slot>
	</Transition>
</template>

<script setup lang="ts">
	interface Props {
		duration?: number;
		easing?: string;
	}

	interface ExpansionElement extends HTMLElement {
		_gExpansionInitialStyles?: {
			height: string;
			overflow: string;
			transitionDuration: string;
			transitionProperty: string;
			transitionTimingFunction: string;
		};
	}

	const props = withDefaults(defineProps<Props>(), {
		duration: 0.25,
		easing: 'var(--g-token-easing-standard)'
	});

	const saveInitialStyles = (el: ExpansionElement) => {
		el._gExpansionInitialStyles = {
			height: el.style.height,
			overflow: el.style.overflow,
			transitionDuration: el.style.transitionDuration,
			transitionProperty: el.style.transitionProperty,
			transitionTimingFunction: el.style.transitionTimingFunction
		};
	};

	const restoreInitialStyles = (el: ExpansionElement) => {
		const styles = el._gExpansionInitialStyles;
		if (!styles) return;

		el.style.height = styles.height;
		el.style.overflow = styles.overflow;
		el.style.transitionDuration = styles.transitionDuration;
		el.style.transitionProperty = styles.transitionProperty;
		el.style.transitionTimingFunction = styles.transitionTimingFunction;
		delete el._gExpansionInitialStyles;
	};

	const waitForTransition = (el: ExpansionElement, done: () => void) => {
		let timeout = 0;
		const finish = () => {
			window.clearTimeout(timeout);
			el.removeEventListener('transitionend', onTransitionEnd);
			restoreInitialStyles(el);
			done();
		};
		const onTransitionEnd = (event: TransitionEvent) => {
			if (event.target !== el || event.propertyName !== 'height') return;

			finish();
		};

		el.addEventListener('transitionend', onTransitionEnd);
		timeout = window.setTimeout(finish, props.duration * 1000 + 80);
	};

	const prepareTransition = (el: ExpansionElement) => {
		el.style.overflow = 'hidden';
		el.style.transitionProperty = 'height';
		el.style.transitionDuration = `${props.duration}s`;
		el.style.transitionTimingFunction = props.easing;
	};

	const enter = (el: Element, done: () => void) => {
		if (!(el instanceof HTMLElement)) {
			done();
			return;
		}

		const element = el as ExpansionElement;
		saveInitialStyles(element);
		element.style.height = '0';
		prepareTransition(element);

		void element.offsetHeight;
		requestAnimationFrame(() => {
			element.style.height = `${element.scrollHeight}px`;
		});
		waitForTransition(element, done);
	};

	const leave = (el: Element, done: () => void) => {
		if (!(el instanceof HTMLElement)) {
			done();
			return;
		}

		const element = el as ExpansionElement;
		saveInitialStyles(element);
		element.style.height = `${element.offsetHeight}px`;
		prepareTransition(element);

		void element.offsetHeight;
		requestAnimationFrame(() => {
			element.style.height = '0';
		});
		waitForTransition(element, done);
	};
</script>
