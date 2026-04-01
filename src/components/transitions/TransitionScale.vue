<script setup>
	import { useAttrs } from 'vue';
	import gsap from 'gsap';

	const attrs = useAttrs();
	const emit = defineEmits(['leave']);
	const onBeforeEnterRotate = (el) => {
		gsap.from(el, {
			transform: 'scale(0)',
			duration: 0.2,
			ease: 'back.out'
		});
	};

	const onEnterRotate = (el) => {
		gsap.to(el, {
			transform: 'scale(1)',
			duration: 0.2,
			ease: 'ease.out'
		});
	};

	const onLeaveRotate = async (el, done) => {
		await gsap.to(el, {
			duration: 0.2,
			onComplete: done,
			ease: 'ease.out',
			transform: 'scale(0)'
		});
		emit('leave');
	};
</script>
<template>
	<transition
		v-bind="attrs"
		@before-enter="onBeforeEnterRotate"
		@enter="onEnterRotate"
		@leave="onLeaveRotate">
		<slot></slot>
	</transition>
</template>
