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
		readDuration('--g-token-duration-enter', 0.28);

	const getLeaveDuration = () =>
		readDuration('--g-token-duration-leave', 0.22);

	const onBeforeEnterRotate = (el) => {
		gsap.from(el, {
			opacity: 0,
			transform: 'scale(0.94)',
			duration: getEnterDuration(),
			ease: 'power2.out'
		});
	};

	const onEnterRotate = (el) => {
		gsap.to(el, {
			opacity: 1,
			transform: 'scale(1)',
			duration: getEnterDuration(),
			ease: 'power2.out'
		});
	};

	const onLeaveRotate = async (el, done) => {
		await gsap.to(el, {
			duration: getLeaveDuration(),
			onComplete: done,
			ease: 'power1.out',
			opacity: 0,
			transform: 'scale(0.985)'
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
