import type { Directive } from 'vue';
import { resolveColorValue, type GColor } from '@/use/colorResolver';

export type SpecularBindingValue =
	| boolean
	| GColor
	| {
			color?: GColor;
			disabled?: boolean;
			duration?: number | string;
			easing?: string;
			opacity?: number;
			size?: number | string;
	  };

type SpecularOptions = {
	color: string;
	disabled: boolean;
	duration: number | string;
	easing: string;
	opacity: number;
	size: number | string;
};

type SpecularState = {
	containerEl: HTMLElement;
	highlightEl: HTMLElement;
	options: SpecularOptions;
	originalPosition: string;
	onBlur: () => void;
	onFocus: () => void;
	onPointerEnter: (event: PointerEvent) => void;
	onPointerLeave: () => void;
	onPointerMove: (event: PointerEvent) => void;
};

type SpecularElement = HTMLElement & {
	__gSpecular__?: SpecularState;
};

const DEFAULT_OPTIONS: SpecularOptions = {
	color: 'var(--g-color, var(--g-gradient-material-color, currentcolor))',
	disabled: false,
	duration: 180,
	easing: 'var(--g-token-easing-standard)',
	opacity: 0.28,
	size: '140px'
};

function resolveOptions(
	value: SpecularBindingValue | undefined
): SpecularOptions {
	if (typeof value === 'boolean') {
		return {
			...DEFAULT_OPTIONS,
			disabled: !value
		};
	}

	if (typeof value === 'string') {
		return {
			...DEFAULT_OPTIONS,
			color: resolveColorValue(value)
		};
	}

	const color = value?.color
		? resolveColorValue(value.color)
		: DEFAULT_OPTIONS.color;

	return {
		...DEFAULT_OPTIONS,
		...value,
		color
	};
}

function ensureHostStyles(el: HTMLElement) {
	const position = getComputedStyle(el).position;

	if (position === 'static') {
		el.style.position = 'relative';
	}
}

function toCssLength(value: number | string) {
	return typeof value === 'number' ? `${value}px` : value;
}

function toCssDuration(value: number | string) {
	return typeof value === 'number' ? `${value}ms` : value;
}

function isElementDisabled(el: HTMLElement) {
	return (
		el.hasAttribute('disabled') ||
		el.getAttribute('aria-disabled') === 'true' ||
		el.classList.contains('g-button_disabled')
	);
}

function applyOptions(el: HTMLElement, options: SpecularOptions) {
	el.style.setProperty('--g-specular-color', options.color);
	el.style.setProperty('--g-specular-size', toCssLength(options.size));
	el.style.setProperty(
		'--g-specular-duration',
		toCssDuration(options.duration)
	);
	el.style.setProperty('--g-specular-easing', options.easing);
	el.style.setProperty('--g-specular-max-opacity', String(options.opacity));
}

function setOrigin(el: HTMLElement, x: number, y: number) {
	const rect = el.getBoundingClientRect();

	el.style.setProperty('--g-specular-x', `${x - rect.left}px`);
	el.style.setProperty('--g-specular-y', `${y - rect.top}px`);
}

function setCenteredOrigin(el: HTMLElement) {
	const rect = el.getBoundingClientRect();

	el.style.setProperty('--g-specular-x', `${rect.width / 2}px`);
	el.style.setProperty('--g-specular-y', `${rect.height / 2}px`);
}

function show(el: SpecularElement) {
	const state = el.__gSpecular__;

	if (!state || state.options.disabled || isElementDisabled(el)) return;

	el.setAttribute('data-g-specular-active', 'true');
}

function hide(el: SpecularElement) {
	el.removeAttribute('data-g-specular-active');
}

function createHighlight() {
	const containerEl = document.createElement('span');
	const highlightEl = document.createElement('span');

	containerEl.className = 'g-specular__container';
	highlightEl.className = 'g-specular__highlight';
	containerEl.appendChild(highlightEl);

	return {
		containerEl,
		highlightEl
	};
}

function bind(el: SpecularElement, value: SpecularBindingValue | undefined) {
	if (el.__gSpecular__) {
		update(el, value);
		return;
	}

	const options = resolveOptions(value);
	const { containerEl, highlightEl } = createHighlight();

	ensureHostStyles(el);
	applyOptions(el, options);
	setCenteredOrigin(el);
	el.classList.add('g-specular');
	el.appendChild(containerEl);

	const state: SpecularState = {
		containerEl,
		highlightEl,
		options,
		originalPosition: el.style.position,
		onBlur: () => hide(el),
		onFocus: () => {
			setCenteredOrigin(el);
			show(el);
		},
		onPointerEnter: (event) => {
			setOrigin(el, event.clientX, event.clientY);
			show(el);
		},
		onPointerLeave: () => hide(el),
		onPointerMove: (event) => {
			setOrigin(el, event.clientX, event.clientY);
		}
	};

	el.addEventListener('blur', state.onBlur);
	el.addEventListener('focus', state.onFocus);
	el.addEventListener('pointerenter', state.onPointerEnter);
	el.addEventListener('pointerleave', state.onPointerLeave);
	el.addEventListener('pointermove', state.onPointerMove);
	el.__gSpecular__ = state;
}

function update(el: SpecularElement, value: SpecularBindingValue | undefined) {
	const state = el.__gSpecular__;

	if (!state) return;

	state.options = resolveOptions(value);
	applyOptions(el, state.options);

	if (state.options.disabled) {
		hide(el);
	}
}

function unbind(el: SpecularElement) {
	const state = el.__gSpecular__;

	if (!state) return;

	el.removeEventListener('blur', state.onBlur);
	el.removeEventListener('focus', state.onFocus);
	el.removeEventListener('pointerenter', state.onPointerEnter);
	el.removeEventListener('pointerleave', state.onPointerLeave);
	el.removeEventListener('pointermove', state.onPointerMove);
	state.containerEl.remove();
	el.classList.remove('g-specular');
	hide(el);

	el.style.position = state.originalPosition;
	el.style.removeProperty('--g-specular-color');
	el.style.removeProperty('--g-specular-duration');
	el.style.removeProperty('--g-specular-easing');
	el.style.removeProperty('--g-specular-max-opacity');
	el.style.removeProperty('--g-specular-size');
	el.style.removeProperty('--g-specular-x');
	el.style.removeProperty('--g-specular-y');
	delete el.__gSpecular__;
}

export const specular: Directive<SpecularElement, SpecularBindingValue> = {
	mounted(el, binding) {
		if (binding.value === false) return;

		bind(el, binding.value);
	},

	updated(el, binding) {
		if (binding.value === false) {
			unbind(el);
			return;
		}

		bind(el, binding.value);
	},

	unmounted(el) {
		unbind(el);
	}
};
