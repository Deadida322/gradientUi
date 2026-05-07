<script setup lang="ts">
	import { useAttrs } from 'vue';
	import gsap from 'gsap';

	const attrs = useAttrs();
	const leaveCounts = new WeakMap<HTMLElement, number>();

	const getIndex = (el: Element) =>
		Number((el as HTMLElement).dataset.index ?? 0);
	const getDelay = (el: Element) => getIndex(el) * 0.055;
	const lockParent = (el: Element) => {
		const parent = el.parentElement;

		if (!parent) return undefined;

		if (!leaveCounts.has(parent)) {
			gsap.set(parent, {
				width: parent.offsetWidth,
				height: parent.offsetHeight
			});
			leaveCounts.set(parent, 0);
		}

		leaveCounts.set(parent, (leaveCounts.get(parent) ?? 0) + 1);

		return parent;
	};
	const releaseParent = (parent?: HTMLElement) => {
		if (!parent) return;

		const nextCount = (leaveCounts.get(parent) ?? 1) - 1;

		if (nextCount > 0) {
			leaveCounts.set(parent, nextCount);
			return;
		}

		leaveCounts.delete(parent);
		gsap.set(parent, {
			clearProps: 'width,height'
		});
	};
	const lockPosition = (el: Element) => {
		const element = el as HTMLElement;
		const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = element;

		gsap.set(element, {
			position: 'absolute',
			top: offsetTop,
			left: offsetLeft,
			width: offsetWidth,
			height: offsetHeight
		});
	};

	const onBeforeEnter = (el: Element) => {
		gsap.killTweensOf(el);
		gsap.set(el, {
			opacity: 0,
			y: 10,
			scale: 0.96,
			transformOrigin: '100% 100%'
		});
	};

	const onEnter = (el: Element, done: () => void) => {
		gsap.to(el, {
			opacity: 1,
			y: 0,
			scale: 1,
			onComplete: done,
			duration: 0.24,
			delay: getDelay(el),
			ease: 'power2.out'
		});
	};

	const onLeave = (el: Element, done: () => void) => {
		const parent = lockParent(el);

		gsap.killTweensOf(el);
		lockPosition(el);
		gsap.to(el, {
			opacity: 0,
			y: 10,
			scale: 0.96,
			duration: 0.24,
			onComplete: () => {
				releaseParent(parent);
				done();
			},
			delay: getDelay(el),
			ease: 'power2.out'
		});
	};
</script>

<template>
	<TransitionGroup
		:css="false"
		v-bind="attrs"
		@before-enter="onBeforeEnter"
		@enter="onEnter"
		@leave="onLeave">
		<slot></slot>
	</TransitionGroup>
</template>
