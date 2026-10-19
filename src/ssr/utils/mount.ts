import {
	createApp,
	type App,
	type Component,
	type ComponentPublicInstance
} from 'vue';
import { getClientDocument, isClientHTMLElement } from './environment';

export type ClientMountTarget = string | HTMLElement;

export interface ClientComponentMount<
	TInstance extends ComponentPublicInstance = ComponentPublicInstance
> {
	app: App;
	container: HTMLElement;
	instance: TInstance;
	unmount: () => void;
}

export interface MountClientComponentOptions {
	containerClass?: string;
	props?: Record<string, unknown> | null;
	target?: ClientMountTarget;
}

export const resolveClientTarget = (
	target?: ClientMountTarget
): HTMLElement | null => {
	const clientDocument = getClientDocument();
	if (!clientDocument) return null;
	if (!target) return clientDocument.body;
	if (isClientHTMLElement(target)) return target;

	return clientDocument.querySelector<HTMLElement>(target);
};

export const mountClientComponent = <
	TInstance extends ComponentPublicInstance = ComponentPublicInstance
>(
	component: Component,
	options: MountClientComponentOptions = {}
): ClientComponentMount<TInstance> | null => {
	const clientDocument = getClientDocument();
	const target = resolveClientTarget(options.target);
	if (!clientDocument || !target) return null;

	const container = clientDocument.createElement('div');
	if (options.containerClass) container.className = options.containerClass;
	target.appendChild(container);

	const app = createApp(component, options.props ?? null);
	const instance = app.mount(container) as TInstance;
	let mounted = true;

	return {
		app,
		container,
		instance,
		unmount: () => {
			if (!mounted) return;
			mounted = false;
			app.unmount();
			container.remove();
		}
	};
};

export const mountClientStyle = (
	id: string,
	cssText: string
): HTMLStyleElement | null => {
	const clientDocument = getClientDocument();
	if (!clientDocument) return null;

	let style = clientDocument.getElementById(id) as HTMLStyleElement | null;

	if (!style) {
		style = clientDocument.createElement('style');
		style.id = id;
		clientDocument.head.appendChild(style);
	}

	style.textContent = cssText;
	return style;
};

interface RegistryEntry {
	count: number;
	element: Element;
}

export interface ClientElementRegistry {
	mount: (
		id: string,
		createElement: (document: Document) => Element
	) => () => void;
	clear: () => void;
}

export const createClientElementRegistry = (): ClientElementRegistry => {
	const entries = new Map<string, RegistryEntry>();
	const createDispose = (id: string): (() => void) => {
		let disposed = false;

		return () => {
			if (disposed) return;
			disposed = true;

			const entry = entries.get(id);
			if (!entry) return;
			entry.count -= 1;
			if (entry.count > 0) return;
			entry.element.remove();
			entries.delete(id);
		};
	};

	return {
		mount(id, createElement) {
			const existing = entries.get(id);

			if (existing) {
				existing.count += 1;
				return createDispose(id);
			}

			const clientDocument = getClientDocument();
			if (!clientDocument) return () => undefined;

			const element = createElement(clientDocument);
			clientDocument.head.append(element);
			entries.set(id, { count: 1, element });

			return createDispose(id);
		},
		clear() {
			for (const entry of entries.values()) entry.element.remove();
			entries.clear();
		}
	};
};
