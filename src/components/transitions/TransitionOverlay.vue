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
		readDuration('--g-token-duration-enter', 0.32);

	const getLeaveDuration = () =>
		readDuration('--g-token-duration-leave', 0.24);

	const getContent = (el) => el.querySelector('.base-overlay__content');
	const getScrim = (el) => el.querySelector('.base-overlay__scrim');

	const onBeforeEnter = (el) => {
		const content = getContent(el);
		const scrim = getScrim(el);

		if (scrim) {
			gsap.set(scrim, { opacity: 0 });
		}

		if (content) {
			gsap.set(content, {
				opacity: 0,
				y: 10,
				scale: 0.992
			});
		}
	};

	const onEnter = (el, done) => {
		const content = getContent(el);
		const scrim = getScrim(el);
		let pending = 0;
		const finish = () => {
			pending -= 1;
			if (pending <= 0) done();
		};

		if (scrim) {
			pending += 1;
			gsap.to(scrim, {
				opacity: 1,
				duration: getEnterDuration(),
				ease: 'power2.out',
				onComplete: finish
			});
		}

		if (content) {
			pending += 1;
			gsap.to(content, {
				opacity: 1,
				y: 0,
				scale: 1,
				duration: getEnterDuration(),
				ease: 'power2.out',
				delay: 0.02,
				onComplete: finish
			});
		}

		if (!pending) done();
	};

	const onLeave = (el, done) => {
		const content = getContent(el);
		const scrim = getScrim(el);
		let pending = 0;
		const finish = () => {
			pending -= 1;
			if (pending <= 0) {
				emit('leave');
				done();
			}
		};

		if (content) {
			pending += 1;
			gsap.to(content, {
				opacity: 0,
				y: 6,
				scale: 0.996,
				duration: getLeaveDuration(),
				ease: 'power1.out',
				onComplete: finish
			});
		}

		if (scrim) {
			pending += 1;
			gsap.to(scrim, {
				opacity: 0,
				duration: getLeaveDuration(),
				ease: 'power1.out',
				delay: 0.02,
				onComplete: finish
			});
		}

		if (!pending) {
			emit('leave');
			done();
		}
	};
</script>

<template>
	<transition
		:css="false"
		v-bind="attrs"
		@before-enter="onBeforeEnter"
		@enter="onEnter"
		@leave="onLeave">
		<slot></slot>
	</transition>
</template>
