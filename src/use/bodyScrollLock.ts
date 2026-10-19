import { onBeforeUnmount, watch } from 'vue';
import type { Ref } from 'vue';
import { getClientDocument } from '@/ssr/utils';

let lockCount = 0;
let previousOverflow = '';

function lockBody() {
	const clientDocument = getClientDocument();
	if (!clientDocument) return;

	if (lockCount === 0) {
		previousOverflow = clientDocument.body.style.overflow;
		clientDocument.body.style.overflow = 'hidden';
	}

	lockCount += 1;
}

function unlockBody() {
	const clientDocument = getClientDocument();
	if (!clientDocument || lockCount === 0) return;

	lockCount -= 1;

	if (lockCount === 0) {
		clientDocument.body.style.overflow = previousOverflow;
	}
}

export function useBodyScrollLock(open: Ref<boolean>, enabled: Ref<boolean>) {
	watch(
		[open, enabled],
		([isOpen, isEnabled], [wasOpen, wasEnabled]) => {
			if (isOpen && isEnabled && (!wasOpen || !wasEnabled)) {
				lockBody();
			}

			if ((!isOpen || !isEnabled) && wasOpen && wasEnabled) {
				unlockBody();
			}
		},
		{ immediate: true }
	);

	onBeforeUnmount(() => {
		if (open.value && enabled.value) {
			unlockBody();
		}
	});
}
