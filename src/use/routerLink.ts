import { getCurrentInstance, type Component } from 'vue';

export type RouterTo =
	| string
	| {
			path?: string;
			name?: string | symbol;
			params?: Record<string, unknown>;
			query?: Record<string, unknown>;
			hash?: string;
	  };

export const useOptionalRouterLink = (): Component | string | undefined => {
	const instance = getCurrentInstance();

	return instance?.appContext.components.RouterLink;
};

export const getRouterFallbackHref = (to: RouterTo | undefined) => {
	if (typeof to === 'string') return to;

	return undefined;
};
