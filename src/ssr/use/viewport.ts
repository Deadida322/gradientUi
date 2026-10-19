import { inject, provide, type App, type InjectionKey } from 'vue';

/** Initial dimensions supplied by an SSR host for one application/request. */
export interface SsrViewport {
	height?: number;
	width?: number;
}

const ssrViewportKey: InjectionKey<Readonly<SsrViewport>> =
	Symbol('gradient-viewport');

/** Installs request-local viewport dimensions on a Vue application. */
export const installSsrViewport = (app: App, state: SsrViewport): void => {
	app.provide(ssrViewportKey, state);
};

/** Provides viewport dimensions to a subtree during component setup. */
export const provideSsrViewport = (state: SsrViewport): void => {
	provide(ssrViewportKey, state);
};

/** Reads the viewport dimensions supplied by the current application/request. */
export const useSsrViewport = (): Readonly<SsrViewport> | null =>
	inject(ssrViewportKey, null);
