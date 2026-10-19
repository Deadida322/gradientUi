import { onBeforeUnmount, onMounted } from 'vue';
import { getClientRuntime, type ClientRuntime } from '../utils/environment';

export const onClientMounted = (
	effect: (runtime: ClientRuntime) => void | (() => void)
): void => {
	let cleanup: void | (() => void);

	onMounted(() => {
		const runtime = getClientRuntime();
		if (runtime) cleanup = effect(runtime);
	});

	onBeforeUnmount(() => cleanup?.());
};
