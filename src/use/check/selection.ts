export function includesSelection<T>(items: readonly T[], value: T) {
	return items.some((item) => Object.is(item, value));
}

export function toggleSelection<T>(
	items: readonly T[],
	value: T,
	force?: boolean
) {
	const hasValue = includesSelection(items, value);

	if (force === true && hasValue) return [...items];
	if (force === false && !hasValue) return [...items];

	if (hasValue) {
		return items.filter((item) => !Object.is(item, value));
	}

	return [...items, value];
}
