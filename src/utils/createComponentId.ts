let componentIdCounter = 0;

export function createComponentId(prefix: string) {
	componentIdCounter += 1;
	return `${prefix}-${componentIdCounter}`;
}
