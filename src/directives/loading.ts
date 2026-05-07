import {
	createApp,
	type App,
	type ComponentPublicInstance,
	type Directive
} from 'vue';
import GLoading from '@/components/ui/GLoading/GLoading.vue';
import type { GLoadingProps } from '@/components/ui/GLoading/types';

export type LoadingBindingValue =
	| boolean
	| (Partial<GLoadingProps> & {
			active?: boolean;
			value?: boolean;
	  });

type LoadingOptions = Partial<GLoadingProps> & {
	active: boolean;
};

type LoadingState = {
	originalPosition: string;
	app?: App<Element>;
	container?: HTMLDivElement;
	component?: ComponentPublicInstance<typeof GLoading>;
	optionsKey?: string;
};

type LoadingElement = HTMLElement & {
	__gLoading__?: LoadingState;
};

function getExposedVisibility(
	component?: ComponentPublicInstance<typeof GLoading>
) {
	const exposedVisibility = component?.isVisible;

	if (
		typeof exposedVisibility === 'object' &&
		exposedVisibility !== null &&
		'value' in exposedVisibility
	) {
		return Boolean(exposedVisibility.value);
	}

	return Boolean(exposedVisibility);
}

const DEFAULT_OPTIONS: LoadingOptions = {
	active: false,
	text: 'Loading...',
	noText: false,
	color: 'primary',
	dark: false,
	opacity: undefined,
	blur: undefined,
	progressView: 'glow'
};

function resolveOptions(
	value: LoadingBindingValue | undefined,
	modifiers: Partial<Record<string, boolean>> = {}
): LoadingOptions {
	const source = typeof value === 'object' && value !== null ? value : {};
	const active =
		typeof value === 'boolean'
			? value
			: (source.active ?? source.value ?? false);

	return {
		...DEFAULT_OPTIONS,
		...source,
		active,
		dark: source.dark ?? Boolean(modifiers.dark),
		noText: source.noText ?? Boolean(modifiers.noText)
	};
}

function getOptionsKey(options: LoadingOptions) {
	return JSON.stringify({
		text: options.text,
		noText: options.noText,
		color: options.color,
		dark: options.dark,
		opacity: options.opacity,
		blur: options.blur,
		progressView: options.progressView
	});
}

function hasValidPosition(el: HTMLElement) {
	return ['relative', 'absolute', 'fixed', 'sticky'].includes(
		getComputedStyle(el).position
	);
}

function ensureHostStyles(el: HTMLElement) {
	if (!hasValidPosition(el)) {
		el.style.position = 'relative';
	}
}

function destroy(el: LoadingElement) {
	const state = el.__gLoading__;

	if (!state) return;

	state.app?.unmount();
	state.container?.remove();
	state.app = undefined;
	state.container = undefined;
	state.component = undefined;
	state.optionsKey = undefined;
	el.style.position = state.originalPosition;
}

function hide(el: LoadingElement) {
	const state = el.__gLoading__;

	if (!state) return;

	if (!state.component) {
		destroy(el);
		return;
	}

	state.component.hide();
}

function show(el: LoadingElement, options: LoadingOptions) {
	const state = el.__gLoading__;

	if (!state) return;

	ensureHostStyles(el);

	const container = document.createElement('div');
	container.className = 'g-loading__container';

	const app = createApp(GLoading, {
		text: options.text,
		noText: options.noText,
		color: options.color,
		dark: options.dark,
		opacity: options.opacity,
		blur: options.blur,
		progressView: options.progressView,
		onClose: () => {
			if (getExposedVisibility(state.component)) return;
			destroy(el);
		}
	});

	state.app = app;
	state.container = container;
	state.optionsKey = getOptionsKey(options);

	el.appendChild(container);
	state.component = app.mount(container);
	state.component.show();
}

function sync(
	el: LoadingElement,
	value: LoadingBindingValue | undefined,
	modifiers: Partial<Record<string, boolean>>
) {
	const state = el.__gLoading__;

	if (!state) return;

	const options = resolveOptions(value, modifiers);
	const optionsKey = getOptionsKey(options);

	if (!options.active) {
		hide(el);
		return;
	}

	if (state.app && state.optionsKey === optionsKey) {
		state.component?.show();
		return;
	}

	destroy(el);
	show(el, options);
}

const loading: Directive<LoadingElement, LoadingBindingValue> = {
	mounted(el, binding) {
		el.__gLoading__ = {
			originalPosition: el.style.position
		};

		sync(el, binding.value, binding.modifiers);
	},

	updated(el, binding) {
		if (
			binding.value === binding.oldValue &&
			(typeof binding.value !== 'object' || binding.value === null)
		) {
			return;
		}

		sync(el, binding.value, binding.modifiers);
	},

	unmounted(el) {
		destroy(el);
		delete el.__gLoading__;
	}
};

export default loading;
