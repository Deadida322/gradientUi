import { computed, type ComputedRef, unref, type MaybeRef } from 'vue';

export function useBooleanProp(value: MaybeRef<unknown>): ComputedRef<boolean> {
	return computed(() => {
		const normalized = unref(value);
		return normalized === true || normalized === '';
	});
}
