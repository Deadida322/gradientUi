import type { GGradienStates } from '@/components/ui/GGradient/types';
import {
	resolveColorValue,
	resolveGradientValue,
	type GColor
} from '@/use/colorResolver';
import type { Directive } from 'vue';

export type GradientTextBindingValue =
	| GColor
	| {
			color?: GColor;
			colors?: GColor[];
			direction?: string;
			from?: GColor;
			state?: GGradienStates;
			to?: GColor;
			gradient?: string;
			disabled?: boolean;
			selector?: string;
	  };

type GradientTextTargetStyles = {
	backgroundClip: string;
	backgroundImage: string;
	color: string;
	webkitBackgroundClip: string;
	webkitTextFillColor: string;
};

type GradientTextState = {
	targets: Map<HTMLElement, GradientTextTargetStyles>;
};

const DEFAULT_GRADIENT = 'var(--g-gradient-current, var(--g-gradient-main))';
const DEFAULT_DIRECTION = '135deg';

function getStateMap() {
	return new WeakMap<HTMLElement, GradientTextState>();
}

export function createGradientTextDirective(
	defaultSelector?: string
): Directive<HTMLElement, GradientTextBindingValue> {
	const stateMap = getStateMap();

	function cleanup(el: HTMLElement) {
		const state = stateMap.get(el);

		if (!state) return;

		for (const [target, styles] of state.targets) {
			restoreStyles(target, styles);
		}

		stateMap.delete(el);
	}

	function update(
		el: HTMLElement,
		value: GradientTextBindingValue | undefined
	) {
		const options = getOptions(value, defaultSelector);

		cleanup(el);

		if (options.disabled) return;

		const targets = getTargets(el, options.selector);
		const state: GradientTextState = {
			targets: new Map()
		};

		for (const target of targets) {
			state.targets.set(target, readStyles(target));
			applyGradient(target, options.gradient);
		}

		stateMap.set(el, state);
	}

	return {
		mounted(el, binding) {
			update(el, binding.value);
		},

		updated(el, binding) {
			update(el, binding.value);
		},

		unmounted(el) {
			cleanup(el);
		}
	};
}

function getOptions(
	value: GradientTextBindingValue | undefined,
	defaultSelector?: string
) {
	if (typeof value === 'string') {
		return {
			gradient: resolveGradientValue(value),
			disabled: false,
			selector: defaultSelector
		};
	}

	if (!value) {
		return {
			gradient: DEFAULT_GRADIENT,
			disabled: false,
			selector: defaultSelector
		};
	}

	const colors = getGradientColors(value);

	return {
		gradient:
			value.gradient ??
			(colors.length
				? createLinearGradient(colors, value.direction)
				: undefined) ??
			resolveGradientValue(value.state ?? value.color) ??
			DEFAULT_GRADIENT,
		disabled: value.disabled ?? false,
		selector: value.selector ?? defaultSelector
	};
}

function getGradientColors(value: Exclude<GradientTextBindingValue, GColor>) {
	if (value.colors?.length) {
		return value.colors;
	}

	return [value.from, value.to].filter((color): color is GColor =>
		Boolean(color)
	);
}

function createLinearGradient(colors: GColor[], direction = DEFAULT_DIRECTION) {
	const gradientColors =
		colors.length === 1 ? [colors[0], colors[0]] : colors;

	return `linear-gradient(${direction}, ${gradientColors
		.map((color) => resolveColorValue(color))
		.join(', ')})`;
}

function getTargets(el: HTMLElement, selector: string | undefined) {
	if (!selector) {
		return [el];
	}

	const targets: HTMLElement[] = [];

	if (el.matches(selector)) {
		targets.push(el);
	}

	targets.push(...Array.from(el.querySelectorAll<HTMLElement>(selector)));

	return targets;
}

function readStyles(target: HTMLElement): GradientTextTargetStyles {
	return {
		backgroundClip: target.style.backgroundClip,
		backgroundImage: target.style.backgroundImage,
		color: target.style.color,
		webkitBackgroundClip: target.style.getPropertyValue(
			'-webkit-background-clip'
		),
		webkitTextFillColor: target.style.getPropertyValue(
			'-webkit-text-fill-color'
		)
	};
}

function restoreStyles(target: HTMLElement, styles: GradientTextTargetStyles) {
	target.style.backgroundClip = styles.backgroundClip;
	target.style.backgroundImage = styles.backgroundImage;
	target.style.color = styles.color;
	target.style.setProperty(
		'-webkit-background-clip',
		styles.webkitBackgroundClip
	);
	target.style.setProperty(
		'-webkit-text-fill-color',
		styles.webkitTextFillColor
	);
}

function applyGradient(target: HTMLElement, gradient: string) {
	target.style.backgroundImage = gradient;
	target.style.backgroundClip = 'text';
	target.style.color = 'transparent';
	target.style.setProperty('-webkit-background-clip', 'text');
	target.style.setProperty('-webkit-text-fill-color', 'transparent');
}

export default createGradientTextDirective();
