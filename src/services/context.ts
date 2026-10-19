import type { InjectionKey } from 'vue';
import type { LoadingService } from './useLoading';
import type { SnackbarService } from './useSnackbar';

export interface GradientUIServices {
	loading: LoadingService;
	snackbar: SnackbarService;
}

export const GradientUIServicesSymbol: InjectionKey<GradientUIServices> =
	Symbol('gradient-ui-services');
