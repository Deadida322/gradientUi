import { createApp } from 'vue';
import type { DirectiveBinding } from 'vue';
import RippleEffect from '@/components/GRipple.vue';

const ripple = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		el.style.position = 'relative';
		el.style.overflow = 'hidden';

		const rippleColor = binding.value || 'currentColor';

		el.addEventListener('click', (e: MouseEvent) => {
			const rect = el.getBoundingClientRect();
			const size = Math.min(rect.width, rect.height);

			const x = e.clientX - rect.left - size / 2;
			const y = e.clientY - rect.top - size / 2;

			const rippleInstance = createApp(RippleEffect, {
				x,
				y,
				size,
				color: rippleColor
			});

			const rippleEl = document.createElement('div');
			rippleEl.style.position = 'absolute';
			rippleEl.style.top = '0';
			rippleEl.style.left = '0';
			el.appendChild(rippleEl);
			rippleInstance.mount(rippleEl);

			setTimeout(() => {
				rippleInstance.unmount();
				el.removeChild(rippleEl);
			}, 400);
		});
	}
};

export { ripple };
