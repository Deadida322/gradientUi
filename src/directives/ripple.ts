import type { Directive } from 'vue';

export type RippleBindingValue =
	| string
	| {
			color?: string;
			disabled?: boolean;
			duration?: number;
			opacity?: number;
	  };

type RippleOptions = {
	color: string;
	disabled: boolean;
	duration: number;
	opacity: number;
};

type RippleState = {
	originalPosition: string;
	onPointerDown: (event: PointerEvent) => void;
	ripples: Set<HTMLElement>;
};

type RippleElement = HTMLElement & {
	__gRipple__?: RippleState;
};

const DEFAULT_OPTIONS: RippleOptions = {
	color: 'currentColor',
	disabled: false,
	duration: 520,
	opacity: 0.16
};

function resolveOptions(value: RippleBindingValue | undefined): RippleOptions {
	if (typeof value === 'string') {
		return {
			...DEFAULT_OPTIONS,
			color: value
		};
	}

	return {
		...DEFAULT_OPTIONS,
		...value
	};
}

function ensureHostStyles(el: HTMLElement) {
	const position = getComputedStyle(el).position;

	if (position === 'static') {
		el.style.position = 'relative';
	}
}

function createRipple(
	el: HTMLElement,
	event: PointerEvent,
	options: RippleOptions
) {
	const rect = el.getBoundingClientRect();
	const size = Math.hypot(rect.width, rect.height) * 2;
	const x = event.clientX - rect.left - size / 2;
	const y = event.clientY - rect.top - size / 2;
	const containerEl = document.createElement('span');
	const animationEl = document.createElement('span');

	containerEl.className = 'g-ripple__container';
	containerEl.style.setProperty('--g-ripple-color', options.color);
	containerEl.style.setProperty(
		'--g-ripple-duration',
		`${options.duration}ms`
	);
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

function bind(el: RippleElement, value: RippleBindingValue | undefined) {
	unbind(el);

	const options = resolveOptions(value);

	if (options.disabled) return;

	const state: RippleState = {
		originalPosition: el.style.position,
		onPointerDown: (event) => {
			if (event.button !== 0 || el.hasAttribute('disabled')) return;

			ensureHostStyles(el);

			const rippleEl = createRipple(el, event, options);

			state.ripples.add(rippleEl);
			window.setTimeout(
				() => removeRipple(el, rippleEl),
				options.duration
			);
		},
		ripples: new Set()
	};

	el.addEventListener('pointerdown', state.onPointerDown);
	el.__gRipple__ = state;
}

function unbind(el: RippleElement) {
	const state = el.__gRipple__;

	if (!state) return;

	el.removeEventListener('pointerdown', state.onPointerDown);

	for (const rippleEl of state.ripples) {
		rippleEl.remove();
	}

	el.style.position = state.originalPosition;
	delete el.__gRipple__;
}

export const ripple: Directive<RippleElement, RippleBindingValue> = {
	mounted(el, binding) {
		bind(el, binding.value);
	},

	updated(el, binding) {
		if (binding.value === binding.oldValue) return;
		bind(el, binding.value);
	},

	unmounted(el) {
		unbind(el);
	}
};
