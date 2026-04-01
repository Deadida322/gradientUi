// services/LoadingService.ts
import {
	createApp,
	type App,
	ref,
	onUnmounted,
	watch,
	type ComponentPublicInstance
} from 'vue';
import GLoading from '@/components/ui/GLoading/GLoading.vue';
import type { GLoadingProps } from '@/components/ui/GLoading/types';

interface LoadingInstance {
	app: App;
	container: HTMLElement;
	target: HTMLElement;
	originalPosition: string;
	originalOverflow: string;
	componentInstance: ComponentPublicInstance<typeof GLoading> | null;
}

export function useLoading() {
	const currentInstance = ref<LoadingInstance | null>(null);
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
		const originalOverflow = target.style.overflow;

		if (!hasValidPosition(target)) {
			target.style.position = 'relative';
		}
		const container = document.createElement('div');
		target.appendChild(container);
		target.style.overflow = 'hidden';

		const app = createApp(GLoading, {
			text: options.text,
			noText: options.noText,
			onClose: () => {
				unmountComponent();
			}
		});
		const componentInstance: ComponentPublicInstance<typeof GLoading> =
			app.mount(container);
		currentInstance.value = {
			app,
			container,
			target,
			originalOverflow,
			originalPosition,
			componentInstance
		};

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
		return ['relative', 'absolute', 'fixed'].includes(position);
	};

	const unmountComponent = () => {
		if (!currentInstance.value) return;
		const { app, container, target, originalPosition, originalOverflow } =
			currentInstance.value;

		app.unmount();
		target.style.position = originalPosition;
		target.style.overflow = originalOverflow;
		target.removeChild(container);
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
