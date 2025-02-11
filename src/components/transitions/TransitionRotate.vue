<script setup>
	import gsap from 'gsap';
	const onBeforeEnterRotate = (el) => {
		gsap.from(el, {
			position: 'absolute',
			rotate: -45,
			duration: 0.2,
			transform: 'scale(.5)'
		});
	};

	const onEnterRotate = (el, done) => {
		gsap.to(el, {
			opacity: 1,
			height: 'auto',
			onComplete: done,
			rotation: 0,
			duration: 0.2,
			ease: 'ease-in-out.out'
		});
	};

	const onLeaveRotate = (el, done) => {
		gsap.to(el, {
			opacity: 0,
			height: 0,
			duration: 0.2,
			rotation: 45,
			blur: 2,
			onComplete: done,
			ease: 'ease-in-out.in',
			transform: 'scale(.5)'
		});
	};
</script>
<template>
	<transition
		@before-enter="onBeforeEnterRotate"
		@enter="onEnterRotate"
		@leave="onLeaveRotate">
		<slot></slot>
	</transition>
</template>
