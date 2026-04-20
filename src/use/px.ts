import type { PXtype } from '@/types/CommonTypes';
import { computed, toValue, type ComputedRef, type MaybeRef } from 'vue';

export default (value: MaybeRef<PXtype>): ComputedRef<string> =>
	computed((): string => {
		const resolved = toValue(value);

		if (resolved === '' || resolved === null || resolved === undefined) {
			return '';
		}

		if (typeof resolved === 'number') {
			return `${resolved}px`;
		}

		return /^\d+(\.\d+)?$/.test(resolved) ? `${resolved}px` : resolved;
	});
