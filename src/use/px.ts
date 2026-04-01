import type { StringeredNumber } from '@/types/CommonTypes';
import { computed, toValue, type ComputedRef, type MaybeRef } from 'vue';
export default (value: MaybeRef<number | StringeredNumber>): ComputedRef =>
	computed((): string => {
		if (+toValue(value)) {
			return `${toValue(value)}px`;
		}
		return String(toValue(value));
	});
