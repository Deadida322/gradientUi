<script setup>
	import { useAttrs } from 'vue';
	import gsap from 'gsap';

	const attrs = useAttrs();
	const emit = defineEmits(['leave']);

	const getRootStyles = () => getComputedStyle(document.documentElement);

	const readDuration = (token, fallback) => {
		const raw = getRootStyles().getPropertyValue(token).trim();
		if (!raw) return fallback;
		if (raw.endsWith('ms')) return Number.parseFloat(raw) / 1000;
		if (raw.endsWith('s')) return Number.parseFloat(raw);
		const parsed = Number.parseFloat(raw);
		return Number.isNaN(parsed) ? fallback : parsed;
	};

	const getEnterDuration = () =>
		readDuration('--g-token-duration-enter', 0.22);

	const getLeaveDuration = () =>
		readDuration('--g-token-duration-leave', 0.18);

	const onBeforeEnterRotate = (el) => {
		gsap.from(el, {
			transform: 'scale(0)',
			duration: getEnterDuration(),
			ease: 'back.out'
		});
	};

	const onEnterRotate = (el) => {
		gsap.to(el, {
			transform: 'scale(1)',
			duration: getEnterDuration(),
			ease: 'ease.out'
		});
	};

	const onLeaveRotate = async (el, done) => {
		await gsap.to(el, {
			duration: getLeaveDuration(),
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
