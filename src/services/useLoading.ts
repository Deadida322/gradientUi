// services/LoadingService.ts
import {
	createApp,
	type App,
	ref,
	shallowRef,
	onUnmounted,
	type ComponentPublicInstance
} from 'vue';
import GLoading from '@/components/ui/GLoading/GLoading.vue';
import type { GLoadingProps } from '@/components/ui/GLoading/types';

interface LoadingInstance {
	app: App;
	container: HTMLElement;
	target: HTMLElement;
	originalPosition: string;
	componentInstance: ComponentPublicInstance<typeof GLoading> | null;
}

export function useLoading() {
	const currentInstance = shallowRef<LoadingInstance | null>(null);
	const visible = ref(false);
	const show = (
		options: Partial<
			GLoadingProps & {
				target: string | HTMLElement;
			}
		>
	) => {
		hide();
		const target = resolveTarget(options.target);
		const originalPosition = target.style.position;

		if (!hasValidPosition(target)) {
			target.style.position = 'relative';
		}
		const container = document.createElement('div');
		container.className = 'g-loading__container';
		target.appendChild(container);
		const instance = {} as LoadingInstance;

		const app = createApp(GLoading, {
			text: options.text,
			noText: options.noText,
			color: options.color,
			dark: options.dark,
			opacity: options.opacity,
			blur: options.blur,
			progressView: options.progressView,
			onClose: () => {
				unmountComponent(instance);
			}
		});
		const componentInstance: ComponentPublicInstance<typeof GLoading> =
			app.mount(container);
		Object.assign(instance, {
			app,
			container,
			target,
			originalPosition,
			componentInstance
		});
		currentInstance.value = instance;

		componentInstance.show();
		visible.value = true;
	};
	const resolveTarget = (target?: string | HTMLElement): HTMLElement => {
		if (!target) return document.body;
		if (typeof target === 'string') {
			const element = document.querySelector(target);
			if (!element) throw new Error(`Target element ${target} not found`);
			return element as HTMLElement;
		}
		return target;
	};

	const hide = async (): Promise<void> => {
		if (!currentInstance.value) return;

		const { componentInstance } = currentInstance.value;
		if (componentInstance) componentInstance.hide();
	};

	const hasValidPosition = (element: HTMLElement): boolean => {
		const position = window.getComputedStyle(element).position;
		return ['relative', 'absolute', 'fixed', 'sticky'].includes(position);
	};

	const unmountComponent = (instance = currentInstance.value) => {
		if (!instance) return;

		const isCurrentInstance = currentInstance.value === instance;
		const { app, container, target, originalPosition } = instance;

		app.unmount();

		if (container.parentElement === target) {
			target.removeChild(container);
		}

		if (!isCurrentInstance) return;

		target.style.position = originalPosition;
		currentInstance.value = null;
		visible.value = false;
	};

	onUnmounted(() => {
		hide();
	});

	return {
		show,
		hide,
		visible
	};
}
