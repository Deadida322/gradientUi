<template>
	<Transition
		@enter="enter"
		@leave="leave">
		<slot />
	</Transition>
</template>

<script setup lang="ts">
	import gsap from 'gsap';

	interface Props {
		duration?: number;
		easing?: string;
	}

	const props = defineProps<Props>();

	const duration = props.duration ?? 0.25;
	const easing = props.easing ?? 'power2.out';

	function enter(el: Element, done: () => void) {
		const element = el as HTMLElement;
		const height = element.scrollHeight;
		gsap.fromTo(
			element,
			{
				height: 0,
				overflow: 'hidden'
			},
			{
				height,
				duration,
				ease: easing,
				onComplete: () => {
					element.style.height = '';
					element.style.overflow = '';
					done();
				}
			}
		);
	}

	function leave(el: Element, done: () => void) {
		const element = el as HTMLElement;

		gsap.to(el, {
			height: 0,
			duration,
			ease: easing,
			onComplete: () => {
				element.style.height = '';
				element.style.overflow = '';
				done();
			}
		});
	}
</script>
