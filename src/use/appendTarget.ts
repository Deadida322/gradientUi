import { computed, toValue, type MaybeRefOrGetter } from 'vue';
import { useSsrTeleport } from '@/ssr/use';

export function useAppendTarget(
	appendTo?: MaybeRefOrGetter<string | null | undefined>
) {
	const teleport = useSsrTeleport(appendTo);
	const hasAppendTarget = computed(
		() => !teleport.disabled.value && Boolean(toValue(appendTo))
	);
	const appendTarget = teleport.target;

	return {
		hasAppendTarget,
		appendTarget
	};
}
