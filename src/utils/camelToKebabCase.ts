export function camelToKebabCase(str: string) {
	return str
		.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
		.replace(/([a-zA-Z])(\d+)/g, '$1-$2');
}
