import { computed } from 'vue';

export function useAppendTarget(appendTo?: string | null) {
	const hasAppendTarget = computed(() => Boolean(appendTo));
	const appendTarget = computed(() => appendTo || 'body');

	return {
		hasAppendTarget,
		appendTarget
	};
}
