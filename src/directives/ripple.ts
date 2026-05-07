import type { Directive } from 'vue';
import { resolveColorValue, type GColor } from '@/use/colorResolver';

export type RippleBindingValue =
	| boolean
	| string
	| {
			center?: boolean;
			color?: GColor;
			disabled?: boolean;
			duration?: number | string;
			easing?: string;
			opacity?: number;
	  };

type RippleOptions = {
	center: boolean;
	color: string;
	disabled: boolean;
	duration: number | string;
	easing: string;
	opacity: number;
};

type RippleState = {
	originalPosition: string;
	options: RippleOptions;
	onKeyDown: (event: KeyboardEvent) => void;
	onPointerDown: (event: PointerEvent) => void;
	ripples: Set<HTMLElement>;
};

type RippleElement = HTMLElement & {
	__gRipple__?: RippleState;
};

const DEFAULT_OPTIONS: RippleOptions = {
	center: false,
	color: 'currentcolor',
	disabled: false,
	duration: 520,
	easing: 'var(--g-token-easing-standard)',
	opacity: 0.16
};

function resolveOptions(value: RippleBindingValue | undefined): RippleOptions {
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

function toCssDuration(value: number | string) {
	return typeof value === 'number' ? `${value}ms` : value;
}

function toDurationMs(value: number | string) {
	if (typeof value === 'number') return value;

	const normalizedValue = value.trim();

	if (normalizedValue.endsWith('ms')) {
		return Number.parseFloat(normalizedValue);
	}

	if (normalizedValue.endsWith('s')) {
		return Number.parseFloat(normalizedValue) * 1000;
	}

	const parsedValue = Number.parseFloat(normalizedValue);

	return Number.isNaN(parsedValue)
		? Number(DEFAULT_OPTIONS.duration)
		: parsedValue;
}

function createRipple(
	el: HTMLElement,
	origin: { x: number; y: number },
	options: RippleOptions
) {
	const rect = el.getBoundingClientRect();
	const size = Math.hypot(rect.width, rect.height) * 2;
	const x = origin.x - rect.left - size / 2;
	const y = origin.y - rect.top - size / 2;
	const containerEl = document.createElement('span');
	const animationEl = document.createElement('span');

	containerEl.className = 'g-ripple__container';
	containerEl.style.setProperty('--g-ripple-color', options.color);
	containerEl.style.setProperty(
		'--g-ripple-duration',
		toCssDuration(options.duration)
	);
	containerEl.style.setProperty('--g-ripple-easing', options.easing);
	containerEl.style.setProperty(
		'--g-ripple-opacity',
		String(options.opacity)
	);

	animationEl.className = 'g-ripple__animation';
	animationEl.style.width = `${size}px`;
	animationEl.style.height = `${size}px`;
	animationEl.style.left = `${x}px`;
	animationEl.style.top = `${y}px`;

	containerEl.appendChild(animationEl);
	el.appendChild(containerEl);

	return containerEl;
}

function removeRipple(el: RippleElement, rippleEl: HTMLElement) {
	rippleEl.remove();
	el.__gRipple__?.ripples.delete(rippleEl);
}

function clearRipples(el: RippleElement) {
	const state = el.__gRipple__;

	if (!state) return;

	for (const rippleEl of state.ripples) {
		rippleEl.remove();
	}

	state.ripples.clear();
}

function getCenteredOrigin(el: HTMLElement) {
	const rect = el.getBoundingClientRect();

	return {
		x: rect.left + rect.width / 2,
		y: rect.top + rect.height / 2
	};
}

function isElementDisabled(el: HTMLElement) {
	return (
		el.hasAttribute('disabled') ||
		el.getAttribute('aria-disabled') === 'true' ||
		el.classList.contains('g-button_disabled')
	);
}

function triggerRipple(
	el: RippleElement,
	origin: { x: number; y: number },
	options: RippleOptions
) {
	if (options.disabled || isElementDisabled(el)) return;

	ensureHostStyles(el);

	const rippleEl = createRipple(el, origin, options);

	el.__gRipple__?.ripples.add(rippleEl);
	window.setTimeout(
		() => removeRipple(el, rippleEl),
		toDurationMs(options.duration)
	);
}

function bind(el: RippleElement, value: RippleBindingValue | undefined) {
	if (el.__gRipple__) {
		update(el, value);
		return;
	}

	const options = resolveOptions(value);

	const state: RippleState = {
		originalPosition: el.style.position,
		options,
		onKeyDown: (event) => {
			if (event.key !== 'Enter' && event.key !== ' ') return;
			triggerRipple(el, getCenteredOrigin(el), state.options);
		},
		onPointerDown: (event) => {
			if (event.button !== 0 || el.hasAttribute('disabled')) return;
			triggerRipple(
				el,
				state.options.center
					? getCenteredOrigin(el)
					: { x: event.clientX, y: event.clientY },
				state.options
			);
		},
		ripples: new Set()
	};

	el.addEventListener('pointerdown', state.onPointerDown);
	el.addEventListener('keydown', state.onKeyDown);
	el.__gRipple__ = state;
}

function update(el: RippleElement, value: RippleBindingValue | undefined) {
	const state = el.__gRipple__;

	if (!state) return;

	state.options = resolveOptions(value);

	if (state.options.disabled) {
		clearRipples(el);
	}
}

function unbind(el: RippleElement) {
	const state = el.__gRipple__;

	if (!state) return;

	el.removeEventListener('pointerdown', state.onPointerDown);
	el.removeEventListener('keydown', state.onKeyDown);
	clearRipples(el);

	el.style.position = state.originalPosition;
	delete el.__gRipple__;
}

export const ripple: Directive<RippleElement, RippleBindingValue> = {
	mounted(el, binding) {
		bind(el, binding.value);
	},

	updated(el, binding) {
		update(el, binding.value);
	},

	unmounted(el) {
		unbind(el);
	}
};
