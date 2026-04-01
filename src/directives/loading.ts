import { createApp, type App, type ComponentPublicInstance } from 'vue';
import GLoading from '@/components/ui/GLoading/GLoading.vue';

interface LoadingBinding {
	value?: boolean;
	modifiers: {
		dark?: boolean;
		noText?: boolean;
	};
}

const stateMap = new WeakMap<
	HTMLElement,
	{
		originalPosition: string;
		originalOverflow: string;
		loadingInstance?: App<Element>;
		loadingContainer?: HTMLDivElement;
		componentInstance?: ComponentPublicInstance<typeof GLoading>;
		prevValue?: boolean;
	}
>();

const loading = {
	mounted(el: HTMLElement) {
		stateMap.set(el, {
			originalPosition: el.style.position,
			originalOverflow: el.style.overflow
		});
	},
	updated(el: HTMLElement, binding: LoadingBinding) {
		const state = stateMap.get(el) || {
			originalPosition: el.style.position,
			originalOverflow: el.style.overflow
		};
		if (!state) return;

		if (state.prevValue === binding.value) {
			return;
		}

		state.prevValue = binding.value;

		if (state.loadingInstance) {
			state?.componentInstance?.hide();
		}

		const { value, modifiers } = binding;
		if (value) {
			el.style.position = 'relative';
			el.style.overflow = 'hidden';
			const container = document.createElement('div');
			container.style.position = 'absolute';
			container.style.zIndex = '9999';
			container.style.top = '0';
			container.style.left = '0';
			container.style.width = '100%';
			container.style.height = '100%';

			const loadingInstance = createApp(GLoading, {
				dark: !!modifiers.dark,
				noText: !!modifiers.noText,
				onClose: () => {
					const state = stateMap.get(el);
					if (!state) return;
					if (state.loadingInstance) {
						state.loadingInstance.unmount();
					}
					if (state.loadingContainer) {
						el.removeChild(state.loadingContainer);
					}
					stateMap.delete(el);
					el.style.position = state.originalPosition;
					el.style.overflow = state.originalOverflow;
				}
			});

			state.loadingInstance = loadingInstance;
			state.loadingContainer = container;

			el.appendChild(container);
			state.componentInstance = loadingInstance.mount(container);
			state.componentInstance.show();
			stateMap.set(el, state);
		}
	},
	unmounted(el: HTMLElement) {
		const state = stateMap.get(el);
		state?.componentInstance?.hide();
	}
};

export default loading;
