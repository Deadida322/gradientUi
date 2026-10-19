import type { App } from 'vue';
import { GradientUIServicesSymbol, type GradientUIServices } from './context';
import { createLoadingService } from './useLoading';
import { createSnackbarService } from './useSnackbar';

const runtimes = new WeakMap<App, GradientUIServices>();

export const createGradientUIServices = (): GradientUIServices => ({
	loading: createLoadingService(),
	snackbar: createSnackbarService()
});

export const installGradientUIServices = (app: App): GradientUIServices => {
	const existing = runtimes.get(app);
	if (existing) return existing;

	const services = createGradientUIServices();
	runtimes.set(app, services);
	app.provide(GradientUIServicesSymbol, services);
	return services;
};

export const getGradientUIServices = (app: App): GradientUIServices => {
	const services = runtimes.get(app);
	if (!services)
		throw new Error(
			'Gradient UI services are not installed on this Vue app.'
		);
	return services;
};
