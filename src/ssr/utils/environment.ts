export interface ClientRuntime {
	document: Document;
	window: Window;
}

export const canUseDom = (): boolean =>
	typeof window !== 'undefined' && typeof document !== 'undefined';

export const getClientWindow = (): Window | null =>
	canUseDom() ? window : null;

export const getClientDocument = (): Document | null =>
	canUseDom() ? document : null;

export const getClientRuntime = (): ClientRuntime | null => {
	const clientWindow = getClientWindow();
	const clientDocument = getClientDocument();

	return clientWindow && clientDocument
		? { document: clientDocument, window: clientWindow }
		: null;
};

export const isClientElement = (value: unknown): value is Element =>
	typeof Element !== 'undefined' && value instanceof Element;

export const isClientHTMLElement = (value: unknown): value is HTMLElement =>
	typeof HTMLElement !== 'undefined' && value instanceof HTMLElement;

export const runOnClient = <T>(callback: () => T): T | null =>
	canUseDom() ? callback() : null;
