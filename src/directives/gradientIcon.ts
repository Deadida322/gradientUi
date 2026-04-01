import type { DirectiveBinding } from 'vue';

export default (el: HTMLElement, binding: DirectiveBinding) => {
	const state = binding.value?.state || 'main';
	const gradients = {
		main: 'var(--g-gradient-main)',
		error: 'var(--g-gradient-error)',
		warning: 'var(--g-gradient-warning'
	};

	const setGradient = (el: HTMLElement) => {
		if (!el) return;
		el.style['-webkit-text-fill-color'] = 'transparent';
		el.style.background = gradients[state];
		el.style['background-clip'] = 'text';
	};
	if (el.classList.contains('mdi')) {
		setGradient(el);
	} else {
		const elements = Array.from(el.querySelectorAll('.mdi'));
		for (const element of elements) {
			setGradient(element as HTMLElement);
		}
	}
};
