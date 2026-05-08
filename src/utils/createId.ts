let idCounter = 0;

export function createId(prefix = 'g') {
	idCounter += 1;

	if (globalThis.crypto?.randomUUID) {
		return `${prefix}-${globalThis.crypto.randomUUID()}`;
	}

	return `${prefix}-${idCounter.toString(36)}`;
}
