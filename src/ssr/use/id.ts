import { useId } from 'vue';

export const useSsrId = (prefix = 'g'): string =>
	`${prefix}-${(useId() ?? '').replaceAll(':', '')}`;
