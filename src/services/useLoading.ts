// services/LoadingService.ts
import {
	ref,
	shallowRef,
	onUnmounted,
	getCurrentInstance,
	inject,
	type ComponentPublicInstance
} from 'vue';
import GLoading from '@/components/ui/GLoading/GLoading.vue';
import type { GLoadingProps } from '@/components/ui/GLoading/types';
import {
	canUseDom,
	getClientWindow,
	mountClientComponent,
	resolveClientTarget,
	type ClientComponentMount
} from '@/ssr/utils';
import { GradientUIServicesSymbol } from './context';

interface LoadingInstance {
	mount: ClientComponentMount;
	target: HTMLElement;
	originalPosition: string;
	componentInstance: ComponentPublicInstance<typeof GLoading> | null;
}

export const createLoadingService = () => {
	const currentInstance = shallowRef<LoadingInstance | null>(null);
	const visible = ref(false);
	const show = (
		options: Partial<
			GLoadingProps & {
				target: string | HTMLElement;
			}
		>
	) => {
		if (!canUseDom()) return;

		hide();
		const target = resolveTarget(options.target);
		const originalPosition = target.style.position;

		if (!hasValidPosition(target)) {
			target.style.position = 'relative';
		}
		const instance = {} as LoadingInstance;
		const mount = mountClientComponent(GLoading, {
			containerClass: 'g-loading__container',
			target,
			props: {
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
			}
		});
		if (!mount) return;

		const componentInstance = mount.instance as ComponentPublicInstance<
			typeof GLoading
		>;
		Object.assign(instance, {
			mount,
			target,
			originalPosition,
			componentInstance
		});
		currentInstance.value = instance;

		componentInstance.show();
		visible.value = true;
	};
	const resolveTarget = (target?: string | HTMLElement): HTMLElement => {
		const element = resolveClientTarget(target);
		if (!element)
			throw new Error(`Target element ${String(target)} not found`);
		return element;
	};

	const hide = async (): Promise<void> => {
		if (!currentInstance.value) return;

		const { componentInstance } = currentInstance.value;
		if (componentInstance) componentInstance.hide();
	};

	const hasValidPosition = (element: HTMLElement): boolean => {
		const position = getClientWindow()?.getComputedStyle(element).position;
		if (!position) return true;
		return ['relative', 'absolute', 'fixed', 'sticky'].includes(position);
	};

	const unmountComponent = (instance = currentInstance.value) => {
		if (!instance) return;

		const isCurrentInstance = currentInstance.value === instance;
		const { mount, target, originalPosition } = instance;

		mount.unmount();

		if (!isCurrentInstance) return;

		target.style.position = originalPosition;
		currentInstance.value = null;
		visible.value = false;
	};

	return {
		show,
		hide,
		visible,
		dispose: () => unmountComponent()
	};
};

export type LoadingService = ReturnType<typeof createLoadingService>;

export const useLoading = (): LoadingService => {
	if (!getCurrentInstance())
		throw new Error(
			'useLoading() requires Vue setup context. Outside setup, use the installed Gradient UI service runtime.'
		);
	const service = inject(GradientUIServicesSymbol, null)?.loading;
	if (service) return service;

	const local = createLoadingService();
	onUnmounted(local.dispose);
	return local;
};
