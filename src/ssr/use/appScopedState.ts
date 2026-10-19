import { getCurrentInstance } from 'vue';

export const defineAppScopedState = <T>(factory: () => T): (() => T) => {
	const states = new WeakMap<object, T>();

	return () => {
		const appContext = getCurrentInstance()?.appContext;
		if (!appContext) return factory();

		if (states.has(appContext)) return states.get(appContext) as T;

		const state = factory();
		states.set(appContext, state);
		return state;
	};
};
