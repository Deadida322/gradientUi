import { computed } from 'vue';

export function useVisibleProps<
	T extends object,
	const K extends readonly (keyof T)[]
>(source: T, keys: K) {
	return computed(
		() => keys.filter((key) => Boolean(source[key])) as K[number][]
	);
}
