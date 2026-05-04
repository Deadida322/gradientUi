import { onBeforeUnmount, watch } from 'vue';
import type { Ref } from 'vue';

let lockCount = 0;
let previousOverflow = '';

function lockBody() {
	if (typeof document === 'undefined') return;

	if (lockCount === 0) {
		previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
	}

	lockCount += 1;
}

function unlockBody() {
	if (typeof document === 'undefined' || lockCount === 0) return;

	lockCount -= 1;

	if (lockCount === 0) {
		document.body.style.overflow = previousOverflow;
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
