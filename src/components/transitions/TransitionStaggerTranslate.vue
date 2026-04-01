<script setup>
	import { useAttrs } from 'vue';
	import gsap from 'gsap';

	const attrs = useAttrs();
	function onBeforeEnter(el) {
		gsap.from(el, {
			opacity: 0,
			height: 0,
			duration: 0.2
		});
	}

	function onEnter(el, done) {
		gsap.to(el, {
			opacity: 1,
			height: 'auto',
			onComplete: done,
			rotation: 0,
			duration: 0.2,
			delay: el.dataset.index * 0.1,
			ease: 'ease-in-out.out'
		});
	}

	function onLeave(el, done) {
		gsap.to(el, {
			opacity: 0,
			height: 0,
			duration: 0.2,
			onComplete: done,
			delay: el.dataset.index * 0.1,
			ease: 'ease-in-out.in'
		});
	}
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
