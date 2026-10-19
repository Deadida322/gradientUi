import { ref, type Ref } from 'vue';
import { onClientMounted } from './clientLifecycle';

export const useHydrated = (): Readonly<Ref<boolean>> => {
	const hydrated = ref(false);

	onClientMounted(() => {
		hydrated.value = true;
	});

	return hydrated;
};
